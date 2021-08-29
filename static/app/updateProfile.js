Vue.component("update-profile", {
	name: "update-profile",
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
		role:localStorage.getItem('role'),
		user:localStorage.getItem('user')
     
		};
	},
	
    mounted: function(){
        this.usName = window.localStorage.getItem('username');
        axios.get('/account?userName='+this.usName)
		.then(response => {
            this.usPass = response.data.password;
            this.name = response.data.name;
            this.lastName = response.data.surname;
            this.date = response.data.birthDate;
			if(response.data.gender == "Male"){
				  this.gender = "Male";
            }else{
                this.gender = "Female";
            }
        });
       
		},
	methods: {
		update: function (e){
		 axios.post('/updateProfile?userName='+this.usName)
		.then(response => {
            this.usPass = response.data.password;
			this.name=response.data.name;
            this.lastName = response.data.surname;
            if(response.data.gender == "Male"){
                this.gender = "Male";
            }else{
                this.gender = "Female";
            }
            this.date = response.data.birthDate;

        });
		
	}
	},
	template: `<div>
	<div class="maliHeder">
		<a href="#/">
		<button style="font-size: 100%;">Odjavi se</button></a>
	</div>
	<div class="vertical-menu">
       <a href="#/buyerProfile" v-if="this.role==='kupac'" class="active">Moj profil</a>
 		<a href="#/buyerProfile" v-if="this.role==='administrator'" class="active">Moj profil</a>
        <a href="#/buyerProfile" v-if="this.role==='manager'" class="active">Moj profil</a>
       
        <a href="#/restaurants" v-if="this.role==='kupac'">Restorani</a>
		<a href="#/restaurants" v-if="this.role==='administrator'">Restorani</a>
		<a href="#/restaurants" v-if="this.role==='manager'">Restorani</a>
		
		<a href="#" v-if="this.role==='administrator'">Korisnici</a>
        <a href="#/orders" v-if="this.role==='kupac'">Porudžbine</a>
		<a href="#/orders" v-if="this.role==='manager'">Porudžbine</a>
        <a href="#/basket" v-if="this.role==='kupac'">Korpa</a>
		<a href="#" v-if="this.role==='manager'">Kupci</a>

        <a href="#" v-if="this.role==='kupac'">Utisci i komentari</a>
		<a href="#" v-if="this.role==='administrator'">Utisci i komentari</a>
		<a href="#" v-if="this.role==='manager'">Utisci i komentari</a>
     </div>
       <p class="naslov"><b>Izmenite podatke</b></p>
      <div class="tabela">
        <table>
                    
            <tbody>
                
                    <tr>
                        
                    </tr>
                    
                    <tr>
                        <td> Korisničko ime: </td>
                        <td> <input type="text" v-model="usName" /> </td>
                    </tr>
                    <tr>
                        <td> Lozinka: </td>
                        <td> <input type="password" v-model="usPass" /> </td>
                    </tr>
                    <tr>
                        <td> Ime: </td>
                        <td> <input type="text" v-model="name"/> </td>
                    </tr>
                    <tr>
                        <td> Prezime: </td>
                        <td> <input type="text" v-model="lastName"/> </td>
                    </tr>
                    <tr>
                        <td> Pol: </td>
                        <td> <input type="radio"  name="pol" value="Male" v-model="gender"/> <label>Muški</label> <input type="radio" name="pol" value="Female" v-model="gender"  /> <label> Ženski</label></td>
                    </tr>
                    <tr>
                        <td> Datum rođenja: </td>
                        <td> <input type="date" v-model="date" /> </td>
                    </tr>

                    <tr>
                        <td colspan="2" style="text-align: right;">
						<a href="#/buyerProfile">
                        	<button v-on:click="update">Sačuvaj</button>
						</a>
                      
                        </td>
                    </tr>
                
            </tbody>
        </table>
   
      </div>
</div>
`
		
});