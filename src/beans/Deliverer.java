package beans;

import java.util.ArrayList;

public class Deliverer extends User{

	private ArrayList<Order> deliveryOrders; //za dostavljaca
	private boolean blocked;

	public Deliverer() {}
	public ArrayList<Order> getDeliveryOrders() {
		return deliveryOrders;
	}

	public void setDeliveryOrders(ArrayList<Order> deliveryOrders) {
		this.deliveryOrders = deliveryOrders;
	}
	
	public boolean isBlocked() {
		return blocked;
	}
	
	public void setBlocked(boolean blocked) {
		this.blocked = blocked;
	}
}
