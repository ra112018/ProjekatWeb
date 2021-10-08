-Vue.component("evaluateRestaurant", {
	name: "evaluateRestaurant",
	data: function(){
		return {
			
        username: localStorage.getItem('username'),
		user:localStorage.getItem('user'),
		role:localStorage.getItem('role'),
        backup: {},
		restaurant:null,

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
		
		<a href="#/userTableAdmin" v-if="this.role==='administrator'">Korisnici</a>
		<a href="#/addUser" v-if="this.role==='administrator'">Dodaj korisnika</a>

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
		<span class="opisRestorana"><br><br>{{restaurant.restaurantName}}<br><p class="open">{{restaurant.status}}</p><p>{{restaurant.restaurantType}}</p>
		Bulevar cara Lazara 92
		</span>
		</div>
		
	
	</div></div>

`
		
});