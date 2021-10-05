package beans;

import java.util.ArrayList;

public class Basket {


	private ArrayList<Article> basketArticles;
	private String newArticleName;
	private String userName;
	private double basketPrice;
	private boolean empty;
	public ArrayList<Article> getBasketArticles() {
		return basketArticles;
	}


	public String getNewArticleName() {
		return newArticleName;
	}


	public void setNewArticleName(String newArticleName) {
		this.newArticleName = newArticleName;
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


	public boolean isEmpty() {
		return empty;
	}


	public void setEmpty(boolean empty) {
		this.empty = empty;
	}

}
