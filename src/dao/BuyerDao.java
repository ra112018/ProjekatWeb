package dao;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Buyer;

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

    private void readBuyers() throws FileNotFoundException{
        Gson gson = new Gson();
        Type token = new TypeToken<HashMap<String,Buyer>>(){}.getType();
        BufferedReader br = new BufferedReader(new FileReader("static/kupci.json"));
        this.buyers = gson.fromJson(br, token);
        System.out.println(this.buyers);
    }

   

	public Buyer findBuyer(String name, String pass) {
		// TODO Auto-generated method stub
		 for (Map.Entry<String, Buyer> entry : buyers.entrySet()) {
	            if(entry.getValue().getUsername().equals(name) && entry.getValue().getPassword().equals(pass) ) {
	            	System.out.println("Nasao");
	                return entry.getValue();
	            }
	        }
	        return null;
	}

	
}
