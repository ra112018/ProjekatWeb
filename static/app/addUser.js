Vue.component("addUser", {
	name: "addUser",
	data: function(){
		return {
			userName:null,
			password: null,
			name: null,
			surname: null,
			gender: null,
			birthDate: null,
			role: localStorage.getItem('role'),
			showErrorMessage: false
	
		};
	},
	mounted: function(){
			
      
},
	methods: {
		
			cancel: function(){
				router.replace({path: `/success`})
			},
			
			addUser: function(e){
				e.preventDefault();
				this.errors = null;
				if(!this.name || !this.surname || !this.userName || !this.password || !this.birthDate || !this.role ||!this.gender){
					this.showErrorMessage = true;
					alert("Unesite sve podatke");
					e.preventDefault();
				}else{
					axios
					.post('/addUser', {userName: this.userName, 
										password: this.password, 
										name: this.name, 
										surname: this.surname, 
										gender: this.gender,
										birthDate: this.birthDate,		
										role: this.role}, {params:{role:this.role, userName: this.userName}})
						
					.then(function(response){
							
						if(JSON.parse(JSON.stringify(response.data))[0]==="exists"){
							alert("Korisnicko ime vec postoji");
				
						}
						else{
							alert("Dodat korisnik!")
							router.replace({ path: `/success`})
							
						}

					});
				}
			}
		},

	template: `<div>	
		<div class="maliHeder">
				<a href="#/">
				<button style="font-size: 100%;">Odjavi se</button></a>
		</div>
		
		<div class="vertical-menu">
			<a href="#/buyerProfile">Moj profil</a>
			<a href="#/restaurants">Restorani</a>
			<a href="#/userTableAdmin">Korisnici</a>
			<a href="#/addUser" class="active">Dodaj korisnika</a>
			<a href="#/suspiciousUsersTable">Pregled sumnjivih korisnika</a>
			<a href="#/allComments" >Utisci i komentari</a> 

		
		</div>
		
		<div class="tabela">
			<table>
			<tbody>
				<tr>
					<td><label>Ime:</label></td>
					<td><input type="text" placeholder="Unesite ime" required v-model="name"/></td>
				</tr>
				<tr>
					<td><label>Prezime:</label></td>
					<td><input type="text" placeholder="Unesite prezime" required v-model="surname"/></td>
				</tr>
				<tr>
					<td><label>Korisnicko ime:</label></td>
					<td><input type="text" placeholder="Unesite korisnicko ime" required v-model="userName"/></td>
				</tr>
				<tr>
					<td><label>Lozinka:</label></td>
					<td><input type="password" placeholder="Unesite lozinku" required v-model="password"/></td>
				</tr>
				<tr>
					<td><label>Pol:</label></td>
					<td>
					
						<input type="radio" v-model="gender" value="Male"/>
						<label>Muski</label>
						
						<input type="radio" v-model="gender" value="Female"/>
						<label>Zenski</label></td>
						
					
				</tr>
				<tr>
					<td><label>Datum rodjenja</label></td>
					<td><input type="date" v-model="birthDate"/></td>
					
				</tr>
				<tr>
					
					<td><label>Uloga:</label></td>
					<td><input type="radio" v-model="role" value="Manager"/>
					<label>Menadzer</label>
					
					<input type="radio" v-model="role" value="Deliverer"/>
					<label>Dostavljac</label></td>
				</tr>	
				
				<tr>
                        <td colspan="2" style="text-align: right;">
						
						
						
              			<button @click="cancel" type="button">Odustani</button>
         
          				<button @click="addUser">Dodaj korisnika</button>

                        </td>
                  </tr>
				
				</tbody>
			</table>
			</div>
		
         
		
	</div>
`
		
});