package dao;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Article;
import beans.Basket;
import beans.Buyer;
import beans.CanceledOrders;
import beans.Order;
import beans.OrderStatus;
import beans.RandomString;

public class CanceledOrdersDAO {
	private static HashMap<Integer,CanceledOrders> canceledOrders;
	
	public static HashMap<Integer, CanceledOrders> getCanceledOrders(){
		return canceledOrders;
	}

	public static void setCanceledOrders(HashMap<Integer, CanceledOrders> canceledOrders) {
		CanceledOrdersDAO.canceledOrders = canceledOrders;
		
	}
	
	public CanceledOrdersDAO() {
		// TODO Auto-generated constructor stub
		canceledOrders = new HashMap<Integer,CanceledOrders>();
		try {
		     readCanceledOrders();
		 } catch (FileNotFoundException e) {
		     e.printStackTrace();
		 }
	}
	public void readCanceledOrders() throws FileNotFoundException{
        Gson gson = new Gson();
        Type token = new TypeToken<HashMap<Integer,CanceledOrders>>(){}.getType();
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

			for (Map.Entry<Integer, CanceledOrders> entry : canceledOrders.entrySet()) {
				
				Calendar cal = new GregorianCalendar();
				cal.setTime(new Date());
				cal.add(Calendar.DAY_OF_MONTH, -31);
				Date today30 = cal.getTime();
		        if(entry.getValue().getUserName().equals(userName) && entry.getValue().getDate().after(today30)) {
		        	 numberOfCancelings ++;
		        	 }
		    }			
		
		}	
		if(numberOfCancelings > 5) {
			return true;
		}
		return false;
		
	}

	public boolean addOrder(String idO, String userName) {
		// TODO Auto-generated method stub
		CanceledOrders o=new CanceledOrders();
		int id=findNextCanceledOrder();
		o.setId(id);
		
	/*	LocalDateTime dateTime = LocalDateTime.now(); // Gets the current date and time
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");*/
		o.setDate(new Date());
		o.setUserName(userName);
		canceledOrders.put(id, o);
		try {
			writeCanceledOrders();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		boolean suspicious=this.isSuspicious(userName);
		if(suspicious) {
			BuyerDao buyerDAO=new BuyerDao();
			buyerDAO.setSuspiciousBuyer(userName);
			return false;
		}
		return true;
	}
	
}
