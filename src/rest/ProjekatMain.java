package rest;


import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Administrator;
import beans.Article;
import beans.AverageGradeRestaurant;
import beans.Basket;
import beans.Buyer;
import beans.Comment;
import beans.CommentStatus;
import beans.Deliverer;
import beans.Location;
import beans.User;
import beans.Manager;
import beans.Order;
import beans.OrderStatus;
import beans.Restaurant;
import dao.AdministratorDAO;
import dao.ArticleDAO;
import dao.BasketDAO;
import dao.BuyerDao;
import dao.CanceledOrdersDAO;
import dao.CommentDAO;
import dao.DelivererDAO;
import dao.LocationDAO;
import dao.ManagerDAO;
import dao.OrderDAO;
import dao.RequestDAO;
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
	private static RequestDAO requestDAO=new RequestDAO();
	private static CommentDAO commentDAO=new CommentDAO();
	private static CanceledOrdersDAO canceledOrdersDAO=new CanceledOrdersDAO();


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
            	if(!buyerDAO.findBuyer(name, pass).isBlocked() && !buyerDAO.findBuyer(name, pass).isDeleted()) {
            		korisnicko = name;   				
                    response.add(korisnicko);
     			    response.add("kupac");
            	}else if(buyerDAO.findBuyer(name, pass).isBlocked()){
            		korisnicko = "blocked";
            		response.add(korisnicko);
            	}	else if(buyerDAO.findBuyer(name, pass).isDeleted()){
            		korisnicko = "deleted";
            		response.add(korisnicko);
            	}					

            }
            else if(adminDAO.findAdmin(name, pass)!=null) {
            	korisnicko=name;
            	response.add(korisnicko);
            	response.add("administrator");
            } else if(managerDAO.findManager(name, pass)!=null) {
            	if(!managerDAO.findManager(name, pass).isBlocked() && !managerDAO.findManager(name, pass).isDeleted()) {
            		korisnicko=name;
                	response.add(korisnicko);
                	response.add("manager");
            	}else if(managerDAO.findManager(name, pass).isBlocked()){
            		korisnicko = "blocked";
            		response.add(korisnicko);
            	}   
            	else if(managerDAO.findManager(name, pass).isDeleted()){
            		korisnicko = "deleted";
            		response.add(korisnicko);
            	}      
            	
            }else if(delivererDAO.findDeliverer(name, pass)!=null) {
            	
            	if(!delivererDAO.findDeliverer(name, pass).isBlocked() && !delivererDAO.findDeliverer(name, pass).isDeleted()) {
            		korisnicko=name;
                	response.add(korisnicko);
                	response.add("deliverer");
            	}else if(delivererDAO.findDeliverer(name, pass).isBlocked()){
            		korisnicko = "blocked";
            		response.add(korisnicko);
            	}    
            	else if(delivererDAO.findDeliverer(name, pass).isDeleted()){
            		korisnicko = "deleted";
            		response.add(korisnicko);
            	}           
            }
            
            return g.toJson(response);
        });
		
		post("/register", (req, res)-> {
			String reqBody = req.body();
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			
			Buyer buyerReg = gsonReg.fromJson(reqBody, Buyer.class);
			
			String userName = "exists";
			ArrayList<String> answers = new ArrayList<String>();
			if(buyerDAO.findBuyerByUsername(buyerReg.getUserName()) != null || 
					managerDAO.findManagerByUsername(buyerReg.getUserName()) != null || 
					delivererDAO.findDelivererByUsername(buyerReg.getUserName()) != null|| 
					adminDAO.findAdminByUsername(buyerReg.getUserName()) != null) { 		//provera da li postoji i menadzer ili dostavljac sa takvim usernameom
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
			System.out.print(reqBody);
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
			String username = req.queryParams("userName");
			
			String reqBody = req.body();
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			
			String userNameExists="exists";
			ArrayList<String> answers=new ArrayList<String>();
			if(rola.equals("Deliverer")) {
				
				Deliverer deliverer = gsonReg.fromJson(reqBody, Deliverer.class);
				
				if(delivererDAO.findDelivererByUsername(deliverer.getUserName())!=null) {
					answers.add(userNameExists);
					return g.toJson(answers);
				}
				else if(managerDAO.findManagerByUsername(deliverer.getUserName())!=null) {
					answers.add(userNameExists);
					return g.toJson(answers);
				}
				else if(buyerDAO.findBuyerByUsername(deliverer.getUserName())!=null) {
					answers.add(userNameExists);
					return g.toJson(answers);
				}
				else 
				{
					deliverer.setDeleted(false);
					deliverer.setDeliveryOrders(new ArrayList<String>());
					delivererDAO.addDeliverer(deliverer);
					return true;
				}
			}else if(rola.equals("Manager")) {
				Manager manager = gsonReg.fromJson(reqBody, Manager.class);
				if(managerDAO.findManagerByUsername(manager.getUserName())!=null) {
					answers.add(userNameExists);
					return g.toJson(answers);
				}
				else if(delivererDAO.findDelivererByUsername(manager.getUserName())!=null) {
					answers.add(userNameExists);
					return g.toJson(answers);
				}
				else if(buyerDAO.findBuyerByUsername(manager.getUserName())!=null) {
					answers.add(userNameExists);
					return g.toJson(answers);
				}
				else {
					manager.setDeleted(false);
					managerDAO.addManager(manager);
					return true;
				}
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

			if(r != null && !r.getDeleted()) {
				return gsonReg.toJson(r);
			}
			return gsonReg.toJson(r);
			
		});
		
		post("/addRestaurant", (req, res) -> {
			String reqBody = req.body();

			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			Restaurant r = gsonReg.fromJson(reqBody, Restaurant.class);
			Restaurant checkEror=restaurantDAO.addRestaurant(r);
			if(checkEror.getManagerName()=="nepostojeci" || checkEror.getManagerName()=="zauzet") {
				System.out.println(checkEror.getManagerName());
				return false;
			}
		
			return true;
			
		});
		post("/changeRestaurantImg", (req, res) -> {
			String reqBody = req.body();
			
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			Restaurant r = gsonReg.fromJson(reqBody, Restaurant.class); //polovican restoran

			boolean checkEror=restaurantDAO.changeRestaurantImage(r.getRestaurantName(),r.getLogo());
		
			return checkEror;
			
		});
		post("/changeArticleImg", (req, res) -> {
			String reqBody = req.body();
			
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			Article r = gsonReg.fromJson(reqBody, Article.class); //polovican artikal

			boolean checkEror=articleDAO.changeArticleImage(r.getArticleName(),r.getArticlePhoto());
		
			return checkEror;
			
		});
		post("/addLocation", (req, res) -> {
			String reqBody = req.body();
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			Location r = gsonReg.fromJson(reqBody, Location.class);
			boolean checkEror=locationDAO.addLocation(r);
		
			return true;
			
		});
		post("/addLocationToRestaurant", (req, res) -> {

			String rName =  req.queryParams("restaurantName");
			String location =  req.queryParams("locationId");
			boolean checkEror=restaurantDAO.addLocation(rName,location);
		
			return checkEror;
			
		});
		post("/changeStatus", (req, res) -> {

			String rName =  req.queryParams("rName");
			String status =  req.queryParams("status");
			boolean checkEror=restaurantDAO.changeStatus(rName,status);
		
			return checkEror;
			
		});
		post("/changeType", (req, res) -> {

			String rName =  req.queryParams("rName");
			String type =  req.queryParams("type");
			boolean checkEror=restaurantDAO.changeType(rName,type);
			return checkEror;
			
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
		get("/allLocations",(req,res) -> {

			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			ArrayList<Location> locationList = new ArrayList<Location>();
			for (Map.Entry<Integer, Location> entry : locationDAO.getLocations().entrySet()) {
					locationList.add( entry.getValue());

			}

			return gsonReg.toJson(locationList);
						
		});
		get("/location",(req,res) -> {

			String locationId =  req.queryParams("id");
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			Location l;

			l = locationDAO.findLocation(Integer.valueOf(locationId));
			return gsonReg.toJson(l);
						
		});
		
		post("/addArticle", (req, res) -> {
			String reqBody = req.body();
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			Article r = gsonReg.fromJson(reqBody, Article.class);
			boolean checkEror=articleDAO.addArticle(r);
		
			return !checkEror;
			
		});
		
		post("/editArticle", (req, res) -> {
			String reqBody = req.body();
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			Article r = gsonReg.fromJson(reqBody, Article.class);
			boolean checkEror=articleDAO.editArticle(r);
		
			return checkEror;
			
		});
		post("/addArticleToCart", (req, res) -> {
			String reqBody = req.body();
			String usName =  req.queryParams("userName");
			String articleName=req.queryParams("articleName");
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			boolean succAdded=basketDAO.addArticle(usName,articleName);
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
		get("/availableManagers", (req, res)->{
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			
			ArrayList<Manager> managers = new ArrayList<Manager>();
			if(managerDAO.getAvailableManagers() != null) {
			System.out.println("ovde");
			for (Map.Entry<String, Manager> entry : managerDAO.getAvailableManagers().entrySet()) {
				if(!entry.getValue().isDeleted())
					managers.add( entry.getValue());
		    }	}
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
				if(entry.getValue().getDeleted()!= true)
					restaurantList.add( entry.getValue());
			}
			return gsonReg.toJson(restaurantList);
		});
		get("/orderedFromRestaurant", (req, res)->{
			String uName =  req.queryParams("userName");
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			ArrayList<Restaurant> restaurantList = new ArrayList<Restaurant>();
			for (Map.Entry<String, Restaurant> entry : RestaurantDAO.getRestaurantsWhereBuyerOrdered(uName).entrySet()) {
				if(entry.getValue().getDeleted()!= true)
					restaurantList.add( entry.getValue());
			}
			return gsonReg.toJson(restaurantList);
		});
		get("/findMyRestaurant", (req, res)->{

			String uName =  req.queryParams("userName");
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			Restaurant rs;

			rs = restaurantDAO.findRestaurantByManager(uName);
			if(rs.getDeleted() == true) {
				return gsonReg.toJson("deleted");
			}
			else {
			return gsonReg.toJson(rs);
			}
			
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
			String s =  req.queryParams("searchingName");
			String n =  req.queryParams("restaurantName");
			String l =  req.queryParams("searchingLocation");
			String t=req.queryParams("restaurantType");
			String g=req.queryParams("grade");
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			ArrayList<Restaurant> restaurants = new ArrayList<Restaurant>();
			
				for (Map.Entry<String, Restaurant> entry : restaurantDAO.getRestaurants().entrySet()) {
					if(s!=null && !s.equals("")) {
						if(entry.getValue().getRestaurantName().contains(s) && entry.getValue().getDeleted()!=true) //i ovde provera da li je obrisan
							restaurants.add( entry.getValue());
							}
					else if(l!=null && !l.equals("")) {
						System.out.println("trazim lokaciju"+l);
						if(locationDAO.findLocation(entry.getValue().getLocationId())!=null && locationDAO.findLocation(entry.getValue().getLocationId()).getCity().contains(l)
								&& entry.getValue().getDeleted()!=true) {
							restaurants.add(entry.getValue());
						}
					}
					else if(t!=null && !t.equals("")) {
						
						if(entry.getValue().getRestaurantType().toString().equals(t) && entry.getValue().getDeleted()!=true) {
							restaurants.add(entry.getValue());
						}
					}
					else if(g!=null && !g.equals("")) {
						if(commentDAO.checkRestaurantByGrade(entry.getValue(),g) && entry.getValue().getDeleted()!=true) {
							restaurants.add(entry.getValue());
						}
					}
						
				}
			
			return gsonReg.toJson(restaurants);
			
		});
		
		get("/userBasket", (req, res)-> {
			String rName =  req.queryParams("userName");
			Basket r;
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			r = BasketDAO.findBasketByUsername(rName);
			if(r!=null) {
			return gsonReg.toJson(r);
			}
			else {
				r=new Basket();
				return gsonReg.toJson(r);
			}
			
		});
		
		get("/grades", (req, res)-> {
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			ArrayList<AverageGradeRestaurant> avgGrade = new ArrayList<AverageGradeRestaurant>();
			avgGrade = commentDAO.findRestaurantsAverageGrade();	
			return gsonReg.toJson(avgGrade);

		});
		
		post("/order", (req, res) -> {
			String reqBody = req.body();
			String uName = req.queryParams("userName");
			String price = req.queryParams("price");

			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			//provera id jedinstven
			boolean orderSuccess;
			orderSuccess=orderDAO.createOrder(uName,price);
			basketDAO.emptyBasketByUsername(uName);

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
			        
			    }	
			}
			else {
				us = managerDAO.findManagerByUsername(uName);
				if(us != null) {
				for (Map.Entry<String, Order> entry : orderDAO.getOrdersByManager(uName).entrySet()) {
					if(!entry.getValue().getOrderStatus().equals(OrderStatus.Canceled))
						orders.add( entry.getValue());
				}
			    }
				else {
					Deliverer deliverer=delivererDAO.findDelivererByUsername(uName);
					if(deliverer != null){
						for (Map.Entry<String, Order> entry : orderDAO.getOrders().entrySet()) {
							if(entry.getValue().getOrderStatus()!=null && entry.getValue().getOrderStatus().equals(OrderStatus.WaitingDeliverer) ) {
								if(!requestDAO.delivererRequestedOrder(uName,entry.getValue().getIdOrder())) {
									orders.add( entry.getValue());
								}
							}
							else if(entry.getValue().getOrderStatus()!=null && entry.getValue().getOrderStatus().equals(OrderStatus.InTransport)) {
								for(int i = 0;i< deliverer.getDeliveryOrders().size();i++) {
									if(deliverer.getDeliveryOrders().get(i).equals(entry.getValue().getIdOrder())) {
											orders.add( entry.getValue());
									}
								}
							
						}
					}
					}
				}
			}
			return gsonReg.toJson(orders);
		});
		
		get("/requestsForMyRestaurant", (req, res)->{
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			String uName =  req.queryParams("userName");
			ArrayList<beans.Request> requests = new ArrayList<beans.Request>();

			for (Map.Entry<String, Order> entry : orderDAO.getOrdersByManager(uName).entrySet()) {
				if(entry.getValue().getOrderStatus().equals(OrderStatus.WaitingDeliverer)) {
					for (Map.Entry<Integer, beans.Request> entryR : RequestDAO.getRequests().entrySet()) {
					if(entry.getValue().getIdOrder().equals(entryR.getValue().getIdOrder()) && entryR.getValue().isApproved()!=true) {
						requests.add( entryR.getValue());
					}
				}
				}
				
			}
			
			return gsonReg.toJson(requests);

		});
		
		post("/prepareOrder" ,(req, res) -> {
			String idO = req.queryParams("idOrder");
			String userName=req.queryParams("userName");
			boolean orderSuccess;
			
			
			orderSuccess=orderDAO.prepareOrder(idO,userName);
			return orderSuccess;
		});
		post("/deliveredOrder" ,(req, res) -> {
			String idO = req.queryParams("idOrder");
			String userName=req.queryParams("userName");
			boolean orderSuccess;
			
			
			orderSuccess=orderDAO.deliverOrder(idO,userName);
			return orderSuccess;
		});
		post("/buyerCancelOrder",(req, res) -> {
			String idO = req.queryParams("idOrder");
			String uName = req.queryParams("userName");

			boolean orderSuccess;
			boolean niceBuyer;
			orderSuccess=orderDAO.cancelOrder(idO);
			niceBuyer=canceledOrdersDAO.addOrder(idO,uName);
			if(niceBuyer == true) {
				return niceBuyer;
			}
			else return false;
		});
		post("/approveOrder" ,(req, res) -> {
			String idR = req.queryParams("idRequest");
			String userName=req.queryParams("userName");
			boolean approveSuccess;
			approveSuccess=orderDAO.approveOrder(idR,userName);
			return approveSuccess;
		});
		post("/addComment",(req, res) -> {
			String reqBody = req.body();
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			Comment comment = gsonReg.fromJson(reqBody, Comment.class);
			boolean addSuccess;
			addSuccess=commentDAO.addComment(comment);
			return addSuccess;
		});
		get("/comments",(req,res) -> {

			String rName =  req.queryParams("restaurantName");
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			ArrayList<Comment> commentList = new ArrayList<Comment>();
			for (Map.Entry<Integer, Comment> entry : CommentDAO.getCommentsByRestaurant(rName).entrySet()) {
					commentList.add( entry.getValue());
			}
			return gsonReg.toJson(commentList);
						
		});
		post("/approveComment",(req, res) -> {
			String idC = req.queryParams("id");
			boolean approveSuccess;
			approveSuccess=commentDAO.approveComment(idC);
			return approveSuccess;
		});
		post("/deleteComment",(req, res) -> {
			String idC = req.queryParams("id");
			boolean deleteSuccess;
			deleteSuccess=commentDAO.deleteComment(idC);
			return deleteSuccess;
		});
		post("/declineComment",(req, res) -> {
			String idC = req.queryParams("idComment");
			boolean approveSuccess;
			approveSuccess=commentDAO.declineComment(idC);
			return approveSuccess;
		});
		
		post("/blockUser", (req, res)-> {
			String uName = req.queryParams("userName");
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			User u = null;
			u = buyerDAO.findBuyerByUsername(uName);
			if(u != null) {
				buyerDAO.blockBuyer(uName);
			}else {
					u = managerDAO.findManagerByUsername(uName);
					if(u != null) {
						managerDAO.blockManager(uName);
					}else {
						u = delivererDAO.findDelivererByUsername(uName);
						if(u != null) {
							delivererDAO.blockDeliverer(uName);
						
						}	
					}
			}
			return true;
		});
		
		
		get("/suspiciousUsersTable", (req, res)->{
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			ArrayList<Buyer> buyers = new ArrayList<Buyer>();
			for(Map.Entry<String, Buyer> entry: buyerDAO.getBuyers().entrySet()) {
				if(!entry.getValue().isDeleted() && entry.getValue().isSuspicious()){
					buyers.add(entry.getValue());					//ovde podesiti za sumnjive
				}
			}
			return gsonReg.toJson(buyers);
			
		});
		
		post("/blockSuspiciousBuyers", (req, res) -> {
			String uName = req.queryParams("userName");
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			Buyer buyer = buyerDAO.findBuyerByUsername(uName);
			if(buyer != null) {
				buyerDAO.blockBuyer(uName);
			}
		
			return true;
		});
		post("/deleteRestaurant", (req, res) -> {
			String rName = req.queryParams("rName");
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			restaurantDAO.deleteRestaurant(rName);
		
			return true;
		});
		
		get("/buyersWhoOrdered", (req, res)->{
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			String uName = req.queryParams("userName");
			ArrayList<Buyer> buyers = new ArrayList<Buyer>();
			for (Map.Entry<String, Buyer> entry : buyerDAO.getBuyersWhoOrdered(uName).entrySet()) {
				if(!entry.getValue().isDeleted())
					buyers.add( entry.getValue());
		        
		    }	
			return gsonReg.toJson(buyers);
			
		});
		
		get("/allComments",(req,res) -> {

			String rName =  req.queryParams("restaurantName");
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			ArrayList<Comment> commentList = new ArrayList<Comment>();
			for (Map.Entry<Integer, Comment> entry : commentDAO.getComments().entrySet()) {
				if(entry.getValue().getApproved() != CommentStatus.Rejected && entry.getValue().getApproved() != CommentStatus.Deleted) {
					commentList.add( entry.getValue());
				}
			}
			return gsonReg.toJson(commentList);
						
		});
		post("/changeQuantity",(req, res) -> {
			String idC = req.queryParams("id");
			String quantity = req.queryParams("quantity");

			boolean success;
			success = basketDAO.changeQuantity(idC,quantity);
			return success;
		});
		
	}
}
