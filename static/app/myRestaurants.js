Vue.component("myRestaurants", {
	name:"myRestaurants",
	data: function () {
		    return {
			restaurantList: [],
			username:"",
      	   role:localStorage.getItem('role'),
		   user:localStorage.getItem('user'),
			restaurantName:"",
			restaurant:null,
			articles:null,
			comments:null,
			editingType:false,
			editingStatus:false,
			showLogo:null,
			image:null,
			editingLocation:false,
			inputLocation:false,
			changingArticle:false,
			 geografskaDuzina: null,
            geografskaSirina: null,
			city:null,
			postcode:null,
			idLocation:null,
			street:null,
			houseNumber:null,
			location:null
	    }
	},
	methods:{
		newArticle(event){
		    router.push({ path: `/addArticle` })

		},
		addLocation:function(value){
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
			vm.inputLocation=true;
			
				fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + coordinate[0] + '&lat=' + coordinate[1])
		.then(response => { 
            return response.json().then((data) => {
	            var nesto = data;
				var drugo=nesto.address;
				var kucnibr=drugo.house_number;
				vm.houseNumber=kucnibr;
				var ulica=drugo.road;
				vm.street=ulica;
				var gradic=drugo.city;
				vm.city=gradic;
				var postanskibr=drugo.postcode;
				vm.postcode=postanskibr;
				vm.idLocation=nesto.place_id;
				console.log(nesto);
                return data;
            });
});
			});
			this.editingLocation=true;
			
			
			
		},
		edit:function(value){
			
			axios.post('/editArticle',{articleName:value,quantity:this.tempValueKolicina, description:this.tempValueOpis,price:this.tempValueCena})
			.then(response=>{
          		alert("Uspešno izmenjen artikal");

            });
		},
		changeStatus:function(){
			axios.post('/changeStatus',{rName: this.restaurant.restaurantName,status:this.tempValueStatus}, {params: {rName: this.restaurant.restaurantName,status:this.tempValueStatus}})
        .then(response =>{
          		alert("Uspešno promenjen status restorana");

            });
		},
		changeType:function(){
			axios.post('/changeType', {rName: this.restaurant.restaurantName,type:this.tempValueType},{params:{rName:  this.restaurant.restaurantName,type:this.tempValueType}})
        .then(response =>{
          		alert("Uspešno promenjen tip restorana");

            });
		},
		saveAddress:function(){
			axios
        .post('/addLocation', {idLocation: this.idLocation, postcode:this.postcode,city:this.city,
					longitude:this.geografskaDuzina,latitude:this.geografskaSirina,street:this.street,
                    houseNumber : this.houseNumber
                    })
        .then(response =>{
                
            });
			axios.post('/addLocationToRestaurant', {restaurantName:this.restaurant.restaurantName,locationId:this.idLocation},{params:{restaurantName: this.restaurant.restaurantName,locationId:this.idLocation}})
						
					.then(function(response){
						alert("Lokacija dodata");
					  // this.refreshPage();
					});
		},
		findArticles: function(id){
				axios.get('/articles?id='+id).then(response => {
				this.articles=response.data;
			});
		},
		findLocation:function(id){
			axios.get('/location?id='+id).then(response => {
				this.location=response.data;
				this.city=location.city;
				this.street=location.street;
				if(location.houseNumber){
				this.houseNumber=location.houseNumber;
				}
				this.postCode=location.postcode;
				this.geografskaDuzina=location.longitude;
				this.geografskaSirina=location.latitude;
			});
		},
		approve:function(id){
			axios
					.post('/approveComment', {idComment:id
                    },{params:{idComment:id}})
						
					.then(function(response){
						alert("Komentar odobren")
					  // this.refreshPage();
					});
		},
		decline:function(id){
			axios
					.post('/declineComment', {idComment:id
                    },{params:{idComment:id}})
						
					.then(function(response){
						alert("Komentar odbijen")
					  // this.refreshPage();
					});
		},
		changeImage:function(event){
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
		differentimg:function(){
			alert(this.image);
			axios.post('/changeRestaurantImg', {restaurantName: this.restaurant.restaurantName, logo:this.image,
                    })
        .then(response =>{
                if(response.data){
                    alert("Uspešno promenjena slika.")
                }
                else{
                    alert("Došlo je do greške.")
                }
            })
		},
		
		
	enableEditingType: function(value){
      this.tempValueType = value;
      this.editingType = true;
    },
	disableEditingType: function(){
      this.tempValueType = null;
      this.editingType = false;
    },
	enableEditingStatus: function(value){
      this.tempValueStatus = value;
      this.editingStatus = true;
    },
	disableEditingStatus: function(){
      this.tempValueStatus = null;
      this.editingStatus = false;
    },
	enableEditingLocation: function(value){
      this.tempValueLocation = value;
      this.editingLocation = true;
    },
	disableEditingLocation: function(){
      this.editingLocation = false;
    },
	changeArticle:function(value){
		this.changingArticle=true;
		this.tempValueOpis=value.description;
		this.tempValueKolicina=value.quantity;
		this.tempValueCena=value.price;
		this.tempValueArtikal=value.articleName;
	},
	disableEditingArticle: function(){
      this.changingArticle = false;
    },
	},
	mounted: function(){
              this.username = window.localStorage.getItem('username');

              this.role = window.localStorage.getItem('role');
			  this.user=window.localStorage.getItem('user');
			axios.get('/findMyRestaurant',{params:{userName: this.username}})
				.then(response => {
		           
		            this.restaurant=response.data;
		         	localStorage.setItem("restaurantName", this.restaurant.restaurantName);
					this.findLocation(this.restaurant.locationId);

		        });
			this.findArticles(window.localStorage.getItem('restaurantName'));
			
			axios.get('/comments',{params:{restaurantName: window.localStorage.getItem('restaurantName')}}).then(response => {
				this.comments=response.data;
				});
	},
	

	template: ` <div>
	<div>
		<div class="maliHeder">
		<a href="#/">
		<button style="font-size: 100%;">Odjavi se</button></a>
	</div>
	<div class="vertical-menu">
        <a href="#/buyerProfile" v-if="this.role==='manager'">Moj profil</a>
       
		<a href="#/restaurants" v-if="this.role==='manager'" >Restorani</a>
		
		<a href="#/myRestaurants" v-if="this.role==='manager'" class="active" >Moj restoran</a>
			
		<a href="#/orders" v-if="this.role==='manager'">Porudžbine</a>

		<a href="#/comments" v-if="this.role==='manager'">Utisci i komentari</a>
 
	</div>

	<div class="grid">
			
		
		<div class="restoran"> <button class="buttonforimg">
		<img class="logoMyRestaurants" v-if="!this.image" :src="restaurant.logo"  />
		<img class="logoMyRestaurants" v-if="this.image" :src="this.image"  />

  <label for="files" class="buttonChangeImage">Promeni sliku</label><input type="file" id="files" v-on:change="changeImage" class="linkinimg"></button>

		<span class="opis1">
			<br><em><strong>{{restaurant.restaurantName}}
			
			</strong></em><br><div v-if="!editingType" @click="enableEditingType(restaurant.restaurantType)">{{restaurant.restaurantType}} </div>
			 <div v-if="editingType"> <select v-model="tempValueType">
								<option value="Italian">Italijanska hrana</option>
								  <option value="Chinese">Kineska hrana</option>
								  <option value="Barbecue">Roštilj</option>
								  <option value="Pancakes">Palačinke</option>
  								</select></div><br>
			<p class="open"><div v-if="!editingStatus" @click="enableEditingStatus(restaurant.status)">{{restaurant.status}}</div></p>
			<div v-if="editingStatus"> <select v-model="tempValueStatus"><option value="Open">Otvoreno</option>
			<option value="Closed">Zatvoreno</option></select></div><br>
			<button v-if="!restaurant.locationId" v-on:click="addLocation(restaurant.restaurantName)" >Dodaj lokaciju</button>
			<div v-if="location"  @click="enableEditingLocation(location)" @click="addLocation(restaurant.restaurantName)">{{location.street}} {{location.houseNumber}} ,{{location.city}} {{location.postCode}}<br>{{location.longitude}} ,{{location.latitude}}</div>
			<button class="addButton" @click="newArticle" :id="restaurant.restaurantName"> Dodaj artikal </button>
		</span>
		<span class="opis1"><br  v-if="!editingLocation"><br  v-if="!editingLocation"><button v-if="editingType" v-on:click="changeType" >Sačuvaj</button>
		<button v-if="editingType" @click="disableEditingType">Otkaži</button>
			<br v-if="!editingLocation"><br v-if="!editingLocation"><br v-if="!editingLocation">
			<button  v-if="editingStatus" v-on:click="changeStatus" >Sačuvaj</button><button  v-if="editingStatus" @click="disableEditingStatus">Otkaži</button>
			<div v-if="editingLocation && !editingType && !editingStatus" class="mapica" style="width:220%;height:120%;" id="map"/>
			<button v-if="editingLocation" @click="disableEditingLocation" class="sakrijMapicu">Otkaži</button>
			<button v-if="inputLocation" class="sakrijMapicu" v-on:click="saveAddress">Sačuvaj</button>
        	
		</span>
		
		<br></div></div>
				<button v-if="this.image" v-on:click="differentimg">Dodaj sliku</button><br><br>

		<table v-if="editingLocation" class="tabelaEditLocation">
		<tr><td>Grad:</td><td><input type="text" v-model="city"/></td></tr>
							<tr><td>Poštanski broj:</td><td><input type="text" v-model="postcode"/></td></tr>
							<tr><td>Ulica:</td><td><input type="text" v-model="street"/></td></tr><tr>
								<td>Broj:</td><td><input type="text" v-model="houseNumber"/></td>
							</tr>

							<tr><td>Geografska duzina:</td><td><input type="text" v-model="geografskaDuzina"/></td></tr>
							<tr><td>Geografska sirina:</td><td><input type="text" v-model="geografskaSirina"/></td></tr>
	</table>
	
	<div v-if="changingArticle" class="izmenaartikla"><p class="labela1" >Naziv artikla: <input class="inputkol" v-model="tempValueArtikal" readonly></p><p class="labela1">Opis: </p><textarea class="inputOpis" v-model="tempValueOpis"/>
			<p class="labela1">Količina: <input class="inputkol" v-model="tempValueKolicina"></p><p class="labela1">Cena: <input class="inputkol" v-model="tempValueCena"></p>
			<button v-on:click="edit(tempValueArtikal)">Sačuvaj</button> <button @click="disableEditingArticle">Otkaži</button></div>
	<div class="restoran" v-for="article in articles">
	
		<img class="articlePicture" :src="article.articlePhoto">&nbsp;
		<p>{{article.articleName}}</p><br>&#8943;&#8943;
		<p>{{article.description}}</p><br>&#8943;&#8943;
		<p>Količina: {{article.quantity}}</p><br>&#8943;&#8943;
		<p>{{article.price}} din</p>&nbsp;&nbsp;<div v-if="role==='manager'" class="dugmezaizmenu"><button v-on:click="changeArticle(article)"> Izmeni artikal</button></div>
	</div>
	<div v-if="role==='manager'"><p>Komentari</p>
		<table>
			<th>Kupac</th>
			<th>Komentar</th>
			<th>Ocena</th>
			<th>Status komentara</th>
			<tr v-for="comment in comments">
				<td>{{comment.customerOfOrder}}</td>
				<td>{{comment.text}}</td>
				<td>{{comment.mark}}</td>
				<td>{{comment.approved}}</td>
				<td v-if="comment.approved==='WaitingForApproval'"><button v-on:click="approve(comment.idComment)">Odobri komentar</button></td>
				<td v-if="comment.approved==='WaitingForApproval'"><button v-on:click="decline(request.idComment)">Odbij komentar</button></td>

			</tr>
		</table>
	</div>
	</div>
	</div>
	</div>
	
`,
});	
