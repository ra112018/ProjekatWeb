Vue.component("addRestaurant", {
	name: "addRestaurant",
	data: function(){
		return {
			
		};
	},
	methods: {
		
    add: function (e) {
      e.preventDefault();
      this.errors = null;
			if(!this.name || !this.type || !this.location || !this.logo || !this.manager ){
				this.showErrorMessage = true;
				alert("Morate uneti sve podatke.")
				e.preventDefault();
			}else{
        axios
        .post('/addRestaurant', {restaurantName: this.name, 
                    restaurantType: this.type,
                    location : this.location,
                    logo: this.logo,
                    manager : this.manager,
                    })
        .then(function(response){	alert("Uspešno dodat restoran!");
				router.replace({ path: `/restaurants` })
      })  
    }
}
	},
	template: `<div>
       
    <p class="naslov"><b>Dodaj restoran</b></p>
    <p class="napomena"> *Sva polja su obavezna</p>
        
 		<form @submit="add"  class="registracija">
				<table>
                    
                    <tbody>
                        
                            <tr>
                                
                            </tr>
                            
                            <tr>
                                <td> Naziv: </td>
                                <td> <input type="text" required v-model="name" /> </td>
                            </tr>
                            <tr>
                                <td> Tip: </td>
                                <td> <input type="text" required  v-model="type"/> </td>
                            </tr>
                            <tr>
                                <td> Lokacija: </td>
                                <td> <input type="text" required v-model="location" /> </td>
                            </tr>
                            <tr>
                                <td> Logo: </td>
                                <td> <input type="text" required v-model="logo" /> </td>
                            </tr>
                            <tr>
                                <td> Menadžer: </td>
                                <td> <input type="text" required v-model="manager" /></td>
                            </tr>

                            <tr>
                                <td colspan="2" style="text-align: right;">
                                <input type="submit" value="Dodaj novog" style="font-size: medium; margin-top: 2%;"/>
                                </td>
                            </tr>
                        
                    </tbody>
                </table>
            </form>
		</div>`
		
});