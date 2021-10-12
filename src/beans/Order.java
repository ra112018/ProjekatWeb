package beans;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;

public class Order {
	
	private String idOrder;
	private ArrayList<BasketArticle> articles;
	private String restaurantName;
	private String timeOfOrder; 
	private double price;
	private Buyer buyer; //samo ime i prezime treba  // misli se samo na kupca
	private OrderStatus orderStatus;
	
	public Order() {}

	public String getIdOrder() {
		return idOrder;
	}

	public void setIdOrder(String idOrder) {
		this.idOrder = idOrder;
	}

	public ArrayList<BasketArticle> getArticles() {
		return articles;
	}

	public void setArticles(ArrayList<BasketArticle> articles) {
		this.articles = articles;
	}

	public String getRestaurant() {
		return restaurantName;
	}

	public void setRestaurant(String restaurant) {
		this.restaurantName = restaurant;
	}

	public String getTimeOfOrder() {
		return timeOfOrder;
	}

	public void setTimeOfOrder(String timeOfOrder) {
		this.timeOfOrder = timeOfOrder;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}


	public Buyer getBuyer() {
		return buyer;
	}

	public void setBuyer(Buyer buyer) {
		this.buyer = buyer;
	}

	public OrderStatus getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(OrderStatus orderStatus) {
		this.orderStatus = orderStatus;
	}

}
