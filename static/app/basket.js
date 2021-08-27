Vue.component("basket", {
	name: "basket",
	data: function(){
		return {
			
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
        <a href="#/buyerProfile">Moj profil</a>
        <a href="#">Restorani</a>
        <a href="#/orders">Porudžbine</a>
        <a href="#/basket" class="active">Korpa</a>
        <a href="#">Utisci i komentari</a> </div>
     
 		<p class="naslov"><b>Korpa</b></p>
     
        <table class="tabelaKorpe">
            <tr>
            <th>Naziv artikla</th>
                
            <th>Količina</th>
            <th>Cena</th>
            <th>Slika</th>
            <th>Ukupna cena porudžbine</th>
            <th>&nbsp;</th>
            <tr>
                <td> Palacinka  </td>
                <td>
                    <select name="kolicina" id="kolicina">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>

                </td>
                <td> 320  </td>
                <td> slikaa </td>
                <td> 320  </td>
                <td> <button>Obriši</button></td>
            </tr>
                
            </tr>
        </table>

        <button style="max-height: 50%; font-size: 120%; float:right; margin-right:10%; margin-top: -1%;">Poruči</button>

		</div>`
		
});