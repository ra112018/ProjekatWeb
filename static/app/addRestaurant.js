Vue.component("addRestaurant", {
	name: "addRestaurant",
	data: function(){
		return {
			name:"",
			address:"",
			logo:"",
			locations:null,
			city:null,
			managerName:null,
			type:"",
			showLogo:null,
			image:null,
			
			role:localStorage.getItem('role'),
			user:localStorage.getItem('user'),
			
		};
	},
	methods: {
		
    add: function (e) {
      e.preventDefault();
      this.errors = null;
			if(!this.name || !this.type || !this.address  || !this.managerName ){
				this.showErrorMessage = true;
				alert("Morate uneti sve podatke.")
				e.preventDefault();
			}else{
				this.locations={};
            this.locations.locationAddress = this.address;


			

        axios
        .post('/addRestaurant', {restaurantName: this.name, restaurantType:this.type,location:this.locations,
					logo:this.image,
                    managerName : this.managerName,
                    })
        .then(response =>{
                if(response.data){
                    alert("Restoran uspešno kreiran.")
                }
                else{
                    alert("Menadžer ne postoji u bazi, dodajte drugog menadžera.")
                }
            })
    }
	}, 
		addLogo: function(event){
            const file = event.target.files[0];
            this.createImage(file);
            this.showLogo = (URL.createObjectURL(file));
        },
		createImage(file){
            const reader= new FileReader();
 
            reader.onload = (e) =>{
                this.image = (e.target.result);
            }
            reader.readAsDataURL(file);
        },
	},
	template: `<div>
		<div class="maliHeder">
		<a href="#/">
		<button style="font-size: 100%;">Odjavi se</button></a>
	</div>
	<div class="vertical-menu">
 		<a href="#/buyerProfile" v-if="this.role==='administrator'">Moj profil</a>
       		<a href="#/restaurants" v-if="this.role==='administrator'" class="active">Restorani</a>
		
		<a href="#/userTableAdmin" v-if="this.role==='administrator'">Korisnici</a>
		<a href="#/addUser" v-if="this.role==='administrator'">Dodaj korisnika</a>

		<a href="#" v-if="this.role==='administrator'">Utisci i komentari</a>
 
	</div>
       
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
                                <td> Tip: </td><td> <select id="type"  required v-model="type">
								<option value="Italian">Italijanska hrana</option>
								  <option value="Chinese">Kineska hrana</option>
								  <option value="Barbecue">Roštilj</option>
  								</select></td>
                            </tr>
                              <tr>
                                <td> Adresa: </td>
                                <td> <input type="text" required v-model="address" /> </td>
                            </tr>
                            <tr><td>Logo</td>
             				 <td><input type="file" v-on:change="addLogo" > </td>
                            </tr>
                            <tr>
                                <td> Menadžer: </td>
                                <td> <input type="text" required v-model="managerName" /></td>
                            </tr>

                            <tr>
                                <td colspan="2" style="text-align: right;">
                                <input type="submit" value="Dodaj" style="font-size: medium; margin-top: 2%;"/>
                                </td>
                            </tr>
                        
                    </tbody>
                </table>
            </form>
		</div>`
		
});