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
import beans.Buyer;
import beans.Comment;
import beans.CommentStatus;
import beans.Order;
import beans.OrderStatus;
import beans.Request;
import beans.Restaurant;
import beans.UserType;
import beans.UserTypeName;

public class CommentDAO {
	
	private static HashMap<Integer,Comment> comments;


	public HashMap<Integer, Comment> getComments() {
		return comments;
	}


	public void setComments(HashMap<Integer, Comment> comments) {
		this.comments = comments;
	}


	public CommentDAO() {
		// TODO Auto-generated constructor stub
		comments = new HashMap<Integer,Comment>();
        try {
            readComments();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
	}
	private void readComments() throws FileNotFoundException{
        Gson gson = new Gson();
        Type token = new TypeToken<HashMap<Integer,Comment>>(){}.getType();
        BufferedReader br = new BufferedReader(new FileReader("static/json/comments.json"));
        this.comments = gson.fromJson(br, token);
       
    }


	public boolean addComment(Comment comment) {
		// TODO Auto-generated method stub
		comment.setApproved(CommentStatus.WaitingForApproval);
		int i=0;
		if(comments!=null) {
			for(Map.Entry<Integer, Comment> entry : comments.entrySet()) {
				i+=1;
			}
		}
		i+=1;
        comment.setIdComment(i);
		comments.put(comment.getIdComment(),comment);
        try {
    			addCommentInFile();
    		} catch (IOException e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		}
		
		return true;
	}
	public void addCommentInFile() throws IOException{
		Gson gson = new Gson();
		FileWriter fw = new FileWriter("static/json/comments.json");
		gson.toJson(CommentDAO.comments, fw);
		fw.flush();
		fw.close();
	}


	public static HashMap<Integer,Comment> getCommentsByRestaurant(String rName) {
		// TODO Auto-generated method stub
		HashMap<Integer,Comment> c=new HashMap<Integer,Comment>();
		for (Map.Entry<Integer, Comment> entry : comments.entrySet()) {

	        if((entry.getValue().getRestaurant().getRestaurantName()).equals(rName) ) {
	        	c.put((entry.getValue().getIdComment()),entry.getValue());

	        }
	    }
		return c;
	}


	public boolean approveComment(String idC) {
		// TODO Auto-generated method stub
		for (Map.Entry<Integer, Comment> entry : comments.entrySet()) {
	        if(entry.getValue().getIdComment()==Integer.parseInt(idC) ) {
	        	entry.getValue().setApproved(CommentStatus.Approved);
	        }
	    }
		try {
			addCommentInFile();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return true;
	}
	public boolean declineComment(String idC) {
		// TODO Auto-generated method stub
		for (Map.Entry<Integer, Comment> entry : comments.entrySet()) {
	        if(entry.getValue().getIdComment()==Integer.parseInt(idC) ) {
	        	entry.getValue().setApproved(CommentStatus.Rejected);
	        }
	    }
		try {
			addCommentInFile();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return true;
	}


	public boolean checkRestaurantByGrade(Restaurant value, String g) {
		// TODO Auto-generated method stub
		int i=0;
		int gradeCheck=Integer.parseInt(g);
		int sum=0;
		for (Map.Entry<Integer, Comment> entry : comments.entrySet()) {
	        if(entry.getValue().getRestaurant().getRestaurantName().equals(value.getRestaurantName()) ) {
	        	i++;
	        	sum+=entry.getValue().getMark();
	        }
	    }
		if(i!=0) {
			double avg=sum/i;
			if(avg<=gradeCheck && avg> (gradeCheck-1.0)) {
				return true;
			}
		}
		return false;
	}

}
