package beans;

public class Manager extends User {
	
	private Restaurant restaurant; //za menadzera
	private boolean blocked;
	
	public Manager() {}
	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}
	
	public boolean isBlocked() {
		return blocked;
	}
	
	public void setBlocked(boolean blocked) {
		this.blocked = blocked;
	}
}
