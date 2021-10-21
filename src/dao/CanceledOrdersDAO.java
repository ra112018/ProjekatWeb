package dao;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.HashMap;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Basket;
import beans.CanceledOrders;

public class CanceledOrdersDAO {
	private static HashMap<String,CanceledOrders> canceledOrders;
	
	public static HashMap<String, CanceledOrders> getCanceledOrders(){
		return canceledOrders;
	}

	public static void setCanceledOrders(HashMap<String, CanceledOrders> canceledOrders) {
		CanceledOrdersDAO.canceledOrders = canceledOrders;
		
	}
	
	public CanceledOrdersDAO() {
		// TODO Auto-generated constructor stub
		canceledOrders = new HashMap<String,CanceledOrders>();
		try {
		     readCanceledOrders();
		 } catch (FileNotFoundException e) {
		     e.printStackTrace();
		 }
	}
	public void readCanceledOrders() throws FileNotFoundException{
        Gson gson = new Gson();
        Type token = new TypeToken<HashMap<String,CanceledOrders>>(){}.getType();
        BufferedReader br = new BufferedReader(new FileReader("static/json/canceledOrders.json"));
        CanceledOrdersDAO.canceledOrders = gson.fromJson(br, token);
        System.out.println(CanceledOrdersDAO.canceledOrders);

    }
	
	public void writeCanceledOrders() throws IOException {
		Gson gson = new Gson();
		FileWriter writer = new FileWriter("static/json/canceledOrders.json");
		gson.toJson(this.canceledOrders, writer);
		writer.flush();
		writer.close();
	}
	
	public int findNextCanceledOrder() {
		return canceledOrders.size()+1;
	}
	
	public boolean isSuspicious(String userName) {
		int numberOfCancelings = 0;
		for(int i = 0; i < canceledOrders.size(); i++) {
		/*	if(canceledOrders)) {
				
			}
		*/		
		
		}	
		if(numberOfCancelings > 5) {
			return true;
		}
		return false;
		
	}
	
}
