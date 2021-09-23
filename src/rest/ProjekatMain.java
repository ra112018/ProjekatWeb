package rest;


import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Administrator;
import beans.Article;
import beans.Basket;
import beans.Buyer;
import beans.Deliverer;
import beans.Location;
import beans.User;
import beans.Manager;
import beans.Order;
import beans.OrderStatus;
import beans.Restaurant;
import beans.User;
import dao.AdministratorDAO;
import dao.ArticleDAO;
import dao.BasketDAO;
import dao.BuyerDao;
import dao.DelivererDAO;
import dao.LocationDAO;
import dao.ManagerDAO;
import dao.OrderDAO;
import dao.RestaurantDAO;
import spark.Request;
import spark.Service.StaticFiles;
import spark.Session;
import spark.Spark;


public class ProjekatMain {
	private static BuyerDao buyerDAO=new BuyerDao();
	private static AdministratorDAO adminDAO=new AdministratorDAO();
	private static ManagerDAO managerDAO = new ManagerDAO();
	private static DelivererDAO delivererDAO = new DelivererDAO();
	private static RestaurantDAO restaurantDAO=new RestaurantDAO();
	private static LocationDAO locationDAO=new LocationDAO();
	private static ArticleDAO articleDAO=new ArticleDAO();
	private static BasketDAO basketDAO=new BasketDAO();
	private static OrderDAO orderDAO=new OrderDAO();



	private static Gson g=new Gson();

