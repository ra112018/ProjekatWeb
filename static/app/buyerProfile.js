Vue.component("buyer-profile", {
	name: "buyer-profile",
	data: function(){
		return {
			
		gray: true,
        usPass:null,
        name: null,
        lastName:null,
        birthDate:null,
        gender:null,
        showErrorMessage: false,
        usName: null,
		role:localStorage.getItem('role'),
		user:localStorage.getItem('user'),
        backup: {}
	
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
            this.birthDate = response.data.birthDate;
			this.user=response.data.us;
			
			
        });
},
	methods: {
		edit:function(){
            this.gray = false;
			this.backup.password = this.usPass;
            this.backup.name = this.name;
            this.backup.surname = this.lastName;
            this.backup.gender = this.gender;
			this.backup.birthDate = this.birthDate;
        },
		cancel:function(){
            this.gray = true;
			this.usPass = this.backup.password;
            this.name = this.backup.name;
            this.lastName = this.backup.surname;
            this.gender = this.backup.gender;
			this.birthDate = this.backup.birthDate;

			router.replace({ path: `/success` })
        },

		 save:function(e){
			e.preventDefault();
       
                axios
                .post('/updateProfile',{name: this.name, 
                    surname: this.lastName,
                    userName : this.email,
                    password: this.usPass,
                    gender : this.gender,
					birthDate: this.birthDate,
                    
                    }, {params:{userName:this.usName}})
                .then((response) => {
                  alert("Uspesno izmenjeni podaci! ");
                  this.backup = {};
                })
                .catch((err) => {
                  console.log(err);
                });
             

        
		},
		

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
        <a href="#/buyerProfile" v-if="this.role==='deliverer'" class="active">Moj profil</a>
       
        <a href="#/restaurants" v-if="this.role==='kupac'">Restorani</a>
		<a href="#/restaurants" v-if="this.role==='administrator'">Restorani</a>
		<a href="#/restaurants" v-if="this.role==='manager'">Restorani</a>
		
		<a href="#/myRestaurants" v-if="this.role==='manager'" >Moji restorani</a>
		
		<a href="#/userTableAdmin" v-if="this.role==='administrator'">Korisnici</a>
		<a href="#/addUser" v-if="this.role==='administrator'">Dodaj korisnika</a>
		<a href="#/suspiciousUsersTable" v-if="this.role==='administrator'">Pregled sumnjivih korisnika</a>
		
        <a href="#/orders" v-if="this.role==='kupac'">Porudžbine</a>
		<a href="#/orders" v-if="this.role==='manager'">Porudžbine</a>
		
		
        <a href="#/basket" v-if="this.role==='kupac'">Korpa</a>
		<a href="#" v-if="this.role==='manager'">Kupci</a>

        <a href="#" v-if="this.role==='kupac'">Utisci i komentari</a>
		<a href="#" v-if="this.role==='administrator'">Utisci i komentari</a>
		<a href="#/comments" v-if="this.role==='manager'">Utisci i komentari</a>

     </div>
      <p class="naslov"><b>Vaši podaci</b></p>
	 
      <div class="tabela">
        <table>
            <tbody>
                	<tr> </tr>
                    <tr>
                        <td> Korisničko ime: </td>
                        <td> <input type="text" v-model="usName" disabled/> </td>
                    </tr>
                    <tr>
                        <td> Lozinka: </td>
                        <td> <input type="password" v-model="usPass" v-bind:disabled="gray"/> </td>
                    </tr>
                    <tr>
                        <td> Ime: </td>
                        <td> <input type="text" v-model="name" v-bind:disabled="gray"/> </td>
                    </tr>
                    <tr>
                        <td> Prezime: </td>
                        <td> <input type="text" v-model="lastName" v-bind:disabled="gray"/> </td>
                    </tr>
                    <tr>
                        <td> Pol: </td>
                        <td> <input type="radio" value="Male" v-model="gender" v-bind:disabled="gray"/> <label>Muški</label> <input type="radio" value="Female" name="pol" v-model="gender" v-bind:disabled="gray"/> <label> Ženski</label></td>
                    </tr>
                    <tr>
                        <td> Datum rođenja: </td>
                        <td> <input type="date" v-model="birthDate" v-bind:disabled="gray"/> </td>
                    </tr>

                    <tr>
                        <td colspan="2" style="text-align: right;">
						
						
						<button @click="edit" type="button">Izmeni</button>
              			<button @click="cancel" type="button">Odustani</button>
         
          				<button @click="save">Sacuvaj</button>

                        </td>
                    </tr>
            	</tbody>
        	</table>
      	</div>
	</div>
`
		
});