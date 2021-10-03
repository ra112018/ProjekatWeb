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
import beans.Request;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Article;
import beans.Basket;
import beans.Buyer;
import beans.Manager;
import beans.Order;
import beans.OrderStatus;


public class OrderDAO {

	private HashMap<String,Order> orders; //idOrder is key value
	private BuyerDao buyerDAO=new BuyerDao();				//ovo sam dodala
	private ManagerDAO managerDAO = new ManagerDAO();		//ovo sam dodala

	public HashMap<String, Order> getOrders() {
		return orders;
	}

	public void setOrders(HashMap<String, Order> orders) {
		this.orders = orders;
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
        this.orders = gson.fromJson(br, token);

    }

	public boolean createOrder(String uName) {
		// TODO Auto-generated method stub
		Buyer buyer = null;									//ovo sam dodala
		Basket b=BasketDAO.findBasketByUsername(uName);
		Order o=new Order();
		o.setArticles(b.getBasketArticles());
		String id=RandomString.getAlphaNumericString(10);
		id = checkUnique(id);
		o.setIdOrder(id);
		o.setOrderStatus(OrderStatus.Processing);
		o.setPrice(b.getBasketPrice());
		for(Article a : b.getBasketArticles()) {
			o.setRestaurant(RestaurantDAO.findRestaurant(a.getRestaurantName()));
		}
		LocalDateTime dateTime = LocalDateTime.now(); // Gets the current date and time
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
		
		buyer = buyerDAO.findBuyerByUsername(uName);		//ovo sam dodala
		buyer.setCustomerPoints(buyer.getCustomerPoints()+b.getBasketPrice()/1000 *133);
		o.setTimeOfOrder(dateTime.format(formatter));
		//o.setBuyer(BuyerDao.findBuyerByUsername(uName));
		o.setBuyer(buyer);									//ovo sam dodala
		orders.put(id, o);
		try {
			addOrderInFile();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return true;
	}

	private String checkUnique(String id) {
		for (Map.Entry<String, Order> entry : orders.entrySet()) {			//provera jedinstvenosti

	        if((entry.getValue().getIdOrder()).equals(id) ) {
	        	id=RandomString.getAlphaNumericString(10);
	        }
	    }
		return id;
	}

	public void addOrderInFile() throws IOException{
		Gson gson = new Gson();
		FileWriter fw = new FileWriter("static/json/orders.json");
		gson.toJson(this.orders, fw);
		fw.flush();
		fw.close();
	}

	public HashMap<String, Order> getOrdersByManager(String uName) {
		// TODO Auto-generated method stub
		Manager manager = null; 				//ovo sam dodala 
		System.out.println(uName+"manager");
		HashMap<String,Order> m=new HashMap<String,Order>();
		//Manager manager=ManagerDAO.findManagerByUsername(uName);
		manager = managerDAO.findManagerByUsername(uName);        	//ovo sam dodala
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
		//Buyer buyer=BuyerDao.findBuyerByUsername(uName);
		Buyer buyer = null; 									//ovo sam dodala
		buyer = buyerDAO.findBuyerByUsername(uName);			//ovo sam dodala
		
		for (Map.Entry<String, Order> entry : orders.entrySet()) {

	        if((entry.getValue().getBuyer().getUserName()).equals(uName) ) {
	        	m.put((entry.getValue().getIdOrder()),entry.getValue());

	        }
	    }
		return m;
	}

	public boolean prepareOrder(String idO,String usName) {
		// TODO Auto-generated method stub
		for (Map.Entry<String, Order> entry : orders.entrySet()) {
	        if(entry.getValue().getIdOrder().equals(idO) ) {
	        			if(entry.getValue().getOrderStatus()==OrderStatus.Processing) {
	        			entry.getValue().setOrderStatus(OrderStatus.InPreparation);
	        			}
	        			else if(entry.getValue().getOrderStatus()==OrderStatus.InPreparation) {
		        			entry.getValue().setOrderStatus(OrderStatus.WaitingDeliverer);
	        			}
	        			else if(entry.getValue().getOrderStatus()==OrderStatus.WaitingDeliverer) {
	        				Request r=new Request();
	        				DelivererDAO delivererDAO = new DelivererDAO();
							r.setDeliverer(delivererDAO.findDelivererByUsername(usName));
							r.setIdOrder(idO);
							RequestDAO req=new RequestDAO();
							boolean e=req.addRequest(r);
							return e;
	        			}
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

	public boolean cancelOrder(String idO) {
		// TODO Auto-generated method stub
		for (Map.Entry<String, Order> entry : orders.entrySet()) {
	        if(entry.getValue().getIdOrder().equals(idO) ) {
	        			entry.getValue().setOrderStatus(OrderStatus.Canceled);
	        			Buyer b=entry.getValue().getBuyer();
	        			b.setCustomerPoints(b.getCustomerPoints()- entry.getValue().getPrice()/1000*133*4);
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
