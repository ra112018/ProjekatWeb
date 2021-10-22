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
import beans.Basket;
import beans.BasketArticle;
import beans.Buyer;
import beans.Manager;
import beans.Restaurant;
import beans.User;

public class BasketDAO {

	private static HashMap<String,Basket> baskets; //username is key value

	public static HashMap<String, Basket> getBasket() {
		return baskets;
	}

	public static void setBasket(HashMap<String, Basket> basket) {
		BasketDAO.baskets = basket;
	}


	public BasketDAO() {
		// TODO Auto-generated constructor stub
		baskets = new HashMap<String,Basket>();
        try {
            readBaskets();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
	}

	private void readBaskets() throws FileNotFoundException{
        Gson gson = new Gson();
        Type token = new TypeToken<HashMap<String,Basket>>(){}.getType();
        BufferedReader br = new BufferedReader(new FileReader("static/json/baskets.json"));
        BasketDAO.baskets = gson.fromJson(br, token);
        System.out.println(BasketDAO.baskets);

    }
	
	public boolean addArticle(String username,String articleName) {			//buyer adds one article
		// TODO Auto-generated method stub
		int i=0;		//if buyer has something in Basket i!=0
		boolean buyerHasThatArticle=false;
		ArticleDAO ad=new ArticleDAO();
		Article article=ad.findArticleByName(articleName);				
		BasketArticle ba=new BasketArticle(article);
		for (Map.Entry<String, Basket> entry : baskets.entrySet()) {
			
	        if(entry.getValue().getUserName().equals(username) && entry.getValue().isEmpty()!=true ) {
	        		for (BasketArticle b : entry.getValue().getBasketArticles()) {
	        			if( b.getArticleName().equals( articleName)) {						//in buyer basket already exists same article

	        				buyerHasThatArticle=true;
	        				ba.setNumberOfArticles(b.getNumberOfArticles()+1);
	        				b.setNumberOfArticles(b.getNumberOfArticles()+1);
	        			}				
	        		}
	        		if(buyerHasThatArticle==false) {		//basket has articles but not the one buyer wants to add
	        			ba.setNumberOfArticles(1);
        				ArrayList<BasketArticle> a=entry.getValue().getBasketArticles();
        				a.add(ba);
        				entry.getValue().setBasketArticles(a);
	        		}
	        		double totalPrice=entry.getValue().getBasketPrice();
		        	totalPrice += ba.getPrice();
		        	entry.getValue().setBasketPrice(totalPrice);
		        	entry.getValue().setEmpty(false);
		        	i=1;
	        		
	        	}
	        	
	        }
		
		
		if(i==0) {
			ArrayList<BasketArticle> alist=new ArrayList<BasketArticle>();
			Basket basket=new Basket();
			alist.add(ba);
	 		basket.setBasketArticles(alist);
			double s=ad.findPriceByName(articleName);
			basket.setBasketPrice(s);
			basket.setUserName(username);
			basket.setEmpty(false);
			baskets.put(username,basket);

			try {
				this.addBasketInFile();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		else {
			
		try {

			this.addBasketInFile();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		}
		return true;
	}

	public static void addBasketInFile() throws IOException{
		Gson gson = new Gson();
		FileWriter fw = new FileWriter("static/json/baskets.json");
		gson.toJson(BasketDAO.baskets, fw);
		fw.flush();
		fw.close();
	}

	public static Basket findBasketByUsername(String rName) {
		// TODO Auto-generated method stub
		BasketDAO m=new BasketDAO();
		Basket b=new Basket();
		for (Map.Entry<String, Basket> entry : baskets.entrySet()) {

	        if(entry.getValue().getUserName().equals(rName) ) {
	        	b= entry.getValue();
	        }
	    }
		ArrayList<BasketArticle> al=new ArrayList<BasketArticle>();
		if(b.getBasketArticles()!=null) {
		for (BasketArticle  entry : b.getBasketArticles()) {
					if( !entry.getDeleted())
						al.add( entry);
		}
		}
		b.setBasketArticles(al);
		if(b.isEmpty()!=true) {
		return b;
		}
		else {
			return null;
		}
	}

	public void deleteArticle(String userName, String articleName) {
		// TODO Auto-generated method stub
		for (Map.Entry<String, Basket> entry : baskets.entrySet()) {
	        if(entry.getValue().getUserName().equals(userName) ) {
	        	for(Article a : entry.getValue().getBasketArticles()) {

	        		if(a.getArticleName().equals(articleName)) {
	        			System.out.println("Brisanje3");
	        			a.setDeleted(true);
	        			System.out.println(a.getDeleted());
	        			double totalPrice=entry.getValue().getBasketPrice();
	        			totalPrice = totalPrice-a.getPrice();
	        			entry.getValue().setBasketPrice(totalPrice);
	        		}
     
	        	}
	        }
	    }
		try {
			addBasketInFile();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void emptyBasketByUsername(String uName) {
		// TODO Auto-generated method stub
		for (Map.Entry<String, Basket> entry : baskets.entrySet()) {
	        if(entry.getValue().getUserName().equals(uName) ) {
	        			entry.getValue().setEmpty(true);
	        }
	    }
		try {
			addBasketInFile();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

}
