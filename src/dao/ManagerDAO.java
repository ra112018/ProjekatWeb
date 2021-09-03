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
import beans.Manager;
import beans.Order;
import beans.User;
import beans.UserType;

public class ManagerDAO {

	private HashMap<String, Manager> managers;

    public ManagerDAO() {

        managers = new HashMap<String, Manager>();
        try {
            readManagers();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }

    public HashMap<String,Manager> getManagers() {
		return managers;
	}
    
    public void setManagers(HashMap<String,Manager> managers) {
		this.managers = managers;
	}

    private void readManagers() throws FileNotFoundException{
        Gson gson = new Gson();
        Type token = new TypeToken<HashMap<String, Manager>>(){}.getType();
        BufferedReader br = new BufferedReader(new FileReader("static/json/managers.json"));
        this.managers = gson.fromJson(br, token);
        
    }

   

	public Manager findManager(String name, String pass) {
		// TODO Auto-generated method stub
		 for (Map.Entry<String, Manager> entry : managers.entrySet()) {
	            if(entry.getValue().getUserName().equals(name) && entry.getValue().getPassword().equals(pass) ) {
	                return entry.getValue();
	            }
	        }
	        return null;
	}
	
	
	public Manager findManagerByUsername(String uName) {
		for (Map.Entry<String, Manager> entry : managers.entrySet()) {
	        if(entry.getValue().getUserName().equals(uName) ) {
	        	return entry.getValue();
	        }
	    }
		return null;
	}
	
	public boolean ManagerExist(String name) {
		for (Map.Entry<String, Manager> entry : managers.entrySet()) {
	        if((entry.getValue().getName()+" "+entry.getValue().getSurname()).equals(name) ) {
	        	return true;
	        }
	    }
		return false;
	}
	
	public void updateManager(String usname, Manager manager) {
		for (Map.Entry<String, Manager> entry : managers.entrySet()) {
	        if(entry.getValue().getUserName().equals(usname) ) {
	        	entry.getValue().setName(manager.getName());
	        	entry.getValue().setSurname(manager.getSurname());
	        	entry.getValue().setGender(manager.getGender());
	        	entry.getValue().setPassword(manager.getPassword());
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
		FileWriter fw = new FileWriter("static/json/managers.json");
		gson.toJson(this.managers, fw);
		fw.flush();
		fw.close();
	}
	
	public Manager addManager(Manager manager) {
		
		managers.put(manager.getUserName(),manager);
		try {
			this.addAccount();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return manager;
	}
	
	public void deleteManager(String uName) {
		for (Map.Entry<String, Manager> entry : managers.entrySet()) {
	        if(entry.getValue().getUserName().equals(uName) ) {
	        	entry.getValue().deleted(true);
	        }
	    }
	}
	
	
	
}
