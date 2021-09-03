package beans;

public class UserType {

	private UserTypeName userTypeName;
	private double percentage;
	private int pointsNeeded;
	
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

	public int getPointsNeeded() {
		return pointsNeeded;
	}

	public UserType(UserTypeName userTypeName, double percentage, int pointsNeeded) {
		super();
		this.userTypeName = userTypeName;
		this.percentage = percentage;
		this.pointsNeeded = pointsNeeded;
	}

	public void setPointsNeeded(int pointsNeeded) {
		this.pointsNeeded = pointsNeeded;
	}

}
