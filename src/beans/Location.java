package beans;

public class Location {

	private double longitude; //duzina
	private double latitude; //sirina
	private String locationAddress;
	private int id;

	public Location() {}

	public Location(double longitude, double latitude, String locationAddress) {
		super();
		this.longitude = longitude;
		this.latitude = latitude;
		this.locationAddress = locationAddress;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public String getLocationAddress() {
		return locationAddress;
	}

	public void setLocationAddress(String locationAddress) {
		this.locationAddress = locationAddress;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
}

