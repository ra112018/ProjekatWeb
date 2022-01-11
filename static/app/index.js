Vue.component("home-page", {
	name:"home-page",
	data: function () {
		    return {
			user:null,
		    role:null,
			username:null,
			restaurants:[],
			restaurantName:"",
			restaurantForFilter:null,
			location:"",
			locations:[],
			restaurantType:"",
			locationId:null,
			grade:"",
			grades: [],
			searchingName:"",
			searchingLocation:"",
			filteringRestaurants:[],
			sortingType:"",
			sortingCriterion:"",
			otvoreni:"",
			otvorenoiline:""
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
				}else if(this.sortingCriterion == "lokacija"){
					this.restaurants.sort(this.checkLocations);
				}
			}
		},
		search(){
			this.restaurants = [];
			if(((this.searchingName == "" && this.searchingLocation == "") && this.restaurantType == "")&& this.grade == ""){
				alert("Potrebno je uneti kriterijum pretrage");
			}else{
				axios.get('/searchingRestaurants', {params:{searchingName:this.searchingName, restaurantName: this.restaurantName,
				searchingLocation:this.searchingLocation,restaurantType:this.restaurantType, grade:this.grade
				}})
				.then(response => {
		            if(response.data){
		            for(var i =0;i< response.data.length;i++){
		                var restaurant = {};
		                restaurant = response.data[i];
						restaurant.restaurantName = response.data[i].restaurantName;
						restaurant.status = response.data[i].status;
						restaurant.restaurantType = response.data[i].restaurantType;
						restaurant.locationId = response.data[i].locationId;
					    this.restaurants.push(restaurant);

		            }
					}
					else{
						alert("Nema restorana po ovom kriterijumu");
					}
		         
		        });
			}
		},
		filter(value){
			if(this.otvorenoiline){

			this.filteringRestaurants=this.restaurants;
			this.restaurants=[];
			for(restaurant in this.filteringRestaurants){
						if(this.filteringRestaurants[restaurant].status=="Open")
						{
					    this.restaurants.push(this.filteringRestaurants[restaurant]);
						}
		            }
				}
			else{
				this.restaurants=this.filteringRestaurants;
			}}
				
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
		axios.get('/allLocations')
				.then(response => {
		           
		            for(var i =0;i< response.data.length;i++){
		                var locationTemp = {};
		                 locationTemp = response.data[i];
					     this.locations.push(locationTemp);
		            }
		        });
		axios.get('/grades')
				.then(response => {
		            for(var i =0;i< response.data.length;i++){
		                var grade = {};
		                grade.restaurantName = response.data[i].restaurantName;
						grade.mark = response.data[i].grade;
					    this.grades.push(grade);
		            }
		        });
	console.log(this.grades);
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
				<input type="text" v-model="searchingName" placeholder="Naziv"></input>
				<input type="text" v-model="searchingLocation" placeholder="Lokacija"></input>
				
		<strong>Tip restorana: </strong>
		 <select name="restaurantType" id="restaurantType" @change="search" v-model="restaurantType">
			  <option value="" selected></option>
			  <option value="Chinese">Kineska hrana</option>
			  <option value="Italian">Italijanska hrana</option>
			  <option value="Pancakes">Palačinke</option>
			  <option value="Barbecue">Roštilj</option>
		</select>  
		
		<strong>Ocena: </strong>
		 <select name="grade" id="grade" @change="search" v-model="grade">
			  <option value="" selected></option>
			  <option value="1"> <1 </option>
			  <option value="2">1<=2</option>
			  <option value="3">2<=3</option>
			  <option value="4">3<=4</option>
			  <option value="5">4 <= 5</option>
		</select> 
		
		<button>Pretraži</button>
		</form>
		
		<label><b>Filtriranje: </b></label><label for="otvoreni">Samo otvoreni   </label>
		<input type="checkbox" id="otvoreni" name="otvoreni" v-model="otvorenoiline" value="otvoreni"  @change="filter(otvoreni)"><br>

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
						<li>{{restaurant.restaurantName}}</li></strong></em>
						<li class="open">{{restaurant.status}}</li></strong></em>
						<li><i>{{restaurant.restaurantType}}</i></li>
						<div  v-for="location in locations" v-if="location.idLocation == restaurant.locationId">
						<li >{{location.city}}</li><li >{{location.street}}  {{location.houseNumber}}</li></div>
						<div readonly v-for="grade in grades" v-if="grade.mark!=0 && grade.restaurantName == restaurant.restaurantName">
						 <label v-bind:class="{'normalStarSmall':true, 'activeStarSmall':(grade.mark>=1)}" >★ </label>
					    <label  v-bind:class="{'normalStarSmall':true, 'activeStarSmall':(grade.mark>=2)}">★</label>
					    <label  v-bind:class="{'normalStarSmall':true, 'activeStarSmall':(grade.mark>=3)}">★</label>
					    <label  v-bind:class="{'normalStarSmall':true, 'activeStarSmall':(grade.mark>=4)}">★</label>
					    <label  v-bind:class="{'normalStarSmall':true, 'activeStarSmall':(grade.mark>=5)}">★</label>
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
						<li v-bind:class="{'open':true, 'closed':(restaurant.status =='Closed')}">{{restaurant.status}}</li>
						<li><i>{{restaurant.restaurantType}}</i></li>
						<div  v-for="location in locations" v-if="location.idLocation == restaurant.locationId">
						<li >{{location.city}}</li><li >{{location.street}}  {{location.houseNumber}}</li></div>
						
						<div readonly v-for="grade in grades" v-if="grade.mark!=0 && grade.restaurantName == restaurant.restaurantName">
						 <label v-bind:class="{'normalStar':true, 'activeStar':(grade.mark>=1)}" >★ </label>
					    <label  v-bind:class="{'normalStar':true, 'activeStar':(grade.mark>=2)}">★</label>
					    <label  v-bind:class="{'normalStar':true, 'activeStar':(grade.mark>=3)}">★</label>
					    <label  v-bind:class="{'normalStar':true, 'activeStar':(grade.mark>=4)}">★</label>
					    <label  v-bind:class="{'normalStar':true, 'activeStar':(grade.mark>=5)}">★</label>
				</div>
					</span>
				</ul>
			
			</div>
	
		</div>
		</div>
		
	</div>
`
});