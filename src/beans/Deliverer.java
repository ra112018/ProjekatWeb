package beans;

import java.util.ArrayList;

public class Deliverer extends User{

	private ArrayList<Order> deliveryOrders; //za dostavljaca

	public Deliverer() {}
	public ArrayList<Order> getDeliveryOrders() {
		return deliveryOrders;
	}

	public void setDeliveryOrders(ArrayList<Order> deliveryOrders) {
		this.deliveryOrders = deliveryOrders;
	}
}
