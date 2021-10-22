package dao;

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
import java.util.HashMap;
import java.util.Map;

import javax.imageio.ImageIO;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Article;
import beans.Buyer;
import beans.Manager;
import beans.Restaurant;
import beans.RestaurantStatus;

public class ArticleDAO {

	private static HashMap<String,Article> articles;

	public static HashMap<String, Article> getArticles() {
		return articles;
	}
	public static void setArticles(HashMap<String, Article> articles) {
		ArticleDAO.articles = articles;
	}
	public ArticleDAO() {
		// TODO Auto-generated constructor stub
		 articles = new HashMap<String,Article>();
	        try {
	            readArticles();
	        } catch (FileNotFoundException e) {
	            e.printStackTrace();
	        }
	}
	private void readArticles() throws FileNotFoundException{
        Gson gson = new Gson();
        Type token = new TypeToken<HashMap<String,Article>>(){}.getType();
        BufferedReader br = new BufferedReader(new FileReader("static/json/articles.json"));
        ArticleDAO.articles = gson.fromJson(br, token);

    }
	public double findPriceByName(String aName) {
		for (Map.Entry<String, Article> entry : articles.entrySet()) {
	        if(entry.getValue().getArticleName().equals(aName) ) {
	        	return entry.getValue().getPrice();
	        }
	    }
		return 0;
	}

	public boolean addArticle(Article r) {
		// TODO Auto-generated method stub
		boolean exist=false;
		for (Map.Entry<String, Article> entry : articles.entrySet()) {
	        if(entry.getValue().getArticleName().equals(r.getArticleName()) ) {
	        	exist=true;
	        }
	    }
		if(exist==false) {
		articles.put(r.getArticleName(),r);

		if(r.getArticlePhoto()!=null) {
		String logoName=getNiceImageFormat(r.getArticlePhoto(),r.getRestaurantName());
        r.setArticlePhoto("../img/" + logoName);
		}
		try {
			this.addArticleInFile();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		}
		return exist;
		}
	public static void addArticleInFile() throws IOException{
		Gson gson = new Gson();
		FileWriter fw = new FileWriter("static/json/articles.json");
		gson.toJson(ArticleDAO.articles, fw);
		fw.flush();
		fw.close();
	}
	public static HashMap<String, Article> getArticlesByRestaurant(String rName) {
		// TODO Auto-generated method stub
		HashMap<String,Article> m=new HashMap<String,Article>();
		for (Map.Entry<String, Article> entry : articles.entrySet()) {

	        if((entry.getValue().getRestaurantName()).equals(rName) ) {
	        	m.put((entry.getValue().getArticleName()),entry.getValue());

	        }
	    }
		return m;


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
		String imageName= "artikal"  +name+ ".png";
		File outputfile = new File(System.getProperty("user.dir")+ "\\static\\img\\" + imageName);
        try {
			ImageIO.write(bimage, "png", outputfile);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        return imageName;
	}
	public Article findArticleByName(String articleName) {
		// TODO Auto-generated method stub

		for (Map.Entry<String, Article> entry : articles.entrySet()) {
	        if(entry.getValue().getArticleName().equals(articleName) ) {
	        	return entry.getValue();
	        }
	    }
		return null;
	}
	public boolean editArticle(Article r) {
		// TODO Auto-generated method stub
		for (Map.Entry<String, Article> entry : articles.entrySet()) {
	        if(entry.getValue().getArticleName().equals(r.getArticleName()) ) {
	        	if(entry.getValue().getDescription().equals(r.getDescription()) && 
	        			entry.getValue().getQuantity().equals(r.getQuantity()) && entry.getValue().getPrice()==r.getPrice()) {
	        			return false;
	        		
	        	}
	        	else {
	        		entry.getValue().setDescription(r.getDescription());
	        		entry.getValue().setQuantity(r.getQuantity());
	        		entry.getValue().setPrice(r.getPrice());

	        	}
	        }
	    }
		return true;
	}

}
