package beans;

public class BasketArticle {

	int numberOfArticles;
	public String articleName;
	public String articlePhoto;
	private double price;
	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	boolean deletedFromBasket;
	public boolean isDeletedFromBasket() {
		return deletedFromBasket;
	}

	public String getArticlePhoto() {
		return articlePhoto;
	}

	public void setArticlePhoto(String articlePhoto) {
		this.articlePhoto = articlePhoto;
	}

	public void setDeletedFromBasket(boolean deletedFromBasket) {
		this.deletedFromBasket = deletedFromBasket;
	}

	public int getNumberOfArticles() {
		return numberOfArticles;
	}
	
	public void setNumberOfArticles(int numberOfArticles) {
		this.numberOfArticles = numberOfArticles;
	}
	public BasketArticle() {
		// TODO Auto-generated constructor stub
		super();
	}
	public BasketArticle(Article a) {
		// TODO Auto-generated constructor stub
		this.setArticleName(a.getArticleName());
	}

	public String getArticleName() {
		return articleName;
	}

	public void setArticleName(String articleName) {
		this.articleName = articleName;
	}
	

}
