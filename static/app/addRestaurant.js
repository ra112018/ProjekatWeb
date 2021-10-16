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
			
            geografskaDuzina: null,
            geografskaSirina: null,
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
                    alert("Menadžer ne postoji u bazi ili već ima restoran.")
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
	mounted : function() {
		map = new ol.Map({
            target: 'map',
            layers: [
              new ol.layer.Tile({
                source: new ol.source.OSM()
              })
            ],
            view: new ol.View({
              center: ol.proj.fromLonLat([19.83,45.26]),
              zoom: 13
            })
          });
        vm=this;
        map.on('singleclick', function (evt) {
            
            coordinate = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
            vm.geografskaDuzina = coordinate[0];
            vm.geografskaSirina = coordinate[1];
        });
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
								  <option value="Pancakes">Palačinke</option>

  								</select></td>
                            </tr>
                              <tr>
                                <td> Adresa: </td>
                                <td> <input type="text" required v-model="address" /> </td>
                            </tr>
							<tr><td>Geografska duzina:</td><td><input type="text" v-model="geografskaDuzina"/></td></tr>
							<tr><td>Geografska sirina:</td><td><input type="text" v-model="geografskaSirina"/></td></tr>

                            <tr><td>Logo</td>
             				 <td><input type="file" v-on:change="addLogo" > </td>
                            </tr>
                            <tr>
                                <td> Menadžer: </td>
                                <td> <input type="text" required v-model="managerName" /></td>
                            </tr>

                            <tr>
                                <td colspan="2" style="text-align: right;">
                                <input type="submit" value="Dodaj" style="width: 25%; margin-top: 2%;"/>
                                </td>
                            </tr>
                        
                    </tbody>
                </table>
				
              	<div class="map" style="width:50%;height:420px;" id="map">
        		</div>
            </form>
		</div>`
		
});