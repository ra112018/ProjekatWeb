Vue.component("restaurants", {
	name:"restaurants",
	data: function () {
		    return {
			
			username:"",
      	    role:localStorage.getItem('role'),
		    user:localStorage.getItem('user'),
			restaurants:[],
			restaurantName:"",
			sortingType:"",
			sortingCriterion:"",
			locations:""
		    }
	},
	methods:{
		
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
			if(first > second){
				if(this.sortingType == 'rastuce'){
					return 1;
				}else{
					return -1;
				}
			}else if(first < second){
				if(this.sortingType == 'rastuce'){
					return -1;
				}else{
					return 1;
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
	},
	mounted: function(){
        
              this.username = window.localStorage.getItem('username');
              this.role = window.localStorage.getItem('role');
			  this.user=window.localStorage.getItem('user');
			axios.get('/restaurants')
				.then(response => {
		           
		            for(var i =0;i< response.data.length;i++){
		                var restaurant = {};
		                restaurant = response.data[i];
					     this.restaurants.push(restaurant);

		            }
		         
		        });
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
       
        <a href="#/restaurants" v-if="this.role==='kupac'" class="active">Restorani</a>
		<a href="#/restaurants" v-if="this.role==='administrator'" class="active">Restorani</a>
		<a href="#/restaurants" v-if="this.role==='manager'" class="active">Restorani</a>
		
		<a href="#/myRestaurants" v-if="this.role==='manager'" >Moji restorani</a>
		
		
		<a href="#/userTableAdmin" v-if="this.role==='administrator'">Korisnici</a>
		<a href="#/addUser" v-if="this.role==='administrator'">Dodaj korisnika</a>
        <a href="#/orders" v-if="this.role==='kupac'">Porudžbine</a>
		<a href="#/orders" v-if="this.role==='manager'">Porudžbine</a>
        <a href="#/basket" v-if="this.role==='kupac'">Korpa</a>
		<a href="#" v-if="this.role==='manager'">Kupci</a>

        <a href="#" v-if="this.role==='kupac'">Utisci i komentari</a>
		<a href="#" v-if="this.role==='administrator'">Utisci i komentari</a>
		<a href="#/comments" v-if="this.role==='manager'">Utisci i komentari</a>
 
	</div>

	
		<div class="pretraga">
		<input type="text" placeholder="Naziv" id="naziv" name="naziv">
		<input type="text" placeholder="Lokacija" id="lokacija" name="lokacija">
		<input type="text" placeholder="Tip" id="tip" name="tip">
		<input type="text" placeholder="Ocena" id="ocena" name="ocena">
		 <input type="submit" value="Pretraži"><br><br><strong>Filtriraj: </strong>
		 <select name="kriterijum" id="kriterijum">
			  <option value="brza">Brza hrana</option>
			  <option value="giros">Giros</option>
			  <option value="kineska">Kineska hrana</option>
			  <option value="kuvana">Kuvana jela</option>
			  <option value="palačinke">Palačinke</option>
			  <option value="pizza">Pizza</option>
			  <option value="poslasticarnica">Poslastičarnica</option>
			  <option value="susi">Suši</option>
		</select>  
		<input type="checkbox" id="otvoreni" name="otvoreni" value="Samo otvoreni">
		<label for="otvoreni">Samo otvoreni   </label>
&nbsp;
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
	<div v-if="role =='administrator'"> <button class="addButton" @click="newRestaurant" :id="user.username"> Novi</button></div>

	<div class="grid">
			
		
		<div v-for="restaurant in restaurants" class="restoran"><a v-on:click="selectRestaurant(restaurant.restaurantName)"> <img class="logo4"
			 :src="restaurant.logo" alt="Sample photo"/></a><span class="opis1"><br><br><br><em><strong>{{restaurant.restaurantName}}
		</strong></em><br>{{restaurant.restaurantType}}<br><p class="open">{{restaurant.status}}</p> 10:00-22:00
		</span></div>
	
	</div>
`,
});	
