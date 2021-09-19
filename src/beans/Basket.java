package beans;

import java.util.ArrayList;

public class Basket {


	private ArrayList<Article> basketArticles;
	private String articleName;
	private String userName;
	private double basketPrice;
	
	public ArrayList<Article> getBasketArticles() {
		return basketArticles;
	}

	public String getArticleName() {
		return articleName;
	}

	public void setArticleName(String articleName) {
		this.articleName = articleName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public void setBasketArticles(ArrayList<Article> basketArticles) {
		this.basketArticles = basketArticles;
	}


	public double getBasketPrice() {
		return basketPrice;
	}

	public void setBasketPrice(double basketPrice) {
		this.basketPrice = basketPrice;
	}

	public Basket() {}

}
