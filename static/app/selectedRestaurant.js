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
            axios
              .get('/restaurantDetails?id='+id,{params:{restaurantName: id}})
	          .then(response => {
			this.restaurant=response.data;
               
              this.username = window.localStorage.getItem('username');
              this.role = window.localStorage.getItem('role');
			  this.user=window.localStorage.getItem('user');
	});	
	
				axios.get('/articles?id='+id,{params:{restaurantName: id}}).then(response => {
				this.articles=response.data;
				});

		},
	
	methods: {
 
		
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
		<span class="opis"><br><br>{{restaurant.restaurantName}}<br><input v-model="type"><p class="open">{{restaurant.restaurantType}}</p>
		Bulevar cara Lazara 92
		</span>
		</div>
		
<div class="meni"><h2><br><br><br><br><br><br><br><br>Palačinke</h2></div>
<div class="slatke"><h3>-slatke</h3></div>
<table class="opcija">
<tr><th> </th><th>Cena</th></tr>
<tr><td><h4>Fina palačinka</h4><h5>jogurt krem sa malinama, šlag, voćni preliv</h5></td>
<td>330</td></tr>
<tr><td><h4>Banana split palačinka</h4><h5>banana, sladoled, šlag, čoko preliv</h5></td><td>330</td></tr>
<tr><td><h4>Švarcvald palačinka</h4><h5>višnja, čokolada, šlag</h5></td><td>330</td></tr>
<tr><td><h4>Plazma i Nutella palačinka</h4><h5>nutella, plazma keks u mleku, šlag</h5></td><td>360</td></tr></table>
  
	<div class="restoran" v-for="article in articles">
	<img :src="article.articlePhoto"><p>{{article.description}}</p><p>{{article.price}}</p></div>
	</div>
	
	</div></div>

`
		
});