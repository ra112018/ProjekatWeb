package beans;

import java.util.ArrayList;

public class Buyer extends User {


	private ArrayList<Order> customerOrders;	//sve porudzbine za kupca
	private Basket basket;  //za kupca
	private int customerPoints; //za kupca

	public Buyer() {
		// TODO Auto-generated constructor stub
	}

	public String getUsername() {
		// TODO Auto-generated method stub
		return userName;
	}

	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	}


}
