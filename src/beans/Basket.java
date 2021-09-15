package beans;

import java.util.ArrayList;

public class Basket {

	private ArrayList<Article> basketArticles;
	private User user;
	private double basketPrice;
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public double getBasketPrice() {
		return basketPrice;
	}

	public void setBasketPrice(double basketPrice) {
		this.basketPrice = basketPrice;
	}

	public Basket() {}
}
