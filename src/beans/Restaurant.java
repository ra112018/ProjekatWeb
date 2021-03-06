package beans;

import java.util.ArrayList;

public class Restaurant {

	private String restaurantName;
	private RestaurantType restaurantType;
	private ArrayList<String> articles;
	private RestaurantStatus status;
	private int locationId;
	private String logo;
	private String managerName;
	private Boolean deleted;

	public Restaurant() {}

	public Restaurant(String restaurantName, RestaurantType restaurantType, ArrayList<String> articles,
			RestaurantStatus status, int locationId, String logo) {
		super();
		this.restaurantName = restaurantName;
		this.restaurantType = restaurantType;
		this.articles = articles;
		this.status = status;
		this.locationId = locationId;
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

	public ArrayList<String> getArticles() {
		return articles;
	}

	public void setArticles(ArrayList<String> articles) {
		this.articles = articles;
	}

	public RestaurantStatus getStatus() {
		return status;
	}

	public void setStatus(RestaurantStatus status) {
		this.status = status;
	}

	public int getLocationId() {
		return locationId;
	}

	public void setLocationId(int location) {
		this.locationId = location;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public String getManagerName() {
		return managerName;
	}

	public void setManagerName(String managerName) {
		this.managerName = managerName;
	}

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}


}
