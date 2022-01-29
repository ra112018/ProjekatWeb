package beans;

import java.util.ArrayList;

public class Deliverer extends User{

	private ArrayList<String> deliveryOrders; //za dostavljaca
	private boolean blocked;

	public Deliverer() {}
	public ArrayList<String> getDeliveryOrders() {
		return deliveryOrders;
	}

	public void setDeliveryOrders(ArrayList<String> deliveryOrders) {
		this.deliveryOrders = deliveryOrders;
	}
	
	public boolean isBlocked() {
		return blocked;
	}
	
	public void setBlocked(boolean blocked) {
		this.blocked = blocked;
	}
}
