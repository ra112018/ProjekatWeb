Vue.component("buyerProfile", {
	name: "buyerProfile",
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
        <a href="#/buyerProfile" class="active">Moj profil</a>
        <a href="#">Restorani</a>
        <a href="#/orders">Porudžbine</a>
        <a href="#/basket">Korpa</a>
        <a href="#">Utisci i komentari</a>
     </div>
      <p class="naslov"><b>Vaši podaci</b></p>
      <div class="tabela">
        <table>
            <tbody>
                	<tr> </tr>
                    <tr>
                        <td> Korisničko ime: </td>
                        <td> <input type="text" value="Mika123" disabled /> </td>
                    </tr>
                    <tr>
                        <td> Lozinka: </td>
                        <td> <input type="password" value="12345" disabled/> </td>
                    </tr>
                    <tr>
                        <td> Ime: </td>
                        <td> <input type="text" value="Mika" disabled/> </td>
                    </tr>
                    <tr>
                        <td> Prezime: </td>
                        <td> <input type="text" value="Mikic" disabled/> </td>
                    </tr>
                    <tr>
                        <td> Pol: </td>
                        <td> <input type="radio"  name="pol" value="Muški" checked disabled/> <label>Muški</label> <input type="radio" name="pol" disabled /> <label> Ženski</label></td>
                    </tr>
                    <tr>
                        <td> Datum rođenja: </td>
                        <td> <input type="date" value="2000-01-12" disabled/> </td>
                    </tr>

                    <tr>
                        <td colspan="2" style="text-align: right;">
						<a href="#/updateProfile">
                        	<button> Izmeni</button>
						</a>
                        </td>
                    </tr>
            </tbody>
        </table>
      </div></div>
`
		
});