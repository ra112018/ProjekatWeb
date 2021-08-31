package dao;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Buyer;
import beans.User;
import beans.Order;
import beans.UserType;

public class BuyerDao {

	private HashMap<String,Buyer> buyers;

    public BuyerDao() {

        buyers = new HashMap<String,Buyer>();
        try {
            readBuyers();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }

    public HashMap<String, Buyer> getBuyers() {
		return buyers;
	}
    
    public void setBuyers(HashMap<String,Buyer> buyers) {
		this.buyers = buyers;
	}


	private void readBuyers() throws FileNotFoundException{
        Gson gson = new Gson();
        Type token = new TypeToken<HashMap<String,Buyer>>(){}.getType();
        BufferedReader br = new BufferedReader(new FileReader("static/json/kupci.json"));
        this.buyers = gson.fromJson(br, token);
       
    }

   

	public Buyer findBuyer(String name, String pass) {
		// TODO Auto-generated method stub
		 for (Map.Entry<String, Buyer> entry : buyers.entrySet()) {
	            if(entry.getValue().getUserName().equals(name) && entry.getValue().getPassword().equals(pass) ) {
	                return entry.getValue();
	            }
	        }
	        return null;
	}
	

	public Buyer addBuyer(Buyer buyer) {
		buyer.setCustomerPoints(0);
		buyer.setCustomerOrders(new ArrayList<Order>());
		UserType ut=new UserType();
		buyer.setCustomerType(ut);
		buyers.put(buyer.getUserName(),buyer);
		try {
			this.addAccount();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return buyer;
	}
	public void addAccount() throws IOException{
		Gson gson = new Gson();
		FileWriter fw = new FileWriter("static/json/kupci.json");
		gson.toJson(this.buyers, fw);
		fw.flush();
		fw.close();
	}
	
	public Buyer findBuyerByUsername(String uName) {
		for (Map.Entry<String, Buyer> entry : buyers.entrySet()) {
	        if(entry.getValue().getUserName().equals(uName) ) {
	        	return entry.getValue();
	        }
	    }
		return null;
	}
	public void updateBuyer(String usname, Buyer buyer) {
		for (Map.Entry<String, Buyer> entry : buyers.entrySet()) {
	        if(entry.getValue().getUserName().equals(usname) ) {
	        	entry.getValue().setName(buyer.getName());
	        	entry.getValue().setSurname(buyer.getSurname());
	        	entry.getValue().setGender(buyer.getGender());
	        	entry.getValue().setPassword(buyer.getPassword());
	        }
	    }
		try {
			addAccount();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void deleteBuyer(String uName) {
		for (Map.Entry<String, Buyer> entry : buyers.entrySet()) {
	        if(entry.getValue().getUserName().equals(uName) ) {
	        	entry.getValue().deleted(true);
	        }
	    }
	}
	

	
}
