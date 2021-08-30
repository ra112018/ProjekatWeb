package rest;


import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

import java.io.File;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Buyer;
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
	private static BuyerDao buyer=new BuyerDao();
	private static AdministratorDAO admin=new AdministratorDAO();
	private static ManagerDAO manager = new ManagerDAO();
	private static DelivererDAO deliverer = new DelivererDAO();
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
            if(buyer.findBuyer(name, pass) != null) {
				korisnicko = name;
				
               response.add(korisnicko);
			   response.add("kupac");

            }
            else if(admin.findAdmin(name, pass)!=null) {
            	korisnicko=name;
            	response.add(korisnicko);
            	response.add("administrator");
            } else if(manager.findManager(name, pass)!=null) {
            	korisnicko=name;
            	response.add(korisnicko);
            	response.add("manager");
            }else if(deliverer.findDeliverer(name, pass)!=null) {
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
			buyer.addBuyer(buyerReg);
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
			}
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
		
		
		
		
		
	}

}
