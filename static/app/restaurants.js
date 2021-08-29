Vue.component("restaurants", {
	name:"restaurants",
	data: function () {
		    return {
			restaurantList: [],
			username:"",
      	    role:"",
			user:localStorage.getItem('user')
		    }
	},
	methods:{
		
	},
	mounted: function(){
        
              this.username = window.localStorage.getItem('username');
              this.role = window.localStorage.getItem('role');
			  this.user=window.localStorage.getItem('user');
	},
	selected: function(){
			       		
			localStorage.setItem("restaurantName", "ciao");
			router.replace({ path: `/selectedRestaurant` })
	},

	template: ` </div>
	<div>
		<div class="maliHeder">
		<a href="#/">
		<button style="font-size: 100%;">Odjavi se</button></a>
	</div>
	<div class="vertical-menu">
        <a href="#/buyerProfile">Moj profil</a>
        <a href="#/restaurants" class="active">Restorani</a>
        <a href="#/orders">Porudžbine</a>
        <a href="#/basket">Korpa</a>
        <a href="#">Utisci i komentari</a>
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
	
	<div class="grid">
			
		<a onClick="selected" >
		<div class="restoran">
			<a href="#/restaurant"><img class="logo2" src="img/ciao.jpg" alt="Sample photo"/></a>
		<span class="opis"><em><strong>Ciao Pizzeria</strong></em><br>Pizza restoran<br><p class="open">Otvoreno </p> 09:00-23:00
		</span>
		</div></a>
		<div class="restoran">
			<a href="#/restaurant"><img class="logo4" src="img/milki-logo.png" alt="Sample photo"/></a>
		<span class="opis"><br><br><br><em><strong>Palačinkarnica Milki</strong></em><br>Palačinkarnica<br><p class="open">Otvoreno</p> 10:00-24:00
		</span>
		</div>
		<div class="restoran">
			<a href="#/restaurant"><img class="logo4" src="img/food1.jpg" alt="Sample photo"/></a>
		<span class="opis"><br><br><br><em><strong>Palačinkarnica Milki</strong></em><br>Palačinkarnica<br><p class="open">Otvoreno</p> 10:00-24:00
		</span>
		</div>
		<div class="restoran">
			<a href="#/restaurant"><img class="logo4" src="img/giros.jpg" alt="Sample photo"/></a>
		<span class="opis"><br><br><br><em><strong>Giros Master</strong></em><br>Giros<br><p class="open">Otvoreno</p> 08:00-21:00
		</span>
		</div>
		<div class="restoran">
			<a href="#/restaurant"><img class="logo3" src="img/dizni-logo.jpg" alt="Sample photo"/></a>
		<span class="opis"><br><br><br><em><strong>Palačinkarnica Dizni</strong></em><br>Palačinkarnica<br><p class="open">Otvoreno</p> 10:00-22:00
		</span>
		</div>
		<div class="restoran">
			<a href="#/restaurant"><img class="logo4" src="img/logo_kineski.png" alt="Sample photo"/></a>
		<span class="opis"><br><br><br><em><strong>Kineski zid</strong></em><br>Restoran kineske hrane<br><p class="open">Otvoreno</p> 10:00-22:00
		</span>
		</div>
		<div class="restoran">
			<a href="#/restaurant"><img class="logo5" src="img/mek.jpg" alt="Sample photo"/></a>
		<span class="opis"><br><br><br><em><strong>McDonald's</strong></em><br>Restoran brze hrane<br><p class="open">Otvoreno</p> 10:00-22:00
		</span>
		</div><div class="restoran">
			<a href="#/restaurant"><img class="logo6" src="img/logo.jpg" alt="Sample photo"/></a>
		<span class="opis1"><br><br><br><em><strong>Grekos giros</strong></em><br>Giros<br><p class="open">Otvoreno</p> 10:00-22:00
		</span>
		</div>
	</div>
	
	</div>
`,
});	
