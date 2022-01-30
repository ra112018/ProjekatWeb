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
import beans.Order;
import beans.UserType;
import beans.UserTypeName;

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
		buyer.setDeleted(false);
		buyer.setCustomerOrders(new ArrayList<Order>());
		UserType ut = new UserType();
		ut.setUserTypeName(UserTypeName.Usual);
		ut.setPercentage(0);
		ut.setPointsNeeded(0);
		buyer.setBuyerType("Usual");
		
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
		try {
			for (Map.Entry<String, Buyer> entry : buyers.entrySet()) {
			    if(entry.getValue().getUserName().equals(uName) ) {
			    	return entry.getValue();
			    }
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
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
	        	entry.getValue().setBirthDate(buyer.getBirthDate());
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
	
	public void blockBuyer(String uName) {
		for (Map.Entry<String, Buyer> entry : buyers.entrySet()) {
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
	
	public void setSuspiciousBuyers(ArrayList<Buyer> newBuyers) {
		for(Map.Entry<String, Buyer> entry: buyers.entrySet()) {
			for(Buyer buyer: newBuyers) {
				if(buyer.getUserName().equals(entry.getValue().getUserName())) {
					if(buyer.isSuspicious()) {
						entry.getValue().setSuspicious(true);
					}
				}
			}
		}
		try {
			addAccount();
		}catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	public void setSuspiciousBuyer(String usName) {
		for(Map.Entry<String, Buyer> entry: buyers.entrySet()) {
				if(usName.equals(entry.getValue().getUserName())) {
					entry.getValue().setSuspicious(true);
			}
		}
		try {
			addAccount();
		}catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

	public void changeBuyerPoints(Buyer buyer, double points) {
		// TODO Auto-generated method stub
		for (Map.Entry<String, Buyer> entry : buyers.entrySet()) {
	        if(entry.getValue().getUserName().equals(buyer.getUserName()) ) {
	        	entry.getValue().setCustomerPoints(points);
	        }
	    }
		try {
			addAccount();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

	public HashMap<String, Buyer> getBuyersWhoOrdered(String uName) {
		OrderDAO orderDAO= new OrderDAO();
		HashMap<String, Buyer> listOfBuyersOrdered= new HashMap<String,Buyer>();
		String rName = RestaurantDAO.findRestaurantByManager(uName).getRestaurantName();
		// TODO Auto-generated method stub
		for (String username: orderDAO.findUsernameBuyerWhoOrdered(rName)) {
			for (Map.Entry<String, Buyer> entry : buyers.entrySet()) {
		        if(entry.getValue().getUserName().equals(username) ) {
		    		listOfBuyersOrdered.put(entry.getValue().getUserName(),entry.getValue());
		        }
		    }
		}
		return listOfBuyersOrdered;
	}

	public void changeBuyerPointsByBasketPrice(Buyer buyer, double basketPrice) {
		// TODO Auto-generated method stub
		for (Map.Entry<String, Buyer> entry : buyers.entrySet()) {
	        if(entry.getValue().getUserName().equals(buyer.getUserName()) ) {
	        	entry.getValue().setCustomerPoints(entry.getValue().getCustomerPoints()+basketPrice/1000 *133);
	    		if(entry.getValue().getCustomerPoints()> 300 && entry.getValue().getCustomerPoints() < 500) {
	    			entry.getValue().setBuyerType("Bronze");
	    		}
	    		if(entry.getValue().getCustomerPoints()> 500 && entry.getValue().getCustomerPoints() < 1000) {
	    			entry.getValue().setBuyerType("Silver");
	    		}
	    		if(entry.getValue().getCustomerPoints()> 1000) {
	    			entry.getValue().setBuyerType("Golden");
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

	public void changeBuyerPointsWhenCanceling(String b, double newPoints) {
		// TODO Auto-generated method stub

		for (Map.Entry<String, Buyer> entry : buyers.entrySet()) {
	        if((entry.getValue().getName()+" "+ entry.getValue().getSurname()).equals(b) ) {
	    		double points=entry.getValue().getCustomerPoints() - newPoints/1000*133*4;
	    		if(points>0) {
	        	entry.getValue().setCustomerPoints(points);
	    		}
	    		else {
	    			entry.getValue().setCustomerPoints(0);
	    		}
	    		if(entry.getValue().getCustomerPoints()> 300 && entry.getValue().getCustomerPoints() < 500) {
	    			entry.getValue().setBuyerType("Bronze");
	    		}
	    		if(entry.getValue().getCustomerPoints()> 500 && entry.getValue().getCustomerPoints() < 1000) {
	    			entry.getValue().setBuyerType("Silver");
	    		}
	    		if(entry.getValue().getCustomerPoints() > 1000) {
	    			entry.getValue().setBuyerType("Golden");
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

	public Buyer findBuyerByNameAndSurname(String buyName) {
		// TODO Auto-generated method stub
		try {
			for (Map.Entry<String, Buyer> entry : buyers.entrySet()) {
			    if((entry.getValue().getName()+" "+entry.getValue().getSurname()).equals(buyName) ) {
			    	return entry.getValue();
			    }
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	

	
}
