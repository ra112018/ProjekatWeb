package dao;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import javax.imageio.ImageIO;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Article;
import beans.Buyer;
import beans.Manager;
import beans.Order;
import beans.Restaurant;
import beans.RestaurantStatus;
import beans.UserType;

public class RestaurantDAO {

	private static HashMap<String,Restaurant> restaurants;

	public RestaurantDAO() {
		// TODO Auto-generated constructor stub
		 restaurants = new HashMap<String,Restaurant>();
	        try {
	            readRestaurants();
	        } catch (FileNotFoundException e) {
	            e.printStackTrace();
	        }
	}

   

    private void readRestaurants() throws FileNotFoundException{
        Gson gson = new Gson();
        Type token = new TypeToken<HashMap<String,Restaurant>>(){}.getType();
        BufferedReader br = new BufferedReader(new FileReader("static/json/restaurants.json"));
        RestaurantDAO.restaurants = gson.fromJson(br, token);

    }
	

	public Restaurant addRestaurant(Restaurant restaurant) {
		restaurants.put(restaurant.getRestaurantName(),restaurant);
		if(restaurant.getLogo()!=null) {
		String logoName=getNiceImageFormat(restaurant.getLogo(),restaurant.getRestaurantName());

        restaurant.setLogo("../img/" + logoName);
		}
        boolean exist=checkManager(restaurant.getManagerName());
        boolean alreadyHasRestaurant=checkIfManagerHasRestaurant(restaurant.getManagerName());
        if(exist==true) {
        	restaurant.setArticles(new ArrayList<Article>());
        	restaurant.setStatus(RestaurantStatus.Open);
        	if(alreadyHasRestaurant==false) {
        	try {
    			this.addRestaurantInFile();
    		} catch (IOException e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		}
        	}
        	else {

            	restaurant=new Restaurant();
            	restaurant.setManagerName("zauzet");
        	}
        }
        else{
        	restaurant=new Restaurant();
        	restaurant.setManagerName("nepostojeci");
        	}
        	
		
		return restaurant;
	}
	public static void addRestaurantInFile() throws IOException{
		Gson gson = new Gson();
		FileWriter fw = new FileWriter("static/json/restaurants.json");
		gson.toJson(RestaurantDAO.restaurants, fw);
		fw.flush();
		fw.close();
	}
	public Restaurant findRestaurantByName(String name) {
		for (Map.Entry<String, Restaurant> entry : restaurants.entrySet()) {

	        if(entry.getValue().getRestaurantName().equals(name) ) {
	        	return entry.getValue();
	        }
	    }
		return null;
	}
	public static void updateRestaurant(String name, Restaurant restaurant) {
		for (Map.Entry<String, Restaurant> entry : restaurants.entrySet()) {
	        if(entry.getValue().getRestaurantName().equals(name) ) {
	        	entry.getValue().setArticles(restaurant.getArticles());
	        }
	    }
		try {
			addRestaurantInFile();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public String findNextId() {
		String maxValueKey = Collections.max(this.restaurants.keySet());
		return Integer.toString(Integer.valueOf(maxValueKey) + 1);
	}
	public String getNiceImageFormat(String image,String name) {

		String imageString = image.split(",")[1];
		BufferedImage bimage = null;	
        byte[] imageByte;
        imageByte = Base64.getDecoder().decode(imageString);
        ByteArrayInputStream bis = new ByteArrayInputStream(imageByte);
        try {
			bimage = ImageIO.read(bis);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        try {
			bis.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String imageName= "restoran"  +name+ ".png";
		File outputfile = new File(System.getProperty("user.dir")+ "\\static\\img\\" + imageName);
        try {
			ImageIO.write(bimage, "png", outputfile);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        return imageName;
	}
	public static HashMap<String, Restaurant> getRestaurants() {
		return restaurants;
	}



	public static void setRestaurants(HashMap<String, Restaurant> restaurants) {
		RestaurantDAO.restaurants = restaurants;
	}

	private boolean checkIfManagerHasRestaurant(String managerName) {
		// TODO Auto-generated method stub
		for (Map.Entry<String, Restaurant> entry : restaurants.entrySet()) {

	        if(entry.getValue().getManagerName().equals(managerName) ) {
	        	System.out.println(managerName);
	        	return true;
	        }
	    }
		return false;
	}

	public boolean checkManager(String name) {
		boolean MngExist;
		ManagerDAO m=new ManagerDAO();
		MngExist=m.ManagerExist(name);
		return MngExist;
		}
	
	public Restaurant findRestaurantByManager(String usname) {
		ManagerDAO m=new ManagerDAO();
		Manager man=m.findManagerByUsername(usname);
		for (Map.Entry<String, Restaurant> entry : restaurants.entrySet()) {

	        if(entry.getValue().getManagerName().equals((man.getName()+" "+man.getSurname())) ) {
	        	return entry.getValue();
	        }
	    }
		return null;
	}
	public static Restaurant findRestaurant(String name) {
		// TODO Auto-generated method stub
		 for (Map.Entry<String, Restaurant> entry : restaurants.entrySet()) {
	            if(entry.getValue().getRestaurantName().equals(name) ) {
	                return entry.getValue();
	            }
	        }
	        return null;
	}

}