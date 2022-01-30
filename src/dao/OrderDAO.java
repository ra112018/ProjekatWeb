package dao;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import beans.RandomString ;
import beans.Request;
import beans.Restaurant;
import beans.UserTypeName;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Article;
import beans.Basket;
import beans.BasketArticle;
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

	public boolean createOrder(String uName, String price) {
		// TODO Auto-generated method stub
		Buyer buyer = null;									//ovo sam dodala
		Basket b=BasketDAO.findBasketByUsername(uName);
		Order o=new Order();
		o.setArticles(b.getBasketArticles());
		String id=RandomString.getAlphaNumericString(10);
		id = checkUnique(id);
		o.setIdOrder(id);
		o.setOrderStatus(OrderStatus.Processing);
		o.setPrice(Integer.parseInt(price));
		RestaurantDAO rDao = new RestaurantDAO();
		for(BasketArticle a : b.getBasketArticles()) {
			ArticleDAO articleDAO=new ArticleDAO();
			Article art=articleDAO.findArticleByName(a.getArticleName());
			o.setRestaurantName(art.getRestaurantName());
			o.setRestaurantType(rDao.findRestaurant(art.getRestaurantName()).getRestaurantType());
		}
		LocalDateTime dateTime = LocalDateTime.now(); // Gets the current date and time
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
		
		buyer = buyerDAO.findBuyerByUsername(uName);		//ovo sam dodala
		buyerDAO.changeBuyerPointsByBasketPrice(buyer, b.getBasketPrice());
		
		o.setTimeOfOrder(dateTime.format(formatter));
		//o.setBuyer(BuyerDao.findBuyerByUsername(uName));
		o.setBuyer(buyer.getName()+" "+buyer.getSurname());									//ovo sam dodala
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
		Manager manager = null; 
		ArticleDAO articleDAO = new ArticleDAO();
		HashMap<String,Order> m=new HashMap<String,Order>();
		//Manager manager=ManagerDAO.findManagerByUsername(uName);
		manager = managerDAO.findManagerByUsername(uName);        	
		String mName=manager.getName()+" "+manager.getSurname();
		for (Map.Entry<String, Order> entry : orders.entrySet()) {
	        if(entry.getValue().getArticles().get(0)!=null) {
	        		Article article = articleDAO.findArticleByName(entry.getValue().getArticles().get(0).getArticleName());
	        		if(article.getRestaurantName()!=null ){
	        			Restaurant rest = RestaurantDAO.findRestaurant(article.getRestaurantName());
	        		if(rest.getManagerName().equals(mName))	{     
	    		  		m.put((entry.getValue().getIdOrder()),entry.getValue());
	      }
	     }
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
			System.out.println(entry.getValue());
	        if(entry.getValue().getBuyer()!= null && (entry.getValue().getBuyer()).equals(buyer.getName()+" "+ buyer.getSurname()) ) {
				System.out.println(entry.getValue().getBuyer());

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
							r.setDeliverer(delivererDAO.findDelivererByUsername(usName).getUserName());
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
	        			String b=entry.getValue().getBuyer();
	        			buyerDAO.changeBuyerPointsWhenCanceling(b,entry.getValue().getPrice());
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

	public boolean approveOrder(String idR, String userName) {
		// TODO Auto-generated method stub
		Request r=RequestDAO.findRequestById(idR);
		for (Map.Entry<String, Order> entry : orders.entrySet()) {
	        if(entry.getValue().getIdOrder().equals(r.getIdOrder()) ) {
	        			entry.getValue().setOrderStatus(OrderStatus.InTransport);
	        			DelivererDAO delivererDAO = new DelivererDAO();
						delivererDAO.addOrder(r.getDeliverer(), entry.getValue());
	        }
	    }
		try {
			addOrderInFile();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		RequestDAO.deleteRequest(idR);

		return true;
	}

	public boolean deliverOrder(String idO, String userName) {
		// TODO Auto-generated method stub
		for (Map.Entry<String, Order> entry : orders.entrySet()) {
	        if(entry.getValue().getIdOrder().equals(idO) ) {
	        			if(entry.getValue().getOrderStatus()==OrderStatus.InTransport) {
	        			entry.getValue().setOrderStatus(OrderStatus.Delivered);
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

	public HashMap<String,Restaurant> findRestaurantsWhereBuyerOrdered(String uName) {
		// TODO Auto-generated method stub
		Buyer buyer = null; 									
		buyer = buyerDAO.findBuyerByUsername(uName);			
		HashMap<String,Restaurant> restList=new HashMap<String,Restaurant>();
		for (Map.Entry<String, Order> entry : orders.entrySet()) {

	        if((entry.getValue().getBuyer()).equals(buyer.getName()+" "+buyer.getSurname()) && entry.getValue().getOrderStatus() == OrderStatus.Delivered ) {
	        	restList.put((entry.getValue().getRestaurantName()),RestaurantDAO.findRestaurant(entry.getValue().getRestaurantName()));
	        }
		}
		return restList;
	
		}

	public String findUserByOrder(String idO) {
		// TODO Auto-generated method stub
		String buyName="";
		for (Map.Entry<String, Order> entry : orders.entrySet()) {

	        if((entry.getValue().getIdOrder()).equals(idO) ) {
	        	buyName=entry.getValue().getBuyer();
	        }
		}
		Buyer buyer = buyerDAO.findBuyerByNameAndSurname(buyName);
	        
		return buyer.getUserName();
	}

	public ArrayList<String> findUsernameBuyerWhoOrdered(String resName) {
		// TODO Auto-generated method stub
		ArrayList usernames=new ArrayList();
		for (Map.Entry<String, Order> entry : orders.entrySet()) {
			if(entry.getValue().getRestaurantName()!=null && (entry.getValue().getRestaurantName()).equals(resName)) {
				Buyer buyer = buyerDAO.findBuyerByNameAndSurname(entry.getValue().getBuyer());
	        	usernames.add(buyer.getUserName());
	        }
		}
		return usernames;
	}


}
	
