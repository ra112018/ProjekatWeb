Vue.component("home-page", {
	name:"home-page",
	data: function () {
		    return {
			user:null,
		  role:null,
			username:null,
			restaurants:[],
			restaurantName:"",
			sortingType:"",
			sortingCriterion:""
		    }
	},
	methods:{
		trigger(){

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
		sortRestaurants: function(){
			if(this.sortingType != "rastuce" && this.sortingType != "opadajuce"){
				alert("Potrebno je uneti tip sortianja");
			}else{
				if(this.sortingCriterion != "naziv" && this.sortingCriterion != "lokacija" && this.sortingCriterion!= "ocena"){
					alert("Potrebno je uneti kriterijum sortiranja");
				}else if(this.sortingCriterion == "naziv"){
					this.restaurants.sort(this.checkName);
				}
			}
		},
		search(){
			
		}
			
	},
	
	mounted: function(){
       		localStorage.removeItem('role');
     	    localStorage.removeItem('username');
     	    localStorage.removeItem('user');
			axios.get('/restaurants')
				.then(response => {
		           
		            for(var i =0;i< response.data.length;i++){
		                var restaurant = {};
		                restaurant = response.data[i];
					     this.restaurants.push(restaurant);
		            }
		         
		        });
	},
	template: ` 
	<div>
	
		<div  class="pretragaRegistracija">
			<a href="#/login">Prijavi se</a>
			&nbsp;&nbsp;
			<a href="#/register">Registruj se</a>
		</div>
		<br><br>
		<div class="pretraga">
			<form @submit="search">
				<input type="text" v-model="searching" placeholder="Naziv"></input>
				<input type="text" v-model="searching" placeholder="Lokacija"></input>
				
		<strong>Tip restorana: </strong>
		 <select name="kriterijum" id="kriterijum" @change="search">
			  <option value="chinese">Kineska hrana</option>
			  <option value="italian">Italijanska hrana</option>
			  <option value="pancakes">Palačinke</option>
			  <option value="barbecue">Roštilj</option>
		</select>  
		
		<strong>Ocena: </strong>
		 <select name="ocena" id="ocena" @change="search">
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
	
	<div class="grid">
			
		
		<div v-for="restaurant in restaurants" class="restoran">
			<div v-if="restaurant.status === 'Open'">
				
				<a v-on:click="selectRestaurant(restaurant.restaurantName)"> 
				<img class="logo4" :src="restaurant.logo" width="150em" height="130em"/></a>
				<ul>
					<span class="opis1"><br><em><strong>
						<li>{{restaurant.restaurantName}}</strong></em></li>
						<li class="open">{{restaurant.status}}</strong></em></li>
						<li><i>{{restaurant.restaurantType}}</i></li>
						<li>10:00-22:00</li>
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
						<li>{{restaurant.restaurantName}}</strong></em></li>
						<li class="open">{{restaurant.status}}</strong></em></li>
						<li><i>{{restaurant.restaurantType}}</i></li>
						<li>10:00-22:00</li>
					</span>
				</ul>
			
			</div>
	
		</div>
		
		
	</div>
`
});