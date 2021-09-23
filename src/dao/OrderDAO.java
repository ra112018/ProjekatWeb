package dao;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

import beans.RandomString ;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Article;
import beans.Basket;
import beans.Buyer;
import beans.Manager;
import beans.Order;
import beans.OrderStatus;


public class OrderDAO {

	private static HashMap<String,Order> orders; //idOrder is key value


	public static HashMap<String, Order> getOrders() {
		return orders;
	}

	public static void setOrders(HashMap<String, Order> orders) {
		OrderDAO.orders = orders;
	}
	public OrderDAO() {
		// TODO Auto-generated constructor stub
		orders = new HashMap<String,Order>();
        try {
            readOrders();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
	}

	private void readOrders() throws FileNotFoundException{
        Gson gson = new Gson();
        Type token = new TypeToken<HashMap<String,Order>>(){}.getType();
        BufferedReader br = new BufferedReader(new FileReader("static/json/orders.json"));
        OrderDAO.orders = gson.fromJson(br, token);

    }

	public boolean createOrder(String uName) {
		// TODO Auto-generated method stub
		Basket b=BasketDAO.findBasketByUsername(uName);
		Order o=new Order();
		o.setArticles(b.getBasketArticles());
		String id=RandomString.getAlphaNumericString(10);
		o.setIdOrder(id);
		o.setOrderStatus(OrderStatus.Processing);
		o.setPrice(b.getBasketPrice());
		for(Article a : b.getBasketArticles()) {
			o.setRestaurant(RestaurantDAO.findRestaurant(a.getRestaurantName()));
		}
		LocalDateTime dateTime = LocalDateTime.now(); // Gets the current date and time
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
		o.setTimeOfOrder(dateTime.format(formatter));
		o.setBuyer(BuyerDao.findBuyerByUsername(uName));
		orders.put(id, o);
		try {
			OrderDAO.addOrderInFile();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return true;
	}

	public static void addOrderInFile() throws IOException{
		Gson gson = new Gson();
		FileWriter fw = new FileWriter("static/json/orders.json");
		gson.toJson(OrderDAO.orders, fw);
		fw.flush();
		fw.close();
	}

	public HashMap<String, Order> getOrdersByManager(String uName) {
		// TODO Auto-generated method stub
		System.out.println(uName+"manager");
		HashMap<String,Order> m=new HashMap<String,Order>();
		Manager manager=ManagerDAO.findManagerByUsername(uName);
		String mName=manager.getName()+" "+manager.getSurname();
		for (Map.Entry<String, Order> entry : orders.entrySet()) {

	        if((entry.getValue().getRestaurant().getManagerName()).equals(mName) ) {
	        	m.put((entry.getValue().getIdOrder()),entry.getValue());

	        }
	    }
		return m;
	}

	public HashMap<String, Order> getOrdersByBuyer(String uName) {
		// TODO Auto-generated method stub
		System.out.println(uName+"buyer");
		HashMap<String,Order> m=new HashMap<String,Order>();
		Buyer buyer=BuyerDao.findBuyerByUsername(uName);
		for (Map.Entry<String, Order> entry : orders.entrySet()) {

	        if((entry.getValue().getBuyer().getUserName()).equals(uName) ) {
	        	m.put((entry.getValue().getIdOrder()),entry.getValue());

	        }
	    }
		return m;
	}

	public boolean prepareOrder(String idO) {
		// TODO Auto-generated method stub
		for (Map.Entry<String, Order> entry : orders.entrySet()) {
	        if(entry.getValue().getIdOrder().equals(idO) ) {
	        			entry.getValue().setOrderStatus(OrderStatus.InPreparation);
     
	        }
	    }
		try {
			addOrderInFile();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return true;
	}

}