	public static void main(String[] args) throws Exception {
		// TODO Auto-generated method stub
		port(8080);
		String sr;
		staticFiles.externalLocation(sr=new File("./static").getCanonicalPath()); 
		
		get("/test", (req, res) -> {
			return "Works";
		});
		
		post("/login", (req, res)-> {
            String name  = req.queryParams("userName");
            String pass = req.queryParams("password");
			String korisnicko = " ";

            ArrayList<String> response = new ArrayList<String>();
            if(buyerDAO.findBuyer(name, pass) != null) {
				korisnicko = name;
				
               response.add(korisnicko);
			   response.add("kupac");

            }
            else if(adminDAO.findAdmin(name, pass)!=null) {
            	korisnicko=name;
            	response.add(korisnicko);
            	response.add("administrator");
            } else if(managerDAO.findManager(name, pass)!=null) {
            	korisnicko=name;
            	response.add(korisnicko);
            	response.add("manager");
            }else if(delivererDAO.findDeliverer(name, pass)!=null) {
            	korisnicko=name;
            	response.add(korisnicko);
            	response.add("deliverer");
            }
            response.add(korisnicko);
            return g.toJson(response);
        });
		
		post("/register", (req, res)-> {
			String reqBody = req.body();
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			
			Buyer buyerReg = gsonReg.fromJson(reqBody, Buyer.class);
			
			String userName = "exists";
			ArrayList<String> answers = new ArrayList<String>();
			if(buyerDAO.findBuyerByUsername(buyerReg.getUserName()) != null) {
				answers.add(userName);
				return g.toJson(answers);
			}else {
				buyerDAO.addBuyer(buyerReg);
				return true;
			}			
			
		});
		
		get("/account", (req, res)-> {
			String uName =  req.queryParams("userName");
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			User us;
			us = buyerDAO.findBuyerByUsername(uName);
			if(us != null) {
				return gsonReg.toJson(us);
			}
			else {
				us=adminDAO.findAdminByUsername(uName);
				if(us!=null) {
					return gsonReg.toJson(us);
				}else {
						us=managerDAO.findManagerByUsername(uName);
						if(us!=null) {
							return gsonReg.toJson(us);
						}
						else {
							us=delivererDAO.findDelivererByUsername(uName);
							if(us!=null) {
								return gsonReg.toJson(us);
							}
						}
					}
			}
			return gsonReg.toJson(us);
		
		});
		

		post("/updateProfile", (req, res)-> {
			String uName =  req.queryParams("userName");
			String reqBody = req.body();
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			User us = null;
			us = buyerDAO.findBuyerByUsername(uName);
			if(us != null) {

				Buyer buyer = gsonReg.fromJson(reqBody, Buyer.class);	
				buyerDAO.updateBuyer(uName, buyer);
			}else {
				us = adminDAO.findAdminByUsername(uName);
				if(us != null) {
					Administrator Gadmin = gsonReg.fromJson(reqBody, Administrator.class);
					adminDAO.updateAdmin(uName, Gadmin);
				}else {
					us = managerDAO.findManagerByUsername(uName);
					if(us != null) {
						Manager Gmanager = gsonReg.fromJson(reqBody, Manager.class);
						managerDAO.updateManager(uName, Gmanager);
					}else {
						us = delivererDAO.findDelivererByUsername(uName);
						if(us != null) {
							Deliverer Gdeliverer = gsonReg.fromJson(reqBody, Deliverer.class);
							delivererDAO.updateDeliverer(uName, Gdeliverer);
						}
					}
					
				}
			}
			return true;
			
		});
		
		post("/addUser", (req, res)-> {
			
			String rola = req.queryParams("role");
			String reqBody = req.body();
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			
			if(rola.equals("Deliverer")) {
				
				Deliverer deliverer = gsonReg.fromJson(reqBody, Deliverer.class);
				delivererDAO.addDeliverer(deliverer);
				
			}else if(rola.equals("Manager")) {
				Manager manager = gsonReg.fromJson(reqBody, Manager.class);
				managerDAO.addManager(manager);
				
			}
			
			
			return true;
		});
		
		post("/deleteUser", (req, res)-> {
			String uName = req.queryParams("userName");
			
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			User u = null;
			u = buyerDAO.findBuyerByUsername(uName);
			if(u != null) {
				buyerDAO.deleteBuyer(uName);
			}else {
					u = managerDAO.findManagerByUsername(uName);
					if(u != null) {
						managerDAO.deleteManager(uName);
					}else {
						u = delivererDAO.findDelivererByUsername(uName);
						if(u != null) {
							delivererDAO.deleteDeliverer(uName);
						
						}	
					}
			}
			return true;
		});
		
		
		
		
		get("/restaurantDetails", (req, res)-> {
			String rName =  req.queryParams("id");
			Restaurant r;
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			r = restaurantDAO.findRestaurantByName(rName);
			System.out.println(rName);

			if(r != null) {
				return gsonReg.toJson(r);
			}
			return gsonReg.toJson(r);
			
		});
		
		post("/addRestaurant", (req, res) -> {
			String reqBody = req.body();

			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			System.out.println("Pokrenuo");
			Restaurant r = gsonReg.fromJson(reqBody, Restaurant.class);
			Restaurant checkEror=restaurantDAO.addRestaurant(r);
			if(checkEror.getManagerName()=="nepostojeci" || checkEror.getManagerName()=="zauzet") {
				return false;
			}
		
			return true;
			
		});
		
		get("/articles",(req,res) -> {

			String rName =  req.queryParams("id");
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			ArrayList<Article> articleList = new ArrayList<Article>();
			for (Map.Entry<String, Article> entry : ArticleDAO.getArticlesByRestaurant(rName).entrySet()) {
					articleList.add( entry.getValue());

			}

			return gsonReg.toJson(articleList);
						
		});
		
		post("/addArticle", (req, res) -> {
			String reqBody = req.body();
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			Article r = gsonReg.fromJson(reqBody, Article.class);
			Article checkEror=articleDAO.addArticle(r);
		
			return true;
			
		});
		
		post("/addArticleToCart", (req, res) -> {
			String reqBody = req.body();
			
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			System.out.println("Pokrenuo");
			Basket r = gsonReg.fromJson(reqBody, Basket.class);
			boolean succAdded=basketDAO.addArticle(r);
			return succAdded;
	
			});

		post("/deleteFromCart", (req, res)-> {		
			String reqBody = req.body();
			String usName =  req.queryParams("userName");
			String artName =  req.queryParams("articleName");
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();

			basketDAO.deleteArticle(usName,artName);
			
			return true;
		});
		
		get("/admins", (req, res)->{
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			
			ArrayList<Administrator> admins = new ArrayList<Administrator>();
			for (Map.Entry<String, Administrator> entry : adminDAO.getAdmins().entrySet()) {
				if(!entry.getValue().isDeleted())
					admins.add( entry.getValue());
		        
		    }	
			return gsonReg.toJson(admins);
			
		});
		
		get("/managers", (req, res)->{
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			
			ArrayList<Manager> managers = new ArrayList<Manager>();
			for (Map.Entry<String, Manager> entry : managerDAO.getManagers().entrySet()) {
				if(!entry.getValue().isDeleted())
					managers.add( entry.getValue());
		        
		    }	
			return gsonReg.toJson(managers);
			
		});
		
		get("/deliverers", (req, res)->{
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			
			ArrayList<Deliverer> deliverers = new ArrayList<Deliverer>();
			for (Map.Entry<String, Deliverer> entry : delivererDAO.getDeliverers().entrySet()) {
				if(!entry.getValue().isDeleted())
					deliverers.add( entry.getValue());
		       }	
			return gsonReg.toJson(deliverers);
			
		});
		get("/buyers", (req, res)->{
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			
			ArrayList<Buyer> buyers = new ArrayList<Buyer>();
			for (Map.Entry<String, Buyer> entry : buyerDAO.getBuyers().entrySet()) {
				if(!entry.getValue().isDeleted())
					buyers.add( entry.getValue());
		        
		    }	
			return gsonReg.toJson(buyers);
			
		});
		
		get("/restaurants", (req, res)->{
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			ArrayList<Restaurant> restaurantList = new ArrayList<Restaurant>();
			for (Map.Entry<String, Restaurant> entry : RestaurantDAO.getRestaurants().entrySet()) {
					restaurantList.add( entry.getValue());
			}
			return gsonReg.toJson(restaurantList);
		});
		get("/findMyRestaurant", (req, res)->{

			String uName =  req.queryParams("userName");
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			Restaurant rs;

			rs = restaurantDAO.findRestaurantByManager(uName);
			return gsonReg.toJson(rs);
			
		});
		get("/searchingAdmins", (req, res)->{
			String s =  req.queryParams("searching");
			String r = req.queryParams("role");
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			
			ArrayList<Administrator> admins = new ArrayList<Administrator>();
			for (Map.Entry<String, Administrator> entry : adminDAO.getAdmins().entrySet()) {
				if(r.equals("administrator")|| r.equals("")) {
					if((entry.getValue().getName().contains(s) || entry.getValue().getSurname().contains(s) || entry.getValue().getUserName().contains(s)) && !entry.getValue().isDeleted() )
			        	admins.add( entry.getValue());
					} 
		    }	
			return gsonReg.toJson(admins);
			
		});
		
		get("/searchingManagers", (req, res)->{
			String s =  req.queryParams("searching");
			String r = req.queryParams("role");
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			
			ArrayList<Manager> managers = new ArrayList<Manager>();
			for (Map.Entry<String, Manager> entry : managerDAO.getManagers().entrySet()) {
				if(r.equals("manager")|| r.equals("")) {
					if((entry.getValue().getName().contains(s) || entry.getValue().getSurname().contains(s) || entry.getValue().getUserName().contains(s)) && !entry.getValue().isDeleted() )
			        	managers.add( entry.getValue());
					} 
		    }	
			return gsonReg.toJson(managers);
			
		});
		
		get("/searchingDeliverers", (req, res)->{
			String s =  req.queryParams("searching");
			String r = req.queryParams("role");
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			
			ArrayList<Deliverer> deliverers = new ArrayList<Deliverer>();
			for (Map.Entry<String, Deliverer> entry : delivererDAO.getDeliverers().entrySet()) {
				if(r.equals("deliverer")|| r.equals("")) {
					if((entry.getValue().getName().contains(s) || entry.getValue().getSurname().contains(s) || entry.getValue().getUserName().contains(s)) && !entry.getValue().isDeleted() )
			        	deliverers.add( entry.getValue());
					} 
		    }	
			return gsonReg.toJson(deliverers);
			
		});
		
		get("/searchingBuyers", (req, res)->{
			String s =  req.queryParams("searching");
			String r =  req.queryParams("role");
			String t =  req.queryParams("type");
		
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			ArrayList<Buyer> buyers = new ArrayList<Buyer>();
			if(r.equals("buyer") || r.equals("")) {
				for (Map.Entry<String, Buyer> entry : buyerDAO.getBuyers().entrySet()) {
					if(s.equals("") && !t.equals("")) {
						if( entry.getValue().getBuyerType().contains(t) && !entry.getValue().isDeleted())
							buyers.add( entry.getValue());
					}else {
						if((entry.getValue().getName().contains(s) || entry.getValue().getSurname().contains(s) || entry.getValue().getUserName().contains(s) || entry.getValue().getBuyerType().contains(t)) && !entry.getValue().isDeleted())
							buyers.add( entry.getValue());
					}
				}
			}
			return gsonReg.toJson(buyers);
			
		});
		
		get("/searchingRestaurants", (req, res)->{
			String s =  req.queryParams("searching");
			String n =  req.queryParams("restaurantName");
			String l =  req.queryParams("location");
		
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			ArrayList<Restaurant> restaurants = new ArrayList<Restaurant>();
			
				for (Map.Entry<String, Restaurant> entry : restaurantDAO.getRestaurants().entrySet()) {
					if(!s.equals("")) {
						if(entry.getValue().getRestaurantName().contains(n)) //i ovde provera da li je obrisan
							restaurants.add( entry.getValue());
					}
						
				}
			
			return gsonReg.toJson(restaurants);
			
		});
		
		get("/userBasket", (req, res)-> {
			String rName =  req.queryParams("userName");
			Basket r;
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			r = BasketDAO.findBasketByUsername(rName);
						
			System.out.println(rName);
			System.out.println(r);
			return gsonReg.toJson(r);
			
		});
		post("/order", (req, res) -> {
			String reqBody = req.body();
			String uName = req.queryParams("userName");
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			System.out.println("Porucivanje");
			boolean orderSuccess;
			
			Basket basket=basketDAO.findBasketByUsername(uName);
			
			orderSuccess=orderDAO.createOrder(uName);
			return orderSuccess;
			
		});
		
		get("/OrdersFromMyRestaurant", (req, res)->{
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			String uName =  req.queryParams("userName");
			ArrayList<Order> orders = new ArrayList<Order>();
			User us;
			us = buyerDAO.findBuyerByUsername(uName);
			if(us != null) {
				for (Map.Entry<String, Order> entry : orderDAO.getOrdersByBuyer(uName).entrySet()) {
					if(!entry.getValue().getOrderStatus().equals(OrderStatus.Canceled))
						orders.add( entry.getValue());
						System.out.println("Vracam");
			        
			    }	
				return gsonReg.toJson(orders);
			}
			else {
				for (Map.Entry<String, Order> entry : orderDAO.getOrdersByManager(uName).entrySet()) {
					if(!entry.getValue().getOrderStatus().equals(OrderStatus.Canceled))
						orders.add( entry.getValue());
			        
			    }	
			}
			
			return gsonReg.toJson(orders);
		});
		
		
	}

}
