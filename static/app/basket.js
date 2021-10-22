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
		inTrash: function(value){
			axios
					.post('/deleteFromCart', {userName: this.username,articleName:value
                    },{params:{userName: this.username,articleName:value}})
						
					.then(function(response){
						alert(value);
						alert("Uspešno izbrisano!")
					});
		},
	order: function(){

		axios.post('/order',{userName:this.username},{params:{userName:this.username}})
		.then(function(response){
			alert("Porudžbina je u statusu obrade!");
			refresh();
		});
	},
	refresh: function(){
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
            <tr v-for="article in basket.basketArticles" v-if="article.deleted !=='true'">
				<td><img :src="article.articlePhoto" class="articlePicture" alt="articlePhoto"></td>
                <td> {{article.articleName}}</td>
                <td>
					<input type="number" v-model="article.numberOfArticles" min="1">

                </td>
                <td>{{article.price}}</td>
                <td> <button v-on:click="inTrash(article.articleName)">Obriši</button></td>
            </tr>
			<tr><td>Ukupna cena porudžbine: <input v-model="basket.basketPrice"></td></tr>
                
            </tr>
        </table>
		<br>
        <button v-on:click="order" style="max-height: 50%; font-size: 120%; float:left; margin-left:2%; margin-top:auto;">Poruči</button>

		</div>`
		
});