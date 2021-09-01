package dao;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Location;

public class LocationDAO {

		// TODO Auto-generated constructor stub
		private HashMap<Integer,Location> locations;
		
		public LocationDAO() {
			locations = new HashMap<Integer,Location>();
			
			try {
				ucitajLokacije();
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		public HashMap<Integer,Location> getLocations() {
			return locations;
		}

		public void setLokacije(HashMap<Integer,Location> locations) {
			this.locations = locations;
		}
		
		public Location locationRestaurant(int id) {
			for(Location l : locations.values()) 
			{
				if(l.getId() == id) {
					return l;
				}
			}
			
			return null;
		}
		public Location findLocation(String address) {
			for (Map.Entry<Integer, Location> entry : locations.entrySet()) {
		        if(entry.getValue().getLocationAddress().equals(address)){
		        	return entry.getValue();
		        }
		    }	
			return null;
		}
		
		public void addToLocations() throws IOException{
			Gson gson = new Gson();
			FileWriter fw = new FileWriter("static/json/locations.json");
			gson.toJson(this.locations, fw);
			fw.flush();
			fw.close();
		}
		
		public void ucitajLokacije() throws FileNotFoundException {
			
			Gson gson = new Gson();
			Type token = new TypeToken<HashMap<Integer,Location>>(){}.getType();
			BufferedReader br = new BufferedReader(new FileReader("static/json/locations.json"));
			this.locations = gson.fromJson(br, token);
			
		}

		public boolean checkLocation(Location location, int id) {
			for(Location l : this.locations.values()) {
				if(l.getId() != id) {
					if(l.getLongitude() == location.getLatitude() && location.getLongitude() == l.getLatitude()
							|| (l.getLocationAddress().equals(location.getLocationAddress()) )) {
						return false;
					}
				}
			}
			return true;
		}
		public int findNextId() {
			int maxValueKey = Collections.max(this.locations.keySet());
			return maxValueKey + 1;
		}

		
	}

