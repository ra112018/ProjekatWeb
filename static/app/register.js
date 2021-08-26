Vue.component("register", {
	name: "register",
	data: function(){
		return {
			
		};
	},
	methods: {
		
	},
	template: `<div>
       
    <p class="naslov"><b>Registrujte se</b></p>
    <p class="napomena"> *Sva polja su obavezna</p>
        
 		<form class="registracija">
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
                                <td> <input type="text" required pattern="[A-ZŠĐČĆŽ]{1}[A-Za-zšđčćž]+"/> </td>
                            </tr>
                            <tr>
                                <td> Prezime: </td>
                                <td> <input type="text" required pattern="[A-ZŠĐČĆŽ]{1}[A-Za-zšđčćž]+"/> </td>
                            </tr>
                            <tr>
                                <td> Pol: </td>
                                <td> <input type="radio" required name="pol" value="Muški"/> <label>Muški</label> <input type="radio" required name="pol" value="Ženski" /> <label> Ženski</label></td>
                            </tr>
                            <tr>
                                <td> Datum rođenja: </td>
                                <td> <input type="date" required /> </td>
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