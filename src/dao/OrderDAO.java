package dao;

import java.util.HashMap;

import beans.Order;


public class OrderDAO {

	private static HashMap<String,Order> orders; //idOrder is key value

	public OrderDAO() {
		// TODO Auto-generated constructor stub
	}

	public static HashMap<String, Order> getOrders() {
		return orders;
	}

	public static void setOrders(HashMap<String, Order> orders) {
		OrderDAO.orders = orders;
	}

}
