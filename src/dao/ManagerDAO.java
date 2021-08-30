package dao;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Administrator;
import beans.Manager;

public class ManagerDAO {

	private static HashMap<String, Manager> managers;

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
    private void readManagers() throws FileNotFoundException{
        Gson gson = new Gson();
        Type token = new TypeToken<HashMap<String, Manager>>(){}.getType();
        BufferedReader br = new BufferedReader(new FileReader("static/json/managers.json"));
        ManagerDAO.managers = gson.fromJson(br, token);
        System.out.println(ManagerDAO.managers);
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
	

	
	
	public static Manager findManagerByUsername(String uName) {
		for (Map.Entry<String, Manager> entry : managers.entrySet()) {
	        if(entry.getValue().getUserName().equals(uName) ) {
	        	return entry.getValue();
	        }
	    }
		return null;
	}
	
	
}
