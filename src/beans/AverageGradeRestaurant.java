package beans;

import java.util.ArrayList;

public class AverageGradeRestaurant {

	private String restaurantName;
	private double grade;

	public AverageGradeRestaurant() {
		// TODO Auto-generated constructor stub
		
		}

	public String getRestaurantName() {
		return restaurantName;
	}

	public void setRestaurantName(String restaurantName) {
		this.restaurantName = restaurantName;
	}

	public double getGrade() {
		return grade;
	}

	public AverageGradeRestaurant(String restaurantName, double grade) {
		super();
		this.restaurantName = restaurantName;
		this.grade = grade;
	}

	public void setGrade(double grade) {
		this.grade = grade;
	}
	

}
