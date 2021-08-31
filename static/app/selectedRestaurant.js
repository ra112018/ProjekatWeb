Vue.component("selected-restaurant", {
	name: "selected-restaurant",
	data: function(){
		return {
			
        usPass:null,
        name: null,
        lastName:null,
        date:null,
		type:null,
        gender:null,
        showErrorMessage: false,
        usName: null,
		user:localStorage.getItem('user'),
		restaurantName:localStorage.getItem('restaurantName'),
		role:localStorage.getItem('role'),
        backup: {},
		//decodeVar: null
		};
	},
	mounted: function(){
            axios
              .get('/restaurantDetails?restaurant='+this.restaurantName)
	          .then(response => {
            this.type = response.data.restaurantType;
            this.articles = response.data.articles;
            this.status = response.data.status;
            this.logo = response.data.logo;
               
              this.username = window.localStorage.getItem('username');
              this.role = window.localStorage.getItem('role');
			  this.user=window.localStorage.getItem('user');
			this.restaurantName=window.localStorage.getItem('restaurantName')
	});
		},
	
	methods: {
 
		
		},

	template: ` 
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
		<a href="#/restaurants" v-if="this.role==='manager'" >Restorani</a>
		
		<a href="#" v-if="this.role==='administrator'">Korisnici</a>
        <a href="#/orders" v-if="this.role==='kupac'">Porudžbine</a>
		<a href="#/orders" v-if="this.role==='manager'">Porudžbine</a>
        <a href="#/basket" v-if="this.role==='kupac'">Korpa</a>
		<a href="#" v-if="this.role==='kupac'">Kupci</a>

        <a href="#" v-if="this.role==='kupac'">Utisci i komentari</a>
		<a href="#" v-if="this.role==='administrator'">Utisci i komentari</a>
		<a href="#" v-if="this.role==='manager'">Utisci i komentari</a>
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
	<div class="restoran">
		<img class="logo3" src="dizni-logo.jpg"/>
		<span class="opis"><br><br><input v-model="restaurantName"><br><input v-model="type"><p class="open">Otvoreno</p> 10:00-22:00
		<br>Bulevar cara Lazara 92
		</span>
		</div>
		<div class="slike"><img class="slika" src="dizni1.jpg"/><img class="slika" src="this.logo"/></div>
		
<div class="meni"><h2><br><br><br><br><br><br><br><br>Palačinke</h2></div>
<div class="slatke"><h3>-slatke</h3></div>
<table class="opcija">
<tr><th> </th><th>Cena</th></tr>
<tr><td><h4>Fina palačinka</h4><h5>jogurt krem sa malinama, šlag, voćni preliv</h5></td>
<td>330</td></tr>
<tr><td><h4>Banana split palačinka</h4><h5>banana, sladoled, šlag, čoko preliv</h5></td><td>330</td></tr>
<tr><td><h4>Švarcvald palačinka</h4><h5>višnja, čokolada, šlag</h5></td><td>330</td></tr>
<tr><td><h4>Plazma i Nutella palačinka</h4><h5>nutella, plazma keks u mleku, šlag</h5></td><td>360</td></tr></table>
  
	
	</div></div>

`
		
});