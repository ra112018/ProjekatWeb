package dao;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Administrator;
import beans.Buyer;
import beans.Deliverer;
import beans.Manager;

public class DelivererDAO {

	private HashMap<String, Deliverer> deliverers;

    public DelivererDAO() {

    	deliverers = new HashMap<String, Deliverer>();
        try {
            readDeliverers();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }
    
    public HashMap<String,Deliverer> getDeliverers() {
		return deliverers;
	}
    

    public void setDeliverers(HashMap<String,Deliverer> deliverers) {
		this.deliverers = deliverers;
	}
    
    private void readDeliverers() throws FileNotFoundException{
        Gson gson = new Gson();
        Type token = new TypeToken<HashMap<String, Deliverer>>(){}.getType();
        BufferedReader br = new BufferedReader(new FileReader("static/json/deliverers.json"));
        this.deliverers = gson.fromJson(br, token);
    
    }

   

	public Deliverer findDeliverer(String name, String pass) {
		// TODO Auto-generated method stub
		 for (Map.Entry<String, Deliverer> entry : deliverers.entrySet()) {
	            if(entry.getValue().getUserName().equals(name) && entry.getValue().getPassword().equals(pass) ) {
	                return entry.getValue();
	            }
	        }
	        return null;
	}
	

	
	
	public Deliverer findDelivererByUsername(String uName) {
		for (Map.Entry<String, Deliverer> entry : deliverers.entrySet()) {
	        if(entry.getValue().getUserName().equals(uName) ) {
	        	return entry.getValue();
	        }
	    }
		return null;
	}
	
	public void updateDeliverer(String usname, Deliverer deliverer) {
		for (Map.Entry<String, Deliverer> entry : deliverers.entrySet()) {
	        if(entry.getValue().getUserName().equals(usname) ) {
	        	entry.getValue().setName(deliverer.getName());
	        	entry.getValue().setSurname(deliverer.getSurname());
	        	entry.getValue().setGender(deliverer.getGender());
	        	entry.getValue().setPassword(deliverer.getPassword());
	        }
	    }
		try {
			addAccount();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void addAccount() throws IOException{
		Gson gson = new Gson();
		FileWriter fw = new FileWriter("static/json/deliverers.json");
		gson.toJson(this.deliverers, fw);
		fw.flush();
		fw.close();
	}
	
	public Deliverer addDeliverer(Deliverer deliverer) {
		
		deliverers.put(deliverer.getUserName(),deliverer);
		try {
			this.addAccount();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return deliverer;
	}
	
	public void deleteDeliverer(String uName) {
		for (Map.Entry<String, Deliverer> entry : deliverers.entrySet()) {
        	System.out.println(uName+"24");
        	System.out.println(entry.getValue().getUserName()+"44");

	        if(entry.getValue().getUserName().equals(uName) ) {
	        	entry.getValue().deleted(true);
	        	System.out.println("1");
	        }
	    }
		try {
			addAccount();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
}

