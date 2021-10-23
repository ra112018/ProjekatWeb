package beans;

import java.util.Date;

public class CanceledOrders {
	
	private int id;
	private Date date;
	private String userName;
	
	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public Date getDate() {
		return date;
	}


	public void setDate(Date date) {
		this.date = date;
	}


	public String getUserName() {
		return userName;
	}


	public void setUserName(String userName) {
		this.userName = userName;
	}


	public CanceledOrders() {}

}
