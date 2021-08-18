package beans;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;

public class User {

	private String userName;
	private String password;
	private String name;
	private String surname;
	private Gender gender;
	private LocalDate birthDate;	
	private Role role;
	private ArrayList<String> customerOrders;	//sve porudzbine za kupca
	private Basket basket;  //za kupca
	private Restaurant restaurant; //za menadzera
	private ArrayList<String> deliveryOrders; //za dostavljaca
	private int customerPoints; //za kupca
	private UserType userType;
	
	public User() {}
}
