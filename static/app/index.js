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
		
		checkName: function(i, j){
			let first, second;
			if(this.sortingCriterion == "naziv"){
				first = i.naziv;
				second = j.naziv;
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
		sortRestaurants: function(){
			if(this.sortingType != "rastuce" && this.sortingType != "opadajuce"){
				alert("Potrebno je uneti tip sortianja");
			}else{
				if(this.sortingCriterion == "naziv"){
					this.restaurants.sort(this.checkName);
				}
				
			}
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
	
	<div class="grid">
			
		
		<div v-for="restaurant in restaurants" class="restoran"><a v-on:click="selectRestaurant(restaurant.restaurantName)"> <img class="logo4"
			 :src="restaurant.logo" alt="Sample photo"/></a><span class="opis1"><br><br><br><em><strong>{{restaurant.restaurantName}}
		</strong></em><br>{{restaurant.restaurantType}}<br><p class="open">{{restaurant.status}}</p> 10:00-22:00
		</span></div>
	
	</div>
`
});