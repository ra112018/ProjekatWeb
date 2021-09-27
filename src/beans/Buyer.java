package beans;

import java.util.ArrayList;

public class Buyer extends User {


	private ArrayList<Order> customerOrders;	//sve porudzbine za kupca
	private Basket basket;  //za kupca
	private double customerPoints; //za kupca
	//private UserType customerType;
	private String buyerType;

	public Buyer() {
		// TODO Auto-generated constructor stub
	}

	public ArrayList<Order> getCustomerOrders() {
		return customerOrders;
	}

	public void setCustomerOrders(ArrayList<Order> customerOrders) {
		this.customerOrders = customerOrders;
	}

	public Basket getBasket() {
		return basket;
	}

	public void setBasket(Basket basket) {
		this.basket = basket;
	}

	public double getCustomerPoints() {
		return customerPoints;
	}

	public void setCustomerPoints(double d) {
		this.customerPoints = d;
	}

	public String getBuyerType() {
		return buyerType;
	}

	public void setBuyerType(String buyerType) {
		this.buyerType = buyerType;
	}

	/*public UserType getCustomerType() {
		return customerType;
	}

	public void setCustomerType(UserType customerType) {
		this.customerType = customerType;
	}*/
	
	


}
