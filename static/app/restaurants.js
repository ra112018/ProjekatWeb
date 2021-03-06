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
			grades: [],
			searchingName:"",
			searchingLocation:"",
			orderedFromRestaurants:[],
			
			searchingRestType:[],
			searchingRestGrade:[],
			sortRestaurantType:"",
			sortingType:"",
			sortingCriterion:"",
			locations:[],
			otvoreni:null,
			otvorenoiline:null,
			location:null,
			idLocation: "",
		    }
	},
	mounted: function(){
        
			this.refreshPage();

	},
	
	methods: {
		refreshPage(){
			this.restaurants = [];
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
			axios.get('/grades')
				.then(response => {
		            for(var i =0;i< response.data.length;i++){
		                var grade = {};
		                grade.restaurantName = response.data[i].restaurantName;
						grade.mark = response.data[i].grade;
					    this.grades.push(grade);
						for(var j = 0; j< this.restaurants.length;j++){
							if(grade.mark!=0 && grade.restaurantName == this.restaurants[j].restaurantName){
								this.restaurants[j].avgGrade = grade.mark;
								console.log("ocenaaa");
							}
						}
		            }
		        });
		},
		findLocation:function(id){
			axios.get('/location?id='+id).then(response => {
				this.location=response.data;
				this.locations.push(this.location);
			});
		},
		evaluate: function(id){
			router.push({ path: `/evaluateRestaurant/${id}` });

		},
		
		newRestaurant(event){
		    router.push({ path: `/addRestaurant` })

		},
		deleteRestaurant: function(id){
			axios.post('/deleteRestaurant', {rName: id},{params:{rName:  id}})
        .then(response =>{
          		alert("Uspe??no izbrisan restoran");
				this.refreshPage();
            });
		
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
		searchingByName(){
			this.searchingRestaurants = this.restaurants;
			this.restaurants = [];
			for(var i = 0; i< this.searchingRestaurants.length;i++){
				if((this.searchingRestaurants[i].restaurantName).includes(this.searchingName)){
					this.restaurants.push(this.searchingRestaurants[i]);
				}
			}
		},
		searchingByLocation(){
			this.searchingRestaurants = this.restaurants;
			this.restaurants = [];
			for(var i = 0; i< this.searchingRestaurants.length;i++){
				for(var j = 0; j< this.locations.length;j++){
					if(this.searchingRestaurants[i].locationId === this.locations[j].idLocation){
						if((this.locations[j].city).includes(this.searchingLocation)){
							this.restaurants.push(this.searchingRestaurants[i]);
					}
					}
				}
			}
		},
		checkLocations: function(a,b){
			let first, second;
			if(this.sortingCriterion == "lokacija"){
				for(var i=0;i<this.locations.length;i++){
				if(this.locations[i].idLocation == a.locationId){
					first = this.locations[i];
				}
				if(this.locations[i].idLocation == b.locationId){
					second = this.locations[i];
				}
			}
			}
			if(first.street < second.street){
				if(this.sortingType == 'rastuce'){
					return -1;
				}else{
					return 1;
				}
			}else if(first.street > second.street){
				if(this.sortingType == 'rastuce'){
					return 1;
				}else{
					return -1;
				}
			}else{
 			if(first.city > second.city)
                {
                    if(this.sortType == 'rastuce')
                    {
                        return 1;
                    }
                    else
                    {
                        return -1;
                    }
                }
                else if(first.city < second.city)
                {
                    if(this.sortType == 'rastuce')
                    {
                        return -1;
                    }
                    else
                    {
                        return 1;
                    }
                }
                else
                {
                    return 0;
                }			}
			
			
		},
		checkGrade: function(a,b){
			let first, second;
			console.log(this.sortingCriterion)
			if(this.sortingCriterion == "ocena"){
				if(a.avgGrade){
				first = a.avgGrade;
				}
				else{
					first = 0;
				}
				if(b.avgGrade){
				second = b.avgGrade;
				}
				else{
					second = 0;
				}
				
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
		searchRestType: function(){
			this.searchingRestType = this.restaurants;
			this.restaurants = [];
			
		    for(var i =0;i< this.searchingRestType.length;i++){
				if(this.searchingRestType[i].restaurantType ===this.restaurantType){
					this.restaurants.push(this.searchingRestType[i]);
				}
		          }
			axios.get('/grades')
				.then(response => {
		            for(var i =0;i< response.data.length;i++){
		                var grade = {};
		                grade.restaurantName = response.data[i].restaurantName;
						grade.mark = response.data[i].grade;
					    this.grades.push(grade);
	
						for(var j = 0; j< this.restaurants.length;j++){
							if(grade.mark!=0 && grade.restaurantName == this.restaurants[j].restaurantName){
								this.restaurants[j].avgGrade = grade.mark;
							}
						}
		            }
		        });
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
				}else if(this.sortingCriterion == "ocena"){
					this.restaurants.sort(this.checkGrade);
				}
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
			}},
		
		search(){
			this.restaurants = [];
			if(((this.searchingName == "" && this.searchingLocation == "") && this.restaurantType == "")&& this.grade == ""){
				alert("Potrebno je uneti kriterijum pretrage");
			}else{
				axios.get('/searchingRestaurants', {params:{searchingName:this.searchingName, restaurantName: this.restaurantName,
				searchingLocation:this.searchingLocation,restaurantType:this.restaurantType, grade:this.grade
				}})
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
			axios.get('/grades')
				.then(response => {
		            for(var i =0;i< response.data.length;i++){
		                var grade = {};
		                grade.restaurantName = response.data[i].restaurantName;
						grade.mark = response.data[i].grade;
					    this.grades.push(grade);
	
						for(var j = 0; j< this.restaurants.length;j++){
							if(grade.mark!=0 && grade.restaurantName == this.restaurants[j].restaurantName){
								this.restaurants[j].avgGrade = grade.mark;
							}
						}
						console.log(this.restaurants);
		            }
		        });

			}
		},
		searchGrade:function(){
			this.searchingRestGrade = this.restaurants;
			this.restaurants = [];
		    for(var i =0;i< this.searchingRestGrade.length;i++){
				if(this.searchingRestGrade[i].avgGrade < (parseInt(this.grade)+0.1) &&this.searchingRestGrade[i].avgGrade >(parseInt(this.grade)-1.1)){
					this.restaurants.push(this.searchingRestGrade[i]);
				}
		          }
			axios.get('/grades')
				.then(response => {
		            for(var i =0;i< response.data.length;i++){
		                var grade = {};
		                grade.restaurantName = response.data[i].restaurantName;
						grade.mark = response.data[i].grade;
					    this.grades.push(grade);
	
						for(var j = 0; j< this.restaurants.length;j++){
							if(grade.mark!=0 && grade.restaurantName == this.restaurants[j].restaurantName){
								this.restaurants[j].avgGrade = grade.mark;
							}
						}
		            }
		        });
		},
		
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
		
		<a href="#/myRestaurants" v-if="this.role==='manager'" >Moj restoran</a>
		
		
		<a href="#/userTableAdmin" v-if="this.role==='administrator'">Korisnici</a>
		<a href="#/addUser" v-if="this.role==='administrator'">Dodaj korisnika</a>
		<a href="#/suspiciousUsersTable" v-if="this.role==='administrator'">Pregled sumnjivih korisnika</a>
        <a href="#/orders" v-if="this.role==='kupac'">Porud??bine</a>
		<a href="#/orders" v-if="this.role==='manager'">Porud??bine</a>
		<a href="#/orders" v-if="this.role==='deliverer'">Porud??bine</a>
		
		<a href="#/buyersWhoOrdered" v-if="this.role==='manager'" >Kupci</a>

        <a href="#/basket" v-if="this.role==='kupac'">Korpa</a>

        <a href="#" v-if="this.role==='kupac'">Utisci i komentari</a>
		<a href="#/allComments" v-if="this.role==='administrator'">Utisci i komentari</a>
		<a href="#/allComments" v-if="this.role==='manager'">Utisci i komentari</a>
 
	</div>
	</div>
	
		<div class="pretraga">
		
		<form @submit="search">
			<input type="text" v-model="searchingName" placeholder="Naziv" @change="searchingByName"></input>
			<input type="text" v-model="searchingLocation" placeholder="Lokacija" @change="searchingByLocation"></input>
					
			<strong>Tip restorana: </strong>
			 <select name="restaurantType" id="restaurantType" @change="searchRestType" v-model="restaurantType">
				  <option value="" selected></option>
				  <option value="Chinese">Kineska hrana</option>
				  <option value="Italian">Italijanska hrana</option>
				  <option value="Pancakes">Pala??inke</option>
				  <option value="Barbecue">Ro??tilj</option>
			</select>  
			
			<strong>Ocena: </strong>
			<select name="grade" id="grade" @change="searchGrade" v-model="grade">
				  <option value="" selected></option>
				  <option value="1"> <1 </option>
				  <option value="2">1<=2</option>
				  <option value="3">2<=3</option>
				  <option value="4">3<=4</option>
				  <option value="5">4 <= 5</option>
			</select> 
			
			<button>Pretra??i</button>
		</form>
		
		<label><b>Filtriranje: </b></label><label for="otvoreni">Samo otvoreni   </label>
		<input type="checkbox" id="otvoreni" name="otvoreni" v-model="otvorenoiline" value="otvoreni"  @change="filter(otvoreni)"><br>

	  	<strong>Sortiraj prema: </strong> 
		<select name="sortiranje" id="sort" v-model="sortingCriterion">
			  <option value="naziv">Naziv restorana</option>
			  <option value="lokacija">Lokacija</option>
			  <option value="ocena">Prose??na ocena</option>
		</select>  
		<select name="kriterijum" id="kriterijum" v-model="sortingType">
			  <option value="rastuce">Rastu??e</option>
			  <option value="opadajuce">Opadaju??e</option>
		</select>
		
		<button v-on:click="sortRestaurants">Sortiraj </button>

		</div>
	<div v-if="role =='administrator'"> <button class="addButton" @click="newRestaurant" :id="user.username" style="margin-left: 2%; max-width:5%;"> Novi</button></div>

	<div class="grid">
			
		
		<div v-for="restaurant in restaurants" class="restoranUlog">
			<div v-if="restaurant.status === 'Open'" >
				
				<a v-on:click="selectRestaurant(restaurant.restaurantName)"> 
				<img class="logo4" :src="restaurant.logo" width="150em" height="130em"/></a>
				<ul>
					<span class="opis1"><br><em><strong>
						<li>{{restaurant.restaurantName}}</li></strong></em>
						<li  v-bind:class="{'open':true, 'closed':(restaurant.status =='Closed')}">{{restaurant.status}}</li>
						<li><i>{{restaurant.restaurantType}}</i></li>
						<li v-for="location in locations" v-if="location.idLocation === restaurant.locationId">
						<i>{{location.street}} {{location.houseNumber}}, {{location.city}} </i></li>
						
						<div readonly>
						 <label v-bind:class="{'normalStarSmall':true, 'activeStarSmall':(restaurant.avgGrade>=1)}" >??? </label>
					    <label  v-bind:class="{'normalStarSmall':true, 'activeStarSmall':(restaurant.avgGrade>=2)}">???</label>
					    <label  v-bind:class="{'normalStarSmall':true, 'activeStarSmall':(restaurant.avgGrade>=3)}">???</label>
					    <label  v-bind:class="{'normalStarSmall':true, 'activeStarSmall':(restaurant.avgGrade>=4)}">???</label>
					    <label  v-bind:class="{'normalStarSmall':true, 'activeStarSmall':(restaurant.avgGrade>=5)}">???</label>
						</div>
						<div v-if="role==='kupac' && orderedFromRestaurants">
						<div v-for="orderedRestaurant in orderedFromRestaurants">
						<div v-if="restaurant.restaurantName === orderedRestaurant.restaurantName"><button v-on:click="evaluate(orderedRestaurant.restaurantName)"> Oceni</button></div>
						</div></div>
						<div v-if="role ==='administrator'"><button v-on:click="deleteRestaurant(restaurant.restaurantName)">Obri??i restoran</button</div>

						
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
						
						<div readonly v-for="grade in grades" v-if="grade.mark!=0 && grade.restaurantName == restaurant.restaurantName">
						 <label v-bind:class="{'normalStar':true, 'activeStar':(grade.mark>=1)}" >??? </label>
					    <label  v-bind:class="{'normalStar':true, 'activeStar':(grade.mark>=2)}">???</label>
					    <label  v-bind:class="{'normalStar':true, 'activeStar':(grade.mark>=3)}">???</label>
					    <label  v-bind:class="{'normalStar':true, 'activeStar':(grade.mark>=4)}">???</label>
					    <label  v-bind:class="{'normalStar':true, 'activeStar':(grade.mark>=5)}">???</label>
				</div>
						<div v-if="role==='kupac' && orderedFromRestaurants">
						<div v-for="orderedRestaurant in orderedFromRestaurants">
						<div v-if="restaurant.restaurantName === orderedRestaurant.restaurantName"><button v-on:click="evaluate(restaurant.restaurantName)"> Oceni</button></div>
						</div></div>
						
						<div v-if="role ==='administrator'"><button v-on:click="deleteRestaurant(restaurant.restaurantName)">Obri??i restoran</button</div>

						</div>
					</span>
				</ul>
			
			</div>
	</div>
	</div>
	</div>
	</div>
`,
});	
