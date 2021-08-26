package beans;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;

public class User {

	public String userName;
	public String password;
	private String name;
	private String surname;
	private Gender gender;
	private LocalDate birthDate;	
	private Role role;
	private Restaurant restaurant; //za menadzera
	private ArrayList<Order> deliveryOrders; //za dostavljaca
	private UserType userType;
	
	public User() {}
}
