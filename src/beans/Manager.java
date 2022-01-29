package beans;

public class Manager extends User {
	
	private String restaurant; //za menadzera
	private boolean blocked;
	
	public Manager() {}
	public String getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(String restaurant) {
		this.restaurant = restaurant;
	}
	
	public boolean isBlocked() {
		return blocked;
	}
	
	public void setBlocked(boolean blocked) {
		this.blocked = blocked;
	}
}
