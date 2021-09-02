package beans;

public class UserType {

	private UserTypeName userTypeName;
	private double percentage;
	private int points;
	
	public UserType() {
		
	}

	public UserTypeName getUserTypeName() {
		return userTypeName;
	}

	public void setUserTypeName(UserTypeName userTypeName) {
		this.userTypeName = userTypeName;
	}

	public double getPercentage() {
		return percentage;
	}

	public void setPercentage(double percentage) {
		this.percentage = percentage;
	}

	public int getPoints() {
		return points;
	}

	public void setPoints(int points) {
		this.points = points;
	}

}
