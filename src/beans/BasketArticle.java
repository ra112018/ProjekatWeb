package beans;

public class BasketArticle extends Article {

	int numberOfArticles;
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
		this.setArticlePhoto(a.getArticlePhoto());
		this.setPrice(a.getPrice());
		this.setQuantity(a.getQuantity());
		this.setRestaurantName(a.getRestaurantName());
		this.setDeleted(a.getDeleted());
		this.setNumberOfArticles(1);
	}
	

}
