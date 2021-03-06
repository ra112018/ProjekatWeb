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

import beans.Administrator;
import beans.Buyer;
import beans.Deliverer;
import beans.Manager;
import beans.Order;

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
	        	entry.getValue().setBirthDate(deliverer.getBirthDate());

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
	        if(entry.getValue().getUserName().equals(uName) ) {
	        	entry.getValue().setDeleted(true);
	        }
	    }
		try {
			addAccount();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void blockDeliverer(String uName) {
		for (Map.Entry<String, Deliverer> entry : deliverers.entrySet()) {
	        if(entry.getValue().getUserName().equals(uName) ) {
	        	entry.getValue().setBlocked(true);
	        }
	    }
		try {
			addAccount();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void addOrder(String deliverer, Order order) {
		// TODO Auto-generated method stub
		for (Map.Entry<String, Deliverer> entry : deliverers.entrySet()) {
	        if(entry.getValue().getUserName().equals(deliverer) ) {
	        	if(entry.getValue().getDeliveryOrders()!=null) {
		        		ArrayList<String> orders=entry.getValue().getDeliveryOrders();
		        		orders.add(order.getIdOrder());
		        		entry.getValue().setDeliveryOrders(orders);
		        	}
	        	else {
	        		ArrayList<String> orders=new ArrayList<String>();
	        		orders.add(order.getIdOrder());
	        		entry.getValue().setDeliveryOrders(orders);
	        	}
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

