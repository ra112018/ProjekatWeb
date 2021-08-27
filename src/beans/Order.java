package beans;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;

public class Order {
	
	private String idOrder;
	private ArrayList<Article> articles;
	private Restaurant restaurant;
	private String timeOfOrder; 
	private double price;
	private User user; //samo ime i prezime treba  // misli se samo na kupca
	private OrderStatus orderStatus;
	
	public Order() {}

}
