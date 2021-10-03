package beans;

public class Request {

	private Deliverer deliverer;
	private String idOrder;
	private int idRequest;
	public Deliverer getDeliverer() {
		return deliverer;
	}
	public void setDeliverer(Deliverer deliverer) {
		this.deliverer = deliverer;
	}
	public String getIdOrder() {
		return idOrder;
	}
	public void setIdOrder(String idOrder) {
		this.idOrder = idOrder;
	}
	public int getIdRequest() {
		return idRequest;
	}
	public void setIdRequest(int idRequest) {
		this.idRequest = idRequest;
	}
	

}
