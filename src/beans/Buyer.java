package beans;

import java.util.ArrayList;

public class Buyer extends User {


	private ArrayList<Order> customerOrders;	//sve porudzbine za kupca
	private Basket basket;  //za kupca
	private int customerPoints; //za kupca
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

	public int getCustomerPoints() {
		return customerPoints;
	}

	public void setCustomerPoints(int customerPoints) {
		this.customerPoints = customerPoints;
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
