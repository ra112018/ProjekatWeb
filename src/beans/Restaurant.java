package beans;

import java.util.ArrayList;

public class Restaurant {

	private String restaurantName;
	private RestaurantType restaurantType;
	private ArrayList<Article> articles;
	private RestaurantStatus status;
	private Location location;
	private String logo;

	public Restaurant() {}

	public Restaurant(String restaurantName, RestaurantType restaurantType, ArrayList<Article> articles,
			RestaurantStatus status, Location location, String logo) {
		super();
		this.restaurantName = restaurantName;
		this.restaurantType = restaurantType;
		this.articles = articles;
		this.status = status;
		this.location = location;
		this.logo = logo;
	}

	public String getRestaurantName() {
		return restaurantName;
	}

	public void setRestaurantName(String restaurantName) {
		this.restaurantName = restaurantName;
	}

	public RestaurantType getRestaurantType() {
		return restaurantType;
	}

	public void setRestaurantType(RestaurantType restaurantType) {
		this.restaurantType = restaurantType;
	}

	public ArrayList<Article> getArticles() {
		return articles;
	}

	public void setArticles(ArrayList<Article> articles) {
		this.articles = articles;
	}

	public RestaurantStatus getStatus() {
		return status;
	}

	public void setStatus(RestaurantStatus status) {
		this.status = status;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}
}
