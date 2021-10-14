Vue.component("restaurants", {
	name:"restaurants",
	data: function () {
		    return {
			
		    username:"",
      	    role:localStorage.getItem('role'),
		    user:localStorage.getItem('user'),
			restaurants:[],
			restaurantName:"",
			restaurantType:"",
			grade:"",
			location:"",
			searchingName:"",
			searchingLocation:"",
			orderedFromRestaurants:[],
			
			sortRestaurantType:"",
			sortingType:"",
			sortingCriterion:"",
			locations:""
		    }
	},
	mounted: function(){
        
			this.refreshPage();

	},
	
	methods: {
		refreshPage(){

			axios.get('/restaurants')
				.then(response => {
		           
		            for(var i =0;i< response.data.length;i++){
		                var restaurant = {};
		                restaurant = response.data[i];
						restaurant.restaurantName = response.data[i].restaurantName;
						restaurant.status = response.data[i].status;
						restaurant.restaurantType = response.data[i].restaurantType;
					    this.restaurants.push(restaurant);

		            }
		         
		        });
				if(this.role==='kupac'){
			 this.username = window.localStorage.getItem('username');

			axios.get('/orderedFromRestaurant',{params:{userName: this.username}}).then(response => {
		           
		            for(var i =0;i< response.data.length;i++){
		                var orderedRestaurant = {};
		                orderedRestaurant = response.data[i];
						orderedRestaurant.restaurantName = response.data[i].restaurantName;
						orderedRestaurant.status = response.data[i].status;
						orderedRestaurant.restaurantType = response.data[i].restaurantType;
					    this.orderedFromRestaurants.push(orderedRestaurant);

		            }
		         
		        });

			
		}
		},
		evaluate: function(id){
			router.push({ path: `/evaluateRestaurant/${id}` });

		},
		
		newRestaurant(event){
		    router.push({ path: `/addRestaurant` })

		},
		selectRestaurant: function(id){
			router.push({ path: `/selectedRestaurant/${id}` })
			
		},
		checkName: function(a,b){
			let first, second;
			if(this.sortingCriterion == "naziv"){
				first = a.restaurantName;
				second = b.restaurantName;
			}
			if(first < second){
				if(this.sortingType == 'rastuce'){
					return -1;
				}else{
					return 1;
				}
			}else if(first > second){
				if(this.sortingType == 'rastuce'){
					return 1;
				}else{
					return -1;
				}
			}else{
				return 0;
			}
			
			
		},
		
		restaurantLocation: function(id){
			let i = 0;
			for(i; i< this.locations.length; i++){
				if(this.locations[i].id == id){
					return this.locations[i];
				}
			}
		},
		
		checkLocations: function(c,d){
			let a = this.restaurantLocation(c.lokacija);
			let b = this.restaurantLocation(d.lokacija);
			
		},
		sortRestaurants: function(){
			if(this.sortingType != "rastuce" && this.sortingType != "opadajuce"){
				alert("Potrebno je uneti tip sortiranja");
				
			}else{
				if(this.sortingCriterion != "naziv" && this.sortingCriterion != "lokacija" && this.sortingCriterion!= "ocena"){
					alert("Potrebno je uneti kriterijum sortiranja");
				}else if(this.sortingCriterion == "naziv"){
					this.restaurants.sort(this.checkName);
				}else if(this.sortingCriterion == "lokacija"){
					this.restaurants.sort(this.checkLocations);
				}
				
				
			}
		},
		
		search(){
			this.restaurans = [];
			if(((this.searchingName == "" && this.searchingLocation == "") && this.restaurantType == "")&& this.grade == ""){
				alert("Potrebno je uneti kriterijum pretrage");
			}else{
				axios.get('/searchingRestaurants', {params:{searching:this.searching, restaurantName: this.restaurantName}})
				.then(response => {
		           
		            for(var i =0;i< response.data.length;i++){
		                var restaurant = {};
		                restaurant = response.data[i];
						restaurant.restaurantName = response.data[i].restaurantName;
						restaurant.status = response.data[i].status;
						restaurant.restaurantType = response.data[i].restaurantType;
					    this.restaurants.push(restaurant);

		            }
		         
		        });
			}
		}
		
	},
	
	

	template: ` <div>
	<div>
		<div class="maliHeder">
		<a href="#/">
		<button style="font-size: 100%;">Odjavi se</button></a>
	</div>
	<div class="vertical-menu">
        <a href="#/buyerProfile" v-if="this.role==='kupac'">Moj profil</a>
 		<a href="#/buyerProfile" v-if="this.role==='administrator'">Moj profil</a>
        <a href="#/buyerProfile" v-if="this.role==='manager'">Moj profil</a>
		<a href="#/buyerProfile" v-if="this.role==='deliverer'">Moj profil</a>
       
        <a href="#/restaurants" v-if="this.role==='kupac'" class="active">Restorani</a>
		<a href="#/restaurants" v-if="this.role==='administrator'" class="active">Restorani</a>
		<a href="#/restaurants" v-if="this.role==='manager'" class="active">Restorani</a>
		
		<a href="#/myRestaurants" v-if="this.role==='manager'" >Moji restorani</a>
		
		
		<a href="#/userTableAdmin" v-if="this.role==='administrator'">Korisnici</a>
		<a href="#/addUser" v-if="this.role==='administrator'">Dodaj korisnika</a>
		<a href="#/suspiciousUsersTable" v-if="this.role==='administrator'">Pregled sumnjivih korisnika</a>
        <a href="#/orders" v-if="this.role==='kupac'">Porudžbine</a>
		<a href="#/orders" v-if="this.role==='manager'">Porudžbine</a>
		<a href="#/orders" v-if="this.role==='deliverer'">Porudžbine</a>
        <a href="#/basket" v-if="this.role==='kupac'">Korpa</a>
		<a href="#" v-if="this.role==='manager'">Kupci</a>

        <a href="#" v-if="this.role==='kupac'">Utisci i komentari</a>
		<a href="#" v-if="this.role==='administrator'">Utisci i komentari</a>
		<a href="#/comments" v-if="this.role==='manager'">Utisci i komentari</a>
 
	</div>

	
		<div class="pretraga">
		
		<form @submit="search">
			<input type="text" v-model="searchingName" placeholder="Naziv"></input>
			<input type="text" v-model="searchingLocation" placeholder="Lokacija"></input>
					
			<strong>Tip restorana: </strong>
			 <select name="kriterijum" id="kriterijum" @change="search" v-model="restaurantType">
				  <option value="" selected></option>
				  <option value="chinese">Kineska hrana</option>
				  <option value="italian">Italijanska hrana</option>
				  <option value="pancakes">Palačinke</option>
				  <option value="barbecue">Roštilj</option>
			</select>  
			
			<strong>Ocena: </strong>
			<select name="ocena" id="ocena" @change="search"  v-model="grade">
				  <option value="" selected></option>
				  <option value="1">1</option>
				  <option value="2">2</option>
				  <option value="3">3</option>
				  <option value="4">4</option>
				  <option value="5">5</option>
			</select> 
			
			<button>Pretraži</button>
		</form>
		
		<label><b>Filtriranje: </b></label><label for="otvoreni">Samo otvoreni   </label>
		<input type="checkbox" id="otvoreni" name="otvoreni" value="Samo otvoreni"><br>

	  	<strong>Sortiraj prema: </strong> 
		<select name="sortiranje" id="sort" v-model="sortingCriterion">
			  <option value="naziv">Naziv restorana</option>
			  <option value="lokacija">Lokacija</option>
			  <option value="ocena">Prosečna ocena</option>
		</select>  
		<select name="kriterijum" id="kriterijum" v-model="sortingType">
			  <option value="rastuce">Rastuće</option>
			  <option value="opadajuce">Opadajuće</option>
		</select>
		
		<button v-on:click="sortRestaurants">Sortiraj </button>

		</div>
	<div v-if="role =='administrator'"> <button class="addButton" @click="newRestaurant" :id="user.username" style="margin-left: 2%;"> Novi</button></div>

	<div class="grid">
			
		
		<div v-for="restaurant in restaurants" class="restoran">
			<div v-if="restaurant.status === 'Open'">
				
				<a v-on:click="selectRestaurant(restaurant.restaurantName)"> 
				<img class="logo4" :src="restaurant.logo" width="150em" height="130em"/></a>
				<ul>
					<span class="opis1"><br><em><strong>
						<li>{{restaurant.restaurantName}}</li></strong></em>
						<li class="open">{{restaurant.status}}</li></strong></em>
						<li><i>{{restaurant.restaurantType}}</i></li>
						<li>10:00-22:00</li>
						<div v-if="role==='kupac' && orderedFromRestaurants">
						<div v-for="orderedRestaurant in orderedFromRestaurants">
						<div v-if="restaurant.restaurantName === orderedRestaurant.restaurantName"><button v-on:click="evaluate(orderedRestaurant.restaurantName)"> Oceni</button</div>
						</div>
						</div>
					</span>
				</ul>
			</div>
		</div>	
		<div v-for="restaurant in restaurants" class="restoran">
			<div v-if="restaurant.status === 'Closed'">
				
				<a v-on:click="selectRestaurant(restaurant.restaurantName)"> 
				<img class="logo4" :src="restaurant.logo" width="150em" height="130em"/></a>
				<ul>
					<span class="opis1"><br><em><strong>
						<li>{{restaurant.restaurantName}}</li></strong></em>
						<li class="open">{{restaurant.status}}</li></strong></em>
						<li><i>{{restaurant.restaurantType}}</i></li>
						<div v-if="role==='kupac' && orderedFromRestaurants">
						<div v-for="orderedRestaurant in orderedFromRestaurants">
						<div v-if="restaurant.restaurantName === orderedRestaurant.restaurantName"><button v-on:click="evaluate(restaurant.restaurantName)"> Oceni</button</div>
						</div>
						</div>
					</span>
				</ul>
			
			</div>
	</div>
	</div>
`,
});	
