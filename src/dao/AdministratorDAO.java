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
import beans.Order;
import beans.UserType;

public class AdministratorDAO {

	private HashMap<String, Administrator> admins;

    public AdministratorDAO() {

        admins = new HashMap<String, Administrator>();
        try {
            readAdmins();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }
    
    public HashMap<String,Administrator> getAdmins() {
		return admins;
	}
    
    public void setAdmins(HashMap<String,Administrator> admins) {
		this.admins = admins;
	}

    private void readAdmins() throws FileNotFoundException{
        Gson gson = new Gson();
        Type token = new TypeToken<HashMap<String,Administrator>>(){}.getType();
        BufferedReader br = new BufferedReader(new FileReader("static/json/administrators.json"));
        this.admins = gson.fromJson(br, token);
        
    }

   

	public Administrator findAdmin(String name, String pass) {
		// TODO Auto-generated method stub
		 for (Map.Entry<String, Administrator> entry : admins.entrySet()) {
	            if(entry.getValue().getUserName().equals(name) && entry.getValue().getPassword().equals(pass) ) {
	                return entry.getValue();
	            }
	        }
	        return null;
	}
	

	
	
	public Administrator findAdminByUsername(String uName) {
		for (Map.Entry<String, Administrator> entry : admins.entrySet()) {
	        if(entry.getValue().getUserName().equals(uName) ) {
	        	return entry.getValue();
	        }
	    }
		return null;
	}
	
	public void updateAdmin(String usname, Administrator admin) {
		for (Map.Entry<String, Administrator> entry : admins.entrySet()) {
	        if(entry.getValue().getUserName().equals(usname) ) {
	        	entry.getValue().setName(admin.getName());
	        	entry.getValue().setSurname(admin.getSurname());
	        	entry.getValue().setGender(admin.getGender());
	        	entry.getValue().setPassword(admin.getPassword());
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
		FileWriter fw = new FileWriter("static/json/administrators.json");
		gson.toJson(this.admins, fw);
		fw.flush();
		fw.close();
	}
	

}
