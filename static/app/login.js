Vue.component("login", {
	name: "login",
	data: function(){
		return {
			usName: null,
			usPass: null,
			showErrorMessage: false,

		};
	},
	methods: {
		login: function (e){ 
    	  e.preventDefault();
     		 this.errors = null;
			axios
				.post('/login',{},{params:{userName: this.usName, password:this.usPass}})
				.then(function(response){
					if(JSON.parse(JSON.stringify(response.data))[0]===" "){
						alert("Pogresan unos korisnickog imena ili lozinke");
					}else if(JSON.parse(JSON.stringify(response.data))[0]==="blocked"){
						alert("Korisnik je blokiran");
					}
					else if(JSON.parse(JSON.stringify(response.data))[0]==="deleted"){
						alert("Korisnik je obrisan");
					}else{
						localStorage.setItem("username", JSON.parse(JSON.stringify(response.data))[0]);
						localStorage.setItem("role", JSON.parse(JSON.stringify(response.data))[1]);
						localStorage.setItem("user", JSON.parse(JSON.stringify(response.data)));

						router.replace({ path: `/success` })
						
					}
				})
		}
	},
	template: `<div>
	<p class="naslov"><b>Prijavite se na svoj nalog</b></p>
	<p class="napomena"> *Sva polja su obavezna</p>
       
		<form @submit="login" class="prijava">
                <table>
                    
                    <tbody>
                    
                            <tr>
                                
                            </tr>
                            
                            <tr>
                                <td> Korisničko ime: </td>
                                <td> <input type="text" placeholder="Unesite korisničko ime" required v-model="usName"/> </td>
                            </tr>
                            <tr>
                                <td> Lozinka: </td>
                                <td> <input type="password" placeholder="Unesite lozinku" required v-model="usPass"/> </td>
                            </tr>

                            <tr>
                                <td colspan="2" style="text-align: right;">
                                <input type="submit" value="Prijavi se"/>
                                </td>
                            </tr>
                        
                    </tbody>
                </table>
            </form></div> `
		
});