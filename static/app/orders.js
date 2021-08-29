Vue.component("orders", {
	name: "orders",
	data: function(){
		return {
			role:localStorage.getItem('role'),
		    user:localStorage.getItem('user'),
			restaurantName:""

		};
	},
	methods: {
		
	},
	template: `<div>	
	<div class="maliHeder">
		<a href="#/">
		<button style="font-size: 100%;">Odjavi se</button></a>
	</div>
	 <div class="vertical-menu">
        <a href="#/buyerProfile" v-if="this.role==='kupac'">Moj profil</a>
		<a href="#/buyerProfile" v-if="this.role==='manager'">Moj profil</a>
		
        <a href="#/restaurants" v-if="this.role==='kupac'">Restorani</a>
		 <a href="#/restaurants" v-if="this.role==='manager'">Restorani</a>
	
        <a href="#/orders" v-if="this.role==='kupac'" class="active">Porudžbine</a>
		<a href="#/orders" v-if="this.role==='manager'" class="active">Porudžbine</a>
  
        <a href="#/basket" v-if="this.role==='kupac'">Korpa</a>
		<a href="#" v-if="this.role==='manager'">Kupci</a>
		
        <a href="#" v-if="this.role==='kupac'">Utisci i komentari</a> 
        <a href="#" v-if="this.role==='manager'">Utisci i komentari</a> </div>
      
		<p class="naslov"><b>Porudžbine</b></p>
     
      <div class="pretraga">
		<input type="text" id="naziv" name="naziv" placeholder="Naziv restorana">
        <input type="text" id="lokacija" name="lokacija" placeholder="Cena">
        <input type="date" id="tip" name="tip" placeholder="Datum od">
        <input type="date" id="tip" name="tip" placeholder="Datum do">
        
         <input type="submit" value="Pretraži"><br><strong>&nbsp;Filtriraj: </strong>
        <label>Tip restorana</label>
        <select name="kriterijum" id="kriterijum">
            <option value="brza">Brza hrana</option>
            <option value="giros">Giros</option>
            <option value="kineska">Kineska hrana</option>
            <option value="kuvana">Kuvana jela</option>
            <option value="palačinke">Palačinke</option>
            <option value="pizza">Pizza</option>
            <option value="poslasticarnica">Poslastičarnica</option>
            <option value="susi">Suši</option>
        </select> <label>Status</label>
        <select name="status" id="status">
            <option value="brza">Obrada</option>
            <option value="giros">U pripremi</option>
            <option value="kineska">Čeka dostavljača</option>
            <option value="kuvana">U transportu</option>
            <option value="palačinke">Dostavljena</option>
            <option value="pizza">Otkazana</option>
        </select>
        &nbsp;
        <strong>Sortiraj prema: </strong> <select name="sortiranje" id="sort">
        <option value="naziv">Naziv restorana</option>
        <option value="lokacija">Cena porudžbine</option>
        <option value="ocena">Datum porudžbine</option>
        </select>  <select name="kriterijum" id="kriterijum">
        <option value="rastuće">Rastuće</option>
        <option value="opadajuće">Opadajuće</option>
        </select>
        
    	</div>
		
		<br><br><br>
		   <table class="tabelaPorudzbine">
            <tr>
            <th>Restoran</th>
                
            <th>Artikal</th>
            <th>Količina</th>
            <th>Cena</th>
            <th>Status</th>
            <th> </th>
            <tr>
                <td> Restoran1 </td>
                <td> Palacinka </td>
                <td> 1  </td>
                <td> 320 </td>
                <td> Obrada </td>
                <td> <button>Otkaži</button></td>
            </tr>
                
            </tr>
        </table>

		</div>`
		
});