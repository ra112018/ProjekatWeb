Vue.component("buyerProfile", {
	name: "buyerProfile",
	data: function(){
		return {
			
        usPass:null,
        name: null,
        lastName:null,
        date:null,
        gender:null,
        showErrorMessage: false,
        usName: null,
        backup: {},
		//decodeVar: null
		};
	},
	mounted: function(){
        this.usName = window.localStorage.getItem('username');
        axios.get('/account?userName='+this.usName)
		.then(response => {
            this.name = response.data.name;
            this.usPass = response.data.password;
            this.lastName = response.data.surname;
            if(response.data.gender == "Male"){
                this.gender = "Male";
            }else{
                this.gender = "Female";
            }
            this.date = response.data.birthDate;
			
        });
},
	methods: {
		update : function (e){
			
		router.replace({ path: `/updateProfile` })
		
		}

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
                        <td> <input type="text" v-model="usName" disabled /> </td>
                    </tr>
                    <tr>
                        <td> Lozinka: </td>
                        <td> <input type="password" v-model="usPass" disabled/> </td>
                    </tr>
                    <tr>
                        <td> Ime: </td>
                        <td> <input type="text" v-model="name" disabled/> </td>
                    </tr>
                    <tr>
                        <td> Prezime: </td>
                        <td> <input type="text" v-model="lastName" disabled/> </td>
                    </tr>
                    <tr>
                        <td> Pol: </td>
                        <td> <input type="radio" value="Male" name="pol" v-model="gender" disabled/> <label>Muški</label> <input type="radio" value="Female" name="pol" v-model="gender" disabled /> <label> Ženski</label></td>
                    </tr>
                    <tr>
                        <td> Datum rođenja: </td>
                        <td> <input type="date" v-model="date" disabled/> </td>
                    </tr>

                    <tr>
                        <td colspan="2" style="text-align: right;">
						<a href="#/updateProfile">
                        	<button v:on-click="update"> Izmeni</button>
						</a>
                        </td>
                    </tr>
            </tbody>
        </table>
      </div></div>
`
		
});