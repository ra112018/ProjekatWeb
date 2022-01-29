Vue.component("basket", {
	name: "basket",
	data: function(){
		return {
			
        username: localStorage.getItem('username'),
		user:localStorage.getItem('user'),
		role:localStorage.getItem('role'),
		price:null,
		newQuantity:null,
		basket: null,
		userProf:null
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
		changeQuantity(idB){
        for(let i=0; i <this.basket.basketArticles.length; i++){
            if(this.basket.basketArticles[i].articleName == idB){
                this.newQuantity = this.basket.basketArticles[i].numberOfArticles;
            }
        }
			console.log(this.newQuantity)


         axios
         .post('/changeQuantity',{},{params:{id: idB, quantity: this.newQuantity }}
         )

        this.changePrice();
    },
    changePrice: function() {
         this.price = 0;
         for(i = 0; i < this.basket.basketArticles.length; i++) {
             this.price += this.basket.basketArticles[i].price * this.basket.basketArticles[i].numberOfArticles;
			console.log(this.price+ "novo")
         } 
		console.log(this.price)
		console.log(this.userProf)

         if(this.userProf == "Golden"){
             this.price = this.price*0.9;
         }else if(this.userProf == "Silver"){
             this.price = this.price*0.95;
         }else if(this.userProf == "Bronze"){
              this.price = this.price*0.97;
         }

    },
	order: function(){

		axios.post('/order',{userName:this.username},{params:{userName:this.username,price:this.price}})
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
		    this.price = this.basket.basketPrice;
	});
 			axios
              .get('/account',{params:{userName: this.username}})
	          .then(response => {
				this.userProf = response.data.buyerType;
				console.log(this.userProf)
        
			});	

			}
			
	
	},
	mounted: function(){

		this.refresh();
				 
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
        <a href="#/comments">Utisci i komentari</a> </div>
     
 		<p class="naslov"><b>Korpa</b></p>
     
        <table class="tabelaKorpe">
            <tr>
			<th></th>
            <th>Naziv artikla</th>               
            <th>Količina</th>
            <th>Cena</th>
            <th>&nbsp;</th>
            <tr v-for="article in basket.basketArticles" v-if="article.deleted !=='true'">
				<td><img :src="article.articlePhoto" class="articleBasket" alt="articleBasket"></td>
                <td> {{article.articleName}}</td>
                <td>
					<input type="number" v-model="article.numberOfArticles" min="1" v-on:click.exact="changeQuantity(article.articleName)">

                </td>
                <td>{{article.price}}</td>
                <td> <button v-on:click="inTrash(article.articleName)">Obriši</button></td>
            </tr>
			<tr><td>Ukupna cena porudžbine: <input v-model="this.price"></td></tr>
                
            </tr>
        </table>
		<br>
        <button v-on:click="order" style="max-height: 50%; font-size: 120%; float:left; margin-left:2%; margin-top:auto;">Poruči</button>

		</div>`
		
});