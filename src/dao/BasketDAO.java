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
import beans.Buyer;
import beans.Manager;
import beans.Restaurant;

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

	public boolean addArticle(Basket r) {
		// TODO Auto-generated method stub
		int i=0;		//if buyer has something in Basket i!=0
		ArticleDAO ad=new ArticleDAO();
		ArrayList<Article> alist=new ArrayList<Article>();
		Article article=ad.findArticleByName(r.getArticleName());
		alist.add(article);
 		r.setBasketArticles(alist);
		System.out.println(r.getBasketArticles());
		double s=ad.findPriceByName(r.getArticleName());
		r.setBasketPrice(s);
		for (Map.Entry<String, Basket> entry : baskets.entrySet()) {
			
	        if(entry.getValue().getUserName().equals(r.getUserName()) ) {
	        	if(entry.getValue().getBasketArticles()!=null ) {
	        	ArrayList<Article> a=entry.getValue().getBasketArticles();
	        	a.addAll(r.getBasketArticles());
	        	entry.getValue().setBasketArticles(a);
	        	}
	        	else {
	        		ArrayList<Article> a=new ArrayList<Article>();
		        	a.add(ad.findArticleByName(r.getArticleName()));
		        	entry.getValue().setBasketArticles(a);
	        	}
	        	double totalPrice=entry.getValue().getBasketPrice();
	        	totalPrice += r.getBasketPrice();
	        	entry.getValue().setBasketPrice(totalPrice);
	        	i=1;
	        }
	    }
		if(i==0) {
			baskets.put(r.getUserName(),r);

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

	public Basket findBasketByUsername(String rName) {
		// TODO Auto-generated method stub
		BasketDAO m=new BasketDAO();
		for (Map.Entry<String, Basket> entry : baskets.entrySet()) {

	        if(entry.getValue().getUserName().equals(rName) ) {
	        	return entry.getValue();
	        }
	    }
		return null;
	}

}
