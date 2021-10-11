-Vue.component("evaluateRestaurant", {
	name: "evaluateRestaurant",
	data: function(){
		return {
		text:"",
		mark:null,
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
 	addComment: function(){
					axios
					.post('/addComment', {customerOfOrder: this.username, 
										restaurant: this.restaurant, 
										text: this.text, 
										mark: this.mark})
						
					.then(function(response){
							alert("Dodat komentar!")
							router.replace({ path: `/restaurants`})		

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
       
        <a href="#/restaurants" v-if="this.role==='kupac'" class="active">Restorani</a>
		

        <a href="#/orders" v-if="this.role==='kupac'">Porudžbine</a>
        <a href="#/basket" v-if="this.role==='kupac'">Korpa</a>

        <a href="#" v-if="this.role==='kupac'">Utisci i komentari</a>
	 </div>
	
		
	<div class="restoran">
		<img class="logo4" :src="restaurant.logo"/>
		<span class="opisRestorana"><br><br>{{restaurant.restaurantName}}<br><p class="open">{{restaurant.status}}</p><p>{{restaurant.restaurantType}}</p>
		Bulevar cara Lazara 92		DODATI LOKACIJU
		</span>
		</div>
		<p>Ocena</p> <div class="rate">
    <input type="radio" id="star5" v-model="mark" name="rate" value="5" />
    <label for="star5" title="text">5 stars</label>
    <input type="radio" id="star4" v-model="mark"  name="rate" value="4" />
    <label for="star4" title="text">4 stars</label>
    <input type="radio" id="star3" v-model="mark"  name="rate" value="3" />
    <label for="star3" title="text">3 stars</label>
    <input type="radio" id="star2" v-model="mark"  name="rate" value="2" />
    <label for="star2" title="text">2 stars</label>
    <input type="radio" id="star1" v-model="mark"  name="rate" value="1" />
    <label for="star1" title="text">1 star</label>
  </div><br><br>
		<p>Komentar</p><input v-model="text" type="text"/><br>
		 <button @click="addComment">Pošalji</button>

	 
	</div></div>

`
		
});