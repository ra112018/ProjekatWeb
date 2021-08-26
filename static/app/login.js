Vue.component("login", {
	name: "login",
	data: function(){
		return {
			userName: null,
			password: null
		};
	},
	methods: {
		login(e){
			axios
				.post('/login',{},{params:{username: this.userName, password:this.passWord}})
				.then(function(response){
					if(JSON.parse(JSON.stringify(response.data))[0]===" "){
						alert("Pogresan unos korisnickog imena ili lozinke");
					}else{
						localStorage.setItem("name", JSON.parse(JSON.stringify(response.data))[0]);
						localStorage.setItem("role", JSON.parse(JSON.stringify(response.data))[1]);
					}
				})
		}
	},
	template: `<div>
	<p class="naslov"><b>Prijavite se na svoj nalog</b></p>
	<p class="napomena"> *Sva polja su obavezna</p>
       
		<form>
                <table>
                    
                    <tbody>
                    
                            <tr>
                                
                            </tr>
                            
                            <tr>
                                <td> Korisničko ime: </td>
                                <td> <input type="text" required /> </td>
                            </tr>
                            <tr>
                                <td> Lozinka: </td>
                                <td> <input type="password" required/> </td>
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