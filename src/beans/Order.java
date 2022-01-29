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
	private String buyerNameSurname; //samo ime i prezime treba  // misli se samo na kupca
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

	public String getRestaurantName() {
		return restaurantName;
	}

	public void setRestaurantName(String restaurant) {
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


	public String getBuyer() {
		return buyerNameSurname;
	}

	public void setBuyer(String buyer) {
		this.buyerNameSurname = buyer;
	}

	public OrderStatus getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(OrderStatus orderStatus) {
		this.orderStatus = orderStatus;
	}

}
