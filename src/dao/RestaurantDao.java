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

import beans.Buyer;
import beans.Order;
import beans.Restaurant;
import beans.UserType;

public class RestaurantDao {

	private static HashMap<String,Restaurant> restaurants;

	public RestaurantDao() {
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
        RestaurantDao.restaurants = gson.fromJson(br, token);
        System.out.println(RestaurantDao.restaurants);

    }
	

	public Restaurant addRestaurant(Restaurant restaurant) {
		restaurants.put(restaurant.getRestaurantName(),restaurant);
		System.out.println(restaurant.getRestaurantType());
		System.out.println(restaurant.getLogo());
		String logoName=getNiceImageFormat(restaurant.getLogo());
		System.out.println(logoName);

        restaurant.setLogo("../img/" + logoName);


		try {
			this.addRestaurantInFile();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return restaurant;
	}
	public static void addRestaurantInFile() throws IOException{
		Gson gson = new Gson();
		FileWriter fw = new FileWriter("static/json/restaurants.json");
		gson.toJson(RestaurantDao.restaurants, fw);
		fw.flush();
		fw.close();
	}
	public Restaurant findRestaurantByName(String name) {
		for (Map.Entry<String, Restaurant> entry : restaurants.entrySet()) {
        	System.out.println(entry.getValue().getRestaurantName());

	        if(entry.getValue().getRestaurantName().equals(name) ) {
	        	System.out.println(name);
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
	public String getNiceImageFormat(String image) {

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

		String imageName= "restoran"  + ".png";

		File outputfile = new File(System.getProperty("user.dir")+ "\\static\\img\\" + imageName);
        try {
			ImageIO.write(bimage, "png", outputfile);

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        return imageName;
        
	}

}
