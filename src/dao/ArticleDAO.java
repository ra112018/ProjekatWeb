package dao;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Article;
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
        System.out.println(ArticleDAO.articles);

    }

	public Article addArticle(Article r) {
		// TODO Auto-generated method stub
		articles.put(r.getArticleName(),r);
		try {
			this.addArticleInFile();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return r;
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
	        if(entry.getValue().getRestaurantName().equals(rName) ) {
	        	m.put(entry.getValue().getRestaurantName(),entry.getValue());
	        }
	    }
		
		return m;
	}

}
