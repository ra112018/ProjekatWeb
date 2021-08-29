Vue.component("selected-restaurant", {
	name: "selected-restaurant",
	data: function(){
		return {
			
        usPass:null,
        name: null,
        lastName:null,
        date:null,
        gender:null,
        showErrorMessage: false,
        usName: null,
		user:localStorage.getItem('user'),
		restaurantName:localStorage.getItem('restaurantName'),
        backup: {},
		//decodeVar: null
		};
	},
	
	methods: {
		mounted: function(){
        
              this.username = window.localStorage.getItem('username');
              this.role = window.localStorage.getItem('role');
			  this.user=window.localStorage.getItem('user');
			this.restaurantName=window.localStorage.getItem('restaurantName')
	},
		

	},
	template: ` 
	<div>
		<div class="maliHeder">
		<a href="#/">
		<button style="font-size: 100%;">Odjavi se</button></a>
	</div>
	<div class="vertical-menu">
        <a href="#/buyerProfile" class="active">Moj profil</a>
        <a href="#/restaurants">Restorani</a>
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
	
	<div class="restoran">
		<img class="logo3" src="dizni-logo.jpg"/>
		<span class="opis"><br><br><input v-model="restaurantName">Palačinkarnica<br><p class="open">Otvoreno</p> 10:00-22:00
		<br>Bulevar cara Lazara 92
		</span>
		</div>
		<div class="slike"><img class="slika" src="dizni1.jpg"/><img class="slika" src="dizni2.jpg"/></div>
		<div class="ukratko">Rođena u Novom Sadu pre skoro dvadeset godina iz uzvraćene ljubavi sa njenim visočanstvom palačinkom.
Mekana, topiva, satenski nežna, filovana po željama, postala sam simbol mnogih detinjstava.
 Dodaci su se stalno menjali, ali ja sam ostajala ista. 
Kažu da su sve palačinke slične i naravno okrugle, ali svako ko se usudio da ih proba kod mene je shvatio da su stvarno okrugle, ali ipak drugačije. 
Za tu jednu nijansu, od pedeset nijansi palačinke.</div>
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