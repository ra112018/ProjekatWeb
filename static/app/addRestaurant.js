Vue.component("addRestaurant", {
	name: "addRestaurant",
	data: function(){
		return {
			name:"",
			type:"",
			location:"",
			logo:"",
			manager:""
			
		};
	},
	methods: {
		
    add: function (e) {
      e.preventDefault();
      this.errors = null;
			if(!this.name || !this.type || !this.city || !this.logo || !this.manager ){
				this.showErrorMessage = true;
				alert("Morate uneti sve podatke.")
				e.preventDefault();
			}else{
        axios
        .post('/addRestaurant', {restaurantName: this.name, 
                    restaurantType: this.type,
                    city : this.city,
                    address : this.address,
                    logo: this.logo,
                    managerName : this.manager,
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
                                <td> Tip: </td><td> <select id="type" name="type" required v-model="type">
								<option value="brza">Brza hrana</option>
								  <option value="giros">Giros</option>
								  <option value="kineska">Kineska hrana</option>
								  <option value="kuvana">Kuvana jela</option>
								  <option value="palačinke">Palačinke</option>
								  <option value="pizza">Pizza</option>
								  <option value="poslasticarnica">Poslastičarnica</option>
								  <option value="susi">Suši</option>
  								</select></td>
                            </tr>
                            <tr>
                                <td> Grad: </td>
                                <td> <input type="text" required v-model="city" /> </td>
                            </tr>                            <tr>
                                <td> Adresa: </td>
                                <td> <input type="text" required v-model="address" /> </td>
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