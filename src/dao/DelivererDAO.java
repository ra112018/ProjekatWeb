package dao;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Deliverer;

public class DelivererDAO {

	private static HashMap<String, Deliverer> deliverers;

    public DelivererDAO() {

    	deliverers = new HashMap<String, Deliverer>();
        try {
            readDeliverers();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }

    private void readDeliverers() throws FileNotFoundException{
        Gson gson = new Gson();
        Type token = new TypeToken<HashMap<String, Deliverer>>(){}.getType();
        BufferedReader br = new BufferedReader(new FileReader("static/json/deliverers.json"));
        DelivererDAO.deliverers = gson.fromJson(br, token);
        System.out.println(DelivererDAO.deliverers);
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
	

	
	
	public static Deliverer findDelivererByUsername(String uName) {
		for (Map.Entry<String, Deliverer> entry : deliverers.entrySet()) {
	        if(entry.getValue().getUserName().equals(uName) ) {
	        	return entry.getValue();
	        }
	    }
		return null;
	}
	
	
}

