package rest;


import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

import java.io.File;


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
		
		

		get("/prijava", (req, res) -> {
			res.redirect("/prijava.html");
			return "Works";
		});
		
		
		
	}

}
