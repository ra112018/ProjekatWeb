package beans;

public class Comment {

	private int idComment;
	private String customerOfOrder;     //ovde treba kupac porudzbine 
	private String restaurant;
	private String text;
	private int mark; //ovde treba od 1 do 5
	private CommentStatus approved;
	
	public Comment() {}

	public String getCustomerOfOrder() {
		return customerOfOrder;
	}

	public void setCustomerOfOrder(String customerOfOrder) {
		this.customerOfOrder = customerOfOrder;
	}

	public String getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(String restaurant) {
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

	public CommentStatus getApproved() {
		return approved;
	}

	public void setApproved(CommentStatus approved) {
		this.approved = approved;
	}

	public int getIdComment() {
		return idComment;
	}

	public void setIdComment(int idComment) {
		this.idComment = idComment;
	}
}
