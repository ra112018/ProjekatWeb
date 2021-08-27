Vue.component("kupacProfil", {
	name: "kupacProfil",
	data: function(){
		return {
			userName: null,
			password: null,
			showErrorMessage: false,

		};
	},
	methods: {
		
	},
	template: `<div><div class="vertical-menu">
        <a href="#" class="active">Moj profil</a>
        <a href="#">Restorani</a>
        <a href="#">Porudžbine</a>
        <a href="#">Korpa</a>
        <a href="#">Utisci i komentari</a>
          </div>
      <p class="naslov"><b>Vaši podaci</b></p>
      <div class="tabela">
        <table>
            <tbody>
                <form > <tr> </tr>
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
                        <input type="submit" value="Izmeni" style="font-size: medium; margin-top: 2%;"/>
                        </td>
                    </tr>
            </tbody>
        </table>
      </div>
</div> `
		
});