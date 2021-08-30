package rest;


import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

import java.io.File;
import java.util.ArrayList;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Administrator;
import beans.Buyer;
import beans.Deliverer;
import beans.Manager;
import beans.Restaurant;
import beans.User;
import dao.AdministratorDAO;
import dao.BuyerDao;
import dao.DelivererDAO;
import dao.ManagerDAO;
import dao.RestaurantDao;
import spark.Request;
import spark.Service.StaticFiles;
import spark.Session;
import spark.Spark;


public class ProjekatMain {
	private static BuyerDao buyerDAO=new BuyerDao();
	private static AdministratorDAO adminDAO=new AdministratorDAO();
	private static ManagerDAO managerDAO = new ManagerDAO();
	private static DelivererDAO delivererDAO = new DelivererDAO();
	private static RestaurantDao restaurant=new RestaurantDao();


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
			buyerDAO.addBuyer(buyerReg);
			return true;
			
		});
		get("/account", (req, res)-> {
			String uName =  req.queryParams("userName");
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			User us;
			us = BuyerDao.findBuyerByUsername(uName);
			if(us != null) {
				return gsonReg.toJson(us);
			}
			else {
				us=AdministratorDAO.findAdminByUsername(uName);
				if(us!=null) {
					return gsonReg.toJson(us);}
				
					else {
						us=ManagerDAO.findManagerByUsername(uName);
						if(us!=null) {
							return gsonReg.toJson(us);
						}
						else {
							us=DelivererDAO.findDelivererByUsername(uName);
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
			us = BuyerDao.findBuyerByUsername(uName);
			if(us != null) {
				System.out.println(us.getName());

				Buyer Gbuyer = gsonReg.fromJson(reqBody, Buyer.class);	//Ovde nesto ne cita kako treba
				System.out.println(Gbuyer.getName());
				BuyerDao.updateBuyer(uName,Gbuyer);
			}/*
			else {
				us = AdministratorDAO.findAdminByUsername(uName);
				if(us != null) {
					Administrator Gadmin = gsonReg.fromJson(reqBody, Administrator.class);
					adminDAO.updateAdmin(uName, Gadmin);
				}else {
					us = managerDAO.findManagerByUsername(uName);
					if(us != null) {
						Manager Gmanager = gsonReg.fromJson(reqBody, Manager.class);
						managerDAO.updateManager(uName, Gmanager);
					}else {
						us = DelivererDAO.findDelivererByUsername(uName);
						if(us != null) {
							Deliverer Gdeliverer = gsonReg.fromJson(reqBody, Deliverer.class);
							delivererDAO.updateDeliverer(uName, Gdeliverer);
						}
					}
					
				}
			}*/
			return true;
			
		});
		
		get("/restaurantDetails", (req, res)-> {
			String rName =  req.queryParams("restaurant");
			Restaurant r;
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			r = restaurant.findRestaurantByName(rName);
			System.out.println(gsonReg.toJson(r));
			if(r != null) {
				return gsonReg.toJson(r);
			}
			return gsonReg.toJson(r);
		
		});
		
		
		get("/admins", (req, res)->{
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			
			ArrayList<Administrator> admins = new ArrayList<Administrator>();
			for (Map.Entry<String, Administrator> entry : adminDAO.getAdmins().entrySet()) {
				
					admins.add( entry.getValue());
		        
		    }	
			return gsonReg.toJson(admins);
			
		});
		
		get("/managers", (req, res)->{
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			
			ArrayList<Manager> managers = new ArrayList<Manager>();
			for (Map.Entry<String, Manager> entry : managerDAO.getManagers().entrySet()) {
				
					managers.add( entry.getValue());
		        
		    }	
			return gsonReg.toJson(managers);
			
		});
		
		get("/deliverers", (req, res)->{
			Gson gsonReg = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			
			ArrayList<Deliverer> deliverers = new ArrayList<Deliverer>();
			for (Map.Entry<String, Deliverer> entry : delivererDAO.getDeliverers().entrySet()) {
				
					deliverers.add( entry.getValue());
		        
		    }	
			return gsonReg.toJson(deliverers);
			
		});
		
		
	}

}
