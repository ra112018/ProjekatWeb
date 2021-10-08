package beans;

public class Comment {

	private int idComment;
	private String customerOfOrder;     //ovde treba kupac porudzbine 
	private Restaurant restaurant;
	private String text;
	private int mark; //ovde treba od 1 do 5
	private boolean approved;
	
	public Comment() {}

	public String getCustomerOfOrder() {
		return customerOfOrder;
	}

	public void setCustomerOfOrder(String customerOfOrder) {
		this.customerOfOrder = customerOfOrder;
	}

	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public int getMark() {
		return mark;
	}

	public void setMark(int mark) {
		this.mark = mark;
	}

	public boolean isApproved() {
		return approved;
	}

	public void setApproved(boolean approved) {
		this.approved = approved;
	}

	public int getIdComment() {
		return idComment;
	}

	public void setIdComment(int idComment) {
		this.idComment = idComment;
	}
}
