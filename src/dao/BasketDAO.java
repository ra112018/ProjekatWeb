package dao;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.HashMap;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Article;
import beans.Basket;

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

	public Basket addArticle(Basket r) {
		// TODO Auto-generated method stub
		baskets.put(r.getUser().getUserName(),r);
		try {
			this.addBasketInFile();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return r;
	}

	public static void addBasketInFile() throws IOException{
		Gson gson = new Gson();
		FileWriter fw = new FileWriter("static/json/baskets.json");
		gson.toJson(BasketDAO.baskets, fw);
		fw.flush();
		fw.close();
	}

}
