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
	


	public static void main(String[] args) throws Exception {
		// TODO Auto-generated method stub
		port(8080);
		
		String sr;
		staticFiles.externalLocation(sr=new File("./static").getCanonicalPath()); 
		System.out.println(sr);
		
		get("/test", (req, res) -> {
			return "Works";
		});
		
		post("/login", (req, res)-> {
            String name  = req.queryParams("username");
            String pass = req.queryParams("password");
            BuyerDao buyer=new BuyerDao();
            Gson g=new Gson();
            String userN = " ";
            ArrayList<String> response = new ArrayList<String>();
            if(buyer.findBuyer(name, pass) != null) {
                    userN = name;
                    response.add(userN);
                    response.add("buyer");
            }
            response.add(userN);
            return g.toJson(response);
        });
		
		
		
	}

}
