Vue.component("addArticle", {
	name: "addArticle",
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
			restaurantName:localStorage.getItem('restaurantName'),

			role:localStorage.getItem('role'),
			user:localStorage.getItem('user'),
			
		};
	},
	mounted: function (){
		    this.restaurantName = window.localStorage.getItem('restaurantName');
	},
	methods: {
		
    add: function (e) {
      e.preventDefault();
      this.errors = null;

        axios
        .post('/addArticle', {articleName:this.name, articleType:this.type,price:this.price,
					quantity:this.quantity,articlePhoto:this.image,
                    description : this.description, restaurantName:this.restaurantName
                    })
        .then(response =>{
                if(response.data){
                    alert("Artikal uspešno kreiran.")
                }
                else{
                    alert("U bazi postoji artikal sa istim imenom")
                }
            })
    
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
 		<a href="#/buyerProfile" v-if="this.role==='manager'">Moj profil</a>
       	<a href="#/restaurants" v-if="this.role==='manager'">Restorani</a>
		<a href="#/myRestaurants" v-if="this.role==='manager'" class="active">Moji restorani</a>
		<a href="#/userTableAdmin" v-if="this.role==='manager'">Porudžbine</a>

		<a href="#" v-if="this.role==='manager'">Utisci i komentari</a>
 
	</div>
       
    <p class="naslov"><b>Dodaj artikal</b></p>
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
								<option value="Food">Hrana</option>
								  <option value="Drink">Piće</option>
  								</select></td>
                            </tr>
                              <tr>
                                <td> Cena: </td>
                                <td> <input type="text" required v-model="price" /> </td>
                            </tr>
                            <tr>
                                <td> Količina: </td>
                                <td> <input type="text" required v-model="quantity" pattern="[0-9]+"/></td>
                            </tr>
						 <tr>
                                <td> Opis: </td>
                                <td> <input type="text" required v-model="description" /></td>
                            </tr>
						 <tr><td>Slika: </td>
             				 <td><input type="file" v-on:change="addLogo" > </td>
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