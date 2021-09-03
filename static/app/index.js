Vue.component("home-page", {
	name:"home-page",
	data: function () {
		    return {
			user:null,
			restaurants:[],
			restaurantName:"",


		    }
	},
	methods:{
		trigger(){
			this.restaurantName="Pizzeria Ciao";
		    localStorage.setItem('restaurantName', 'Pizzeria Ciao');

		}
	},
	mounted: function(){
        
              this.username = window.localStorage.getItem('username');
              this.role = window.localStorage.getItem('role');
			  this.user=window.localStorage.getItem('user');
			axios.get('/restaurants')
				.then(response => {
		           
		            for(var i =0;i< response.data.length;i++){
		                var restaurant = {};
		                restaurant.restaurantName = response.data[i].restaurantName;
		                restaurant.restaurantType = response.data[i].restaurantType;
		                restaurant.logo = response.data[i].logo;
						restaurant.managerName=response.data[i].managerName;
		               restaurant.location=response.data[i].location;
						restaurant.status=response.data[i].status;
						restaurant.articles=response.data[i].articles;
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
		<select name="sortiranje" id="sort">
			  <option value="naziv">Naziv restorana</option>
			  <option value="lokacija">Lokacija</option>
			  <option value="ocena">Prosečna ocena</option>
		</select>  
		<select name="kriterijum" id="kriterijum">
			  <option value="rastuće">Rastuće</option>
			  <option value="opadajuće">Opadajuće</option>
		</select>
		
		</div>
	
	<div class="grid">
			
		<a>
		<div class="restoran" @click="trigger">
			<a href="#/selectedRestaurant"><img class="logo2" src="img/ciao.jpg" alt="Sample photo"/></a>
		<span class="opis"><em><strong>Ciao Pizzeria</strong></em><br>Pizza restoran<br><p class="open">Otvoreno </p> 09:00-23:00
		</span>
		</div></a>
		
		
		<div class="restoran">
			<a href="#/selectedRestaurant"><img class="logo4" src="img/giros.jpg" alt="Sample photo"/></a>
		<span class="opis"><br><br><br><em><strong>Giros Master</strong></em><br>Giros<br><p class="open">Otvoreno</p> 08:00-21:00
		</span>
		</div>
		<div class="restoran">
			<a href="#/selectedRestaurant"><img class="logo3" src="img/dizni-logo.jpg" alt="Sample photo"/></a>
		<span class="opis"><br><br><br><em><strong>Palačinkarnica Dizni</strong></em><br>Palačinkarnica<br><p class="open">Otvoreno</p> 10:00-22:00
		</span>
		</div>
		
		<div class="restoran">
			<a href="#/selectedRestaurant"><img class="logo5" src="img/mek.jpg" alt="Sample photo"/></a>
		<span class="opis"><br><br><br><em><strong>McDonald's</strong></em><br>Restoran brze hrane<br><p class="open">Otvoreno</p> 10:00-22:00
		</span>
		</div><div class="restoran">
			<a href="#/selectedRestaurant"><img class="logo6" src="img/logo.jpg" alt="Sample photo"/></a>
		<span class="opis1"><br><br><br><em><strong>Grekos giros</strong></em><br>Giros<br><p class="open">Otvoreno</p> 10:00-22:00
		</span>
		</div>
		<div v-for="restaurant in restaurants" class="restoran"><a href="#/selectedRestaurant"><img class="logo4"
			 :src="restaurant.logo" alt="Sample photo"/></a><span class="opis1"><br><br><br><em><strong>{{restaurant.restaurantName}}
		</strong></em><br>{{restaurant.restaurantType}}<br><p class="open">{{restaurant.status}}</p> 10:00-22:00
		</span></div>
	
	</div>
`
	, 
	methods : {
		},
	mounted () {
            }
});