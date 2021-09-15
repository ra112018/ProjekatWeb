-Vue.component("selected-restaurant", {
	name: "selected-restaurant",
	data: function(){
		return {
			
        usPass:null,
        name: null,
        lastName:null,
        date:null,
		type:null,
        gender:null,
        showErrorMessage: false,
        usName: null,
		user:localStorage.getItem('user'),
		role:localStorage.getItem('role'),
		
        backup: {},
		restaurant:null,
		articles:null

		//decodeVar: null
		};
	},
	mounted: function(){
		 let id = this.$route.params.id;
	
              this.username = window.localStorage.getItem('username');
              this.role = window.localStorage.getItem('role');
			  this.user=window.localStorage.getItem('user');
            axios
              .get('/restaurantDetails?id='+id,{params:{restaurantName: id}})
	          .then(response => {
			this.restaurant=response.data;
               
	});	
	
				axios.get('/articles?id='+id,{params:{restaurantName: id}}).then(response => {
					this.username = window.localStorage.getItem('username');
              this.role = window.localStorage.getItem('role');
			  this.user=window.localStorage.getItem('user');
				this.articles=response.data;
				});

		},
	
	methods: {
 
		addToCart: function(e){
				e.preventDefault();
					axios
					.post('/addArticleToCart', {user: this.user,articleName:this.name, articleType:this.type,price:this.price,
					quantity:this.quantity,articlePhoto:this.image,
                    description : this.description, restaurantName:this.restaurantName
                    })
						
					.then(function(response){
						alert("Dodato u korpu!")
					});
			}
		},

	template: ` 
	<div>
		<div v-if="this.role==='kupac' || this.role==='administrator' || this.role==='manager' || this.role==='deliverer'" class="maliHeder">
		<a href="#/">
		<button style="font-size: 100%;">Odjavi se</button></a>
	</div>
	<div>
		<div v-if="this.role===null " class="maliHeder">
		<a href="#/login">
		<button style="font-size: 100%;">Prijavi se</button></a>
	</div>
	
	<div class="vertical-menu">
       <a href="#/buyerProfile" v-if="this.role==='kupac'">Moj profil</a>
 		<a href="#/buyerProfile" v-if="this.role==='administrator'">Moj profil</a>
        <a href="#/buyerProfile" v-if="this.role==='manager'">Moj profil</a>
       
        <a href="#/restaurants" v-if="this.role==='kupac'" class="active">Restorani</a>
		<a href="#/restaurants" v-if="this.role==='administrator'" class="active">Restorani</a>
		<a href="#/restaurants" v-if="this.role==='manager'" >Restorani</a>
		
		<a href="#" v-if="this.role==='administrator'">Korisnici</a>
		<a href="#" v-if="this.role==='administrator'">Dodaj korisnika</a>

        <a href="#/orders" v-if="this.role==='kupac'">Porudžbine</a>
		<a href="#/orders" v-if="this.role==='manager'">Porudžbine</a>
        <a href="#/basket" v-if="this.role==='kupac'">Korpa</a>
		<a href="#" v-if="this.role==='kupac'">Kupci</a>

        <a href="#" v-if="this.role==='kupac'">Utisci i komentari</a>
		<a href="#" v-if="this.role==='administrator'">Utisci i komentari</a>
		<a href="#" v-if="this.role==='manager'">Utisci i komentari</a>
	 </div>
	
		
	<div class="restoran">
		<img class="logo3" :src="restaurant.logo"/>
		<span class="opis"><br><br>{{restaurant.restaurantName}}<br><p class="open">{{restaurant.status}}</p><p>{{restaurant.restaurantType}}</p>
		Bulevar cara Lazara 92
		</span>
		</div>
		
<div class="meni"><h2><br>Palačinke</h2></div>
<div class="slatke"><h2>-slatke</h2></div>
	<div class="restoran" v-for="article in articles">
	<img :src="article.articlePhoto"><p>{{article.articleName}}</p><p>{{article.description}}</p>
	<p>{{article.price}}</p><button v-if="this.role==='kupac'"> Dodaj u korpu </button></div>
	
	</div></div>

`
		
});