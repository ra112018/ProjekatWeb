package rest;


import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

import java.io.File;
import java.util.ArrayList;

import com.google.gson.Gson;

import dao.BuyerDao;
import spark.Request;
import spark.Service.StaticFiles;
import spark.Session;
import spark.Spark;


public class ProjekatMain {
	private static BuyerDao buyer=new BuyerDao();
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
            System.out.println("Nece");
            String name  = req.queryParams("userName");
            String pass = req.queryParams("password");
            System.out.println("Ne otvara");
			String korisnicko = " ";

            ArrayList<String> response = new ArrayList<String>();
            if(buyer.findBuyer(name, pass) != null) {
				korisnicko = name;

                response.add(korisnicko);
				response.add("kupac");

            }
            response.add(korisnicko);
            return g.toJson(response);
        });
		
		
		
		
		
	}

}
