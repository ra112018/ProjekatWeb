Vue.component("basket", {
	name: "basket",
	data: function(){
		return {
			
        username: localStorage.getItem('username'),
		user:localStorage.getItem('user'),
		role:localStorage.getItem('role'),
		basket: null,
		};
	},
	methods: {
		
	},
	mounted: function(){
		 let id = this.$route.params.id;
	
              this.username = window.localStorage.getItem('username');
              this.role = window.localStorage.getItem('role');
			  this.user=window.localStorage.getItem('user');
            axios
              .get('/userBasket',{params:{userName: this.username}})
	          .then(response => {
			this.basket=response.data;           
	});	
	},
	template: `<div>
	 <div class="maliHeder">
		<a href="#/">
		<button style="font-size: 100%;">Odjavi se</button></a>
	</div>
	 <div class="vertical-menu">
        <a href="#/buyerProfile">Moj profil</a>
        <a href="#/restaurants">Restorani</a>
        <a href="#/orders">Porudžbine</a>
        <a href="#/basket" class="active">Korpa</a>
        <a href="#">Utisci i komentari</a> </div>
     
 		<p class="naslov"><b>Korpa</b></p>
     
        <table class="tabelaKorpe">
            <tr>
			<th></th>
            <th>Naziv artikla</th>
                
            <th>Količina</th>
            <th>Cena</th>
            <th>&nbsp;</th>
            <tr v-for="article in basket.basketArticles">
				<td><img :src="article.articlePhoto">
                <td> {{article.articleName}}</td>
                <td>
                    <select name="kolicina" id="kolicina">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>

                </td>
                <td> {{article.price}}  </td>
                <td> <button>Obriši</button></td>
            </tr>
			<tr><td>Ukupna cena porudžbine: {{basket.basketPrice}}</td></tr>
                
            </tr>
        </table>

        <button style="max-height: 50%; font-size: 120%; float:right; margin-right:10%; margin-top: -1%;">Poruči</button>

		</div>`
		
});