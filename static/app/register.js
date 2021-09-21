Vue.component("register", {
	name: "register",
	data: function(){
		return {
			name:null,
			lastName: null,
			usName: null,
			usPass: null,
			birthDate: null,
			gender: null,
			role: null
		};
	},
	methods: {
		
    registration: function (e) {
      e.preventDefault();
      this.errors = null;
			if(!this.name || !this.lastName || !this.usName || !this.usPass || !this.birthDate 
					|| !this.gender){
				this.showErrorMessage = true;
				alert("Morate uneti sve podatke.")
				e.preventDefault();
			}else{
        axios
        .post('/register', {name: this.name, 
                    surname: this.lastName,
                    userName : this.usName,
                    password: this.usPass,
                    gender : this.gender,
                    birthDate : this.birthDate
                    })
        .then(function(response){	
				if(JSON.parse(JSON.stringify(response.data))[0] === "exists"){
					alert("Korisnicko ime vec postoji!");
				}else{
					alert("Uspešna registracija!");
					localStorage.setItem('usName', JSON.parse(JSON.stringify(response.data))[0]);
					localStorage.setItem('role', JSON.parse(JSON.stringify(response.data))[1]);
					router.replace({ path: `/#` })
				}
				
      })  
    }
}
	},
	template: `<div>
       
    <p class="naslov"><b>Registrujte se</b></p>
    <p class="napomena"> *Sva polja su obavezna</p>
        
 		<form @submit="registration"  class="registracija">
				<table>
                    
                    <tbody>
                        
                            <tr>
                                
                            </tr>
                            
                            <tr>
                                <td> Korisničko ime: </td>
                                <td> <input type="text" required v-model="usName" /> </td>
                            </tr>
                            <tr>
                                <td> Lozinka: </td>
                                <td> <input type="password" required  v-model="usPass"/> </td>
                            </tr>
                            <tr>
                                <td> Ime: </td>
                                <td> <input type="text" required v-model="name" pattern="[A-ZŠĐČĆŽ]{1}[A-Za-zšđčćž]+"/> </td>
                            </tr>
                            <tr>
                                <td> Prezime: </td>
                                <td> <input type="text" required v-model="lastName" pattern="[A-ZŠĐČĆŽ]{1}[A-Za-zšđčćž]+"/> </td>
                            </tr>
                            <tr>
                                <td> Pol: </td>
                                <td> <input type="radio" required v-model="gender" name="pol" value="Muški"/> <label>Muški</label> <input type="radio" required v-model="gender" name="pol" value="Ženski" /> <label> Ženski</label></td>
                            </tr>
                            <tr>
                                <td> Datum rođenja: </td>
                                <td> <input type="date" required v-model="birthDate" /> </td>
                            </tr>

                            <tr>
                                <td colspan="2" style="text-align: right;">
                                <input type="submit" value="Registruj se" style="font-size: medium; margin-top: 2%;"/>
                                </td>
                            </tr>
                        
                    </tbody>
                </table>
            </form>
		</div>`
		
});