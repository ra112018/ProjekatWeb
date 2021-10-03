package dao;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Article;
import beans.Basket;
import beans.Deliverer;
import beans.Request;
import beans.Restaurant;
import beans.RestaurantStatus;

public class RequestDAO {

	private static HashMap<Integer,Request> requests; //idRequest is key value

	public RequestDAO() {
		// TODO Auto-generated constructor stub
		requests = new HashMap<Integer,Request>();
        try {
            readRequests();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
	}

	public static HashMap<Integer, Request> getRequests() {
		return requests;
	}

	public static void setRequests(HashMap<Integer, Request> requests) {
		RequestDAO.requests = requests;
	}
	private void readRequests() throws FileNotFoundException{
        Gson gson = new Gson();
        Type token = new TypeToken<HashMap<Integer,Request>>(){}.getType();
        BufferedReader br = new BufferedReader(new FileReader("static/json/requests.json"));
        RequestDAO.requests = gson.fromJson(br, token);
        System.out.println(RequestDAO.requests);

    }
	public static void addRequestInFile() throws IOException{
		Gson gson = new Gson();
		FileWriter fw = new FileWriter("static/json/requests.json");
		gson.toJson(RequestDAO.requests, fw);
		fw.flush();
		fw.close();
	}
	public static boolean addRequest(Request request) {
		int i=0;
		if(requests!=null) {
			for(Map.Entry<Integer, Request> entry : requests.entrySet()) {
				i+=1;
			}
		}
		i+=1;
        request.setIdRequest(i);
        try {
        		requests.put(request.getIdRequest(),request);
    			addRequestInFile();
    		} catch (IOException e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		}
		
		return true;
	}

}
