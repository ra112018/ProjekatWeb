Vue.component("restaurants", {
	name:"restaurants",
	data: function () {
		    return {
			restaurantList: [],
			username:"",
      	   role:localStorage.getItem('role'),
		   user:localStorage.getItem('user'),
			restaurantName:""
		    }
	},
	methods:{
		trigger(){
			this.restaurantName="Pizzeria Ciao";
		    localStorage.setItem('restaurantName', 'Pizzeria Ciao');

		},
		newRestaurant(event){
		    router.push({ path: `/addRestaurant` })

		}
	},
	mounted: function(){
        
              this.username = window.localStorage.getItem('username');
              this.role = window.localStorage.getItem('role');
			  this.user=window.localStorage.getItem('user');
	},
	

	template: ` </div>
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
	<div v-if="role =='administrator'"> <button class="addButton" @click="newRestaurant" :id="user.username"> Novi</button></div>

	<div class="grid">
			
		<a>
		<div class="restoran" @click="trigger">
			<a href="#/selectedRestaurant"><img class="logo2" src="img/ciao.jpg" alt="Sample photo"/></a>
		<span class="opis"><em><strong>Ciao Pizzeria</strong></em><br>Pizza restoran<br><p class="open">Otvoreno </p> 09:00-23:00
		</span>
		</div></a>
		<div class="restoran">
			<a href="#/selectedRestaurant"><img class="logo4" src="img/milki-logo.png" alt="Sample photo"/></a>
		<span class="opis"><br><br><br><em><strong>Palačinkarnica Milki</strong></em><br>Palačinkarnica<br><p class="open">Otvoreno</p> 10:00-24:00
		</span>
		</div>
		<div class="restoran">
			<a href="#/selectedRestaurant"><img class="logo4" src="img/food1.jpg" alt="Sample photo"/></a>
		<span class="opis"><br><br><br><em><strong>Palačinkarnica Milki</strong></em><br>Palačinkarnica<br><p class="open">Otvoreno</p> 10:00-24:00
		</span>
		</div>
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
			<a href="#/selectedRestaurant"><img class="logo4" src="img/logo_kineski.png" alt="Sample photo"/></a>
		<span class="opis"><br><br><br><em><strong>Kineski zid</strong></em><br>Restoran kineske hrane<br><p class="open">Otvoreno</p> 10:00-22:00
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
	</div>
	
	</div>
`,
});	
