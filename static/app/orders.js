Vue.component("orders", {
	name: "orders",
	data: function(){
		return {
			role:localStorage.getItem('role'),
		    user:localStorage.getItem('user'),
		    username:localStorage.getItem('username'),

			sortingType:"",
			sortingCriterion:"",
			searchingName:"",
			searchingPriceFrom:"",
			searchingPriceTo:"",
			dateOfOrderFrom:"",
			dateOfOrderTo:"",
			restaurantType:null,
			restaurantName:"",
			orders:[],
			ordersNew:[],
			ordersFilter:[],
			requests:[],
			orderStatus:null

		};
	},
	methods: {
		refreshPage(){
			this.orders = [];

             axios.get('/OrdersFromMyRestaurant',{params:{userName: this.username}})
				.then(response => {
		            for(var i =0;i< response.data.length;i++){
		                var order = {};
		                order = response.data[i]
		                this.orders.push(order);
		            }
		        });
		if(this.role=="manager"){
			axios.get('/requestsForMyRestaurant',{params:{userName: this.username}})
				.then(response => {
		            for(var i =0;i< response.data.length;i++){
		                var request = {};
		                request.idOrder = response.data[i].idOrder;
		                request.idRequest = response.data[i].idRequest;
		                request.deliverer = response.data[i].deliverer;

		                this.requests.push(request);
		            }
		        });
		}
		},
		
		
			filterByRestType(){
				this.ordersNew = this.orders;
				this.orders = [];
				for(var i=0; i<this.ordersNew.length; i++) {
				console.log(this.ordersNew[i])
				if(this.restaurantType!="" && this.restaurantType===this.ordersNew[i].restaurantType ){
						this.orders.push(this.ordersNew[i]);
					}
					}
			},
			filterByStatus(){
				this.ordersNew = this.orders;
				this.orders = [];
				for(var i=0; i<this.ordersNew.length; i++) {
				
				if(this.orderStatus!="" && this.orderStatus===this.ordersNew[i].orderStatus ){
						this.orders.push(this.ordersNew[i]);
					}
					}
			},
			searchRestName(){
				
			this.ordersNew = this.orders;
			this.orders = [];
			for(var i=0; i<this.ordersNew.length; i++) {
				
				if(this.searchingName!="" && (this.ordersNew[i].restaurantName).includes(this.searchingName) ){
						this.orders.push(this.ordersNew[i]);
					}
					}
			},
			searchPriceFrom(){
				
			this.ordersNew = this.orders;
			this.orders = [];
			for(var i=0; i<this.ordersNew.length; i++) {
				if(this.searchingPriceFrom!="" && this.ordersNew[i].price >= this.searchingPriceFrom){
						this.orders.push(this.ordersNew[i]);
					}
					}
			},
			searchPriceTo(){
			this.ordersNew = this.orders;
			this.orders = [];
			for(var i=0; i<this.ordersNew.length; i++) {
				if(this.searchingPriceTo!="" && this.ordersNew[i].price <= this.searchingPriceTo){
						this.orders.push(this.ordersNew[i]);
					}
					}
			},
			checkName: function(a,b){
			let first, second;
			if(this.sortingCriterion == "naziv"){
				first = a.restaurantName;
				second = b.restaurantName;
			}
			if(first < second){
				if(this.sortingType == 'rastuce'){
					return -1;
				}else{
					return 1;
				}
			}else if(first > second){
				if(this.sortingType == 'rastuce'){
					return 1;
				}else{
					return -1;
				}
			}else{
				return 0;
			}
			
		},
		checkDate: function(a,b){
			let first, second;
			if(this.sortingCriterion == "date"){
				const partOfDatea = (a.timeOfOrder).split(" ")[0].split("/");
				var realDatea = partOfDatea[2]+"-"+partOfDatea[1]+"-"+partOfDatea[0];
				const partOfDateb = (b.timeOfOrder).split(" ")[0].split("/");
				var realDateb = partOfDateb[2]+"-"+partOfDateb[1]+"-"+partOfDateb[0];
				first = Date.parse(realDatea);
				second = Date.parse(realDateb);
			}
			if(first < second){
				if(this.sortingType == 'rastuce'){
					return -1;
				}else{
					return 1;
				}
			}else if(first > second){
				if(this.sortingType == 'rastuce'){
					return 1;
				}else{
					return -1;
				}
			}else{
				return 0;
			}
			
		},
		checkPrice: function(a,b){
			let first, second;
			if(this.sortingCriterion == "price"){
				first = a.price;
				second = b.price;
			}
			if(first < second){
				if(this.sortingType == 'rastuce'){
					return -1;
				}else{
					return 1;
				}
			}else if(first > second){
				if(this.sortingType == 'rastuce'){
					return 1;
				}else{
					return -1;
				}
			}else{
				return 0;
			}
			
		},
			
			searchDateFrom(){
				
				this.ordersNew = this.orders;
				this.orders = [];
				for(var i=0; i<this.ordersNew.length; i++) {
				const partOfDate = (this.ordersNew[i].timeOfOrder).split(" ")[0].split("/");
				var realDate = partOfDate[2]+"-"+partOfDate[1]+"-"+partOfDate[0];
				 if(this.dateOfOrderFrom!="" && Date.parse(realDate) >= Date.parse(this.dateOfOrderFrom)){
						this.orders.push(this.ordersNew[i]);
					}
					}
			},
			searchDateTo(){
				this.ordersNew = this.orders;
				this.orders = [];
				for(var i=0; i<this.ordersNew.length; i++) {
				 const partOfDate = (this.ordersNew[i].timeOfOrder).split(" ")[0].split("/");
					var realDate = partOfDate[2]+"-"+partOfDate[1]+"-"+partOfDate[0];
				 if(this.dateOfOrderTo!="" && Date.parse(realDate) <= Date.parse(this.dateOfOrderTo)){
						this.orders.push(this.ordersNew[i]);
					}
					}
			},
			
			sortOrders: function(){
			if(this.sortingType != "rastuce" && this.sortingType != "opadajuce"){
				alert("Potrebno je uneti tip sortiranja");
				
			}else{
				if(this.sortingCriterion != "naziv" && this.sortingCriterion != "date" && this.sortingCriterion!= "price"){
					alert("Potrebno je uneti kriterijum sortiranja");
				}else if(this.sortingCriterion == "naziv"){
					this.orders.sort(this.checkName);
				}else if(this.sortingCriterion == "date"){

					this.orders.sort(this.checkDate);
				}else if(this.sortingCriterion == "price"){
					this.orders.sort(this.checkPrice);
				}
			}
		},
			
			search(){
			this.ordersNew = this.orders;
			this.orders = [];
			if(this.searchingName == "" && this.searchingPriceFrom == ""  && this.searchingPriceTo == "" && this.dateOfOrderFrom == "" && this.dateOfOrderTo == ""){
				alert("Potrebno je uneti kriterijum pretrage");
			}else{
			for(var i=0; i<this.ordersNew.length; i++) {
					if(this.searchingName!="" && this.ordersNew[i].restaurantName.includes(this.searchingName) ){
						this.orders.push(this.ordersNew[i]);
					}
					else if(this.searchingPriceFrom!="" && this.ordersNew[i].price >= this.searchingPriceFrom){
						this.orders.push(this.ordersNew[i]);
					}
					else if(this.searchingPriceTo!="" && this.ordersNew[i].price <= this.searchingPriceTo){
						this.orders.push(this.ordersNew[i]);
					}
					else if(this.dateOfOrderFrom!="" && this.ordersNew[i].timeOfOrder >= this.dateOfOrderFrom){
						this.orders.push(this.ordersNew[i]);
					}
					else if(this.dateOfOrderTo!="" && this.ordersNew[i].timeOfOrder <= this.dateOfOrderTo){
						this.orders.push(this.ordersNew[i]);
					}
				}
		   }
		},
			
		prepare: function(value){
			axios
					.post('/prepareOrder', {userName: this.username,idOrder:value
                    },{params:{userName: this.username,idOrder:value}})
						
					.then(function(response){
						alert("Porudzbina je u pripremi!")
					   
					});
					this.refreshPage();
		},
		delivered: function(value){
			axios
					.post('/deliveredOrder', {userName: this.username,idOrder:value
                    },{params:{userName: this.username,idOrder:value}})
						
					.then(function(response){
						alert("Porudzbina dostavljena!")

					});
					 this.refreshPage();
		},
		approve:function(id){
			axios
					.post('/approveOrder', {userName: this.username,idRequest:id
                    },{params:{userName: this.username,idRequest:id}})
						
					.then(function(response){
						alert("Porudzbina odobrena za dostavljača!")
					   
					});
					 this.refreshPage();
		},
		cancel: function(value){
			axios
					.post('/buyerCancelOrder', {userName: this.username,idOrder:value
                    },{params:{userName: this.username,idOrder:value}})
					.then(function(response){
							console.log("1")
							console.log(response.data)
							alert("Uspešno otkazana porudžbina!");
							if(response.data == false){
								console.log("2")

								alert("Otkazali ste porudžbine više od 5 puta u poslednjih 30 dana, te ste ubačeni u listu sumnjivih korisnika.");
							}
							
					});
					this.refreshPage();
		}
		
	},
	mounted: function(){
		 this.username = window.localStorage.getItem('username');
         this.role = window.localStorage.getItem('role');
		 this.user=window.localStorage.getItem('user');
		 this.refreshPage();	 

	},
	template: `<div>	
	<div class="maliHeder">
		<a href="#/">
		<button style="font-size: 100%;">Odjavi se</button></a>
	</div>
	
	 <div class="vertical-menu">
        <a href="#/buyerProfile" v-if="this.role==='kupac'">Moj profil</a>
		<a href="#/buyerProfile" v-if="this.role==='manager'">Moj profil</a>
		<a href="#/buyerProfile" v-if="this.role==='deliverer'">Moj profil</a>
		
        <a href="#/restaurants" v-if="this.role==='kupac'">Restorani</a>
		<a href="#/restaurants" v-if="this.role==='manager'">Restorani</a>
	
		<a href="#/myRestaurants" v-if="this.role==='manager'" >Moj restoran</a>
	
        <a href="#/orders" v-if="this.role==='kupac'" class="active">Porudžbine</a>
		<a href="#/orders" v-if="this.role==='manager'" class="active">Porudžbine</a>
		<a href="#/orders" v-if="this.role==='deliverer'" class="active">Porudžbine</a>
		
  		<a href="#/buyersWhoOrdered" v-if="this.role==='manager'" >Kupci</a>

        <a href="#/basket" v-if="this.role==='kupac'">Korpa</a>
		
        <a href="#" v-if="this.role==='kupac'">Utisci i komentari</a> 
        <a href="#/allComments" v-if="this.role==='manager'">Utisci i komentari</a> </div>
      
		<p class="naslov"><b>Porudžbine</b></p>
     


      <div class="pretraga" >
			<form @submit="search">
			<input type="text" v-if="this.role==='deliverer'|| this.role ==='kupac'" id="naziv" name="naziv"
			 v-model="searchingName" placeholder="Naziv restorana" @change="searchRestName">
	        <input type="text"  v-model="searchingPriceFrom" @change="searchPriceFrom" placeholder="Cena od">
	        <input type="text"  v-model="searchingPriceTo"  @change="searchPriceTo" placeholder="Cena do">
	        <input type="date" v-model="dateOfOrderFrom" @change="searchDateFrom"  placeholder="Datum od">
	        <input type="date" v-model="dateOfOrderTo" @change="searchDateTo" placeholder="Datum do">
	        
	         <input type="submit" value="Pretraži"><br>
		</form>

			<strong>&nbsp;Filtriraj: </strong>
	        <label v-if="this.role==='kupac'|| this.role==='deliverer'">Tip restorana</label>
	        <select v-if="this.role==='kupac'|| this.role==='deliverer'" name="kriterijum" id="kriterijum" v-model="restaurantType" @change="filterByRestType"> 
				  <option value="Chinese">Kineska hrana</option>
				  <option value="Italian">Italijanska hrana</option>
				  <option value="Pancakes">Palačinke</option>
				  <option value="Barbecue">Roštilj</option>
	        </select> <label>Status</label>
	        <select name="status" id="status" v-model="orderStatus"  @change="filterByStatus">
	            <option value="Processing">Obrada</option>
	            <option value="InPreparation">U pripremi</option>
	            <option value="WaitingDeliverer">Čeka dostavljača</option>
	            <option value="InTransport">U transportu</option>
	            <option value="Delivered">Dostavljena</option>
	            <option value="Canceled">Otkazana</option>
	        </select>
	        &nbsp;
	        <strong>Sortiraj prema: </strong>
			<select name="sortiranje" id="sort" v-model="sortingCriterion">
		        <option v-if="role==='kupac'|| role==='deliverer'" value="naziv">Naziv restorana</option>
		        <option value="price">Cena porudžbine</option>
		        <option value="date">Datum porudžbine</option>
	        </select>  <select name="kriterijum" id="kriterijum" v-model="sortingType">
		        <option value="rastuce">Rastuće</option>
		        <option value="opadajuce">Opadajuće</option>
	        </select>
	         <button v-on:click="sortOrders"> Sortiraj</button></td>
    	</div>
		
		<br><br><br>
<table class="tabelaPorudzbine">	
				<tr>
					<th   id="idOrder">Id</th>
					<th   id="restaurant">Restoran</th>
					<th   id="articleList">Artikal i kolicina</th>
					<th>Cena</th>
					<th>Status</th>
					<th>Datum i vreme</th>
					<th> </th>
				</tr>
				<tr v-for="order in orders">
					<td>{{order.idOrder}}</td>
					<td>{{order.restaurantName}}</td><div v-for="article in order.articles">
					<td colspan="2">{{article.articleName}}   {{article.numberOfArticles}}</td></div>

					<td>{{order.price}}</td>
					<td>{{order.orderStatus}}</td>
					<td>{{order.timeOfOrder}}</td>

					<td v-if="role =='kupac' && order.orderStatus === 'Processing'"> <button v-on:click="cancel(order.idOrder)"> Otkaži</button></td>
                    <td v-if="role ==='manager' && order.orderStatus === 'Processing'"> <button  v-on:click="prepare(order.idOrder)"> Za pripremu</button></td>
                    <td v-if="role ==='manager' && order.orderStatus === 'InPreparation'"> <button  v-on:click="prepare(order.idOrder)"> Čeka dostavljača</button></td>
                    <td v-if="role ==='deliverer' && order.orderStatus === 'WaitingDeliverer'"> <button  v-on:click="prepare(order.idOrder)"> Zatraži porudžbinu</button></td>
                    <td v-if="role ==='deliverer' && order.orderStatus === 'InTransport'"> <button  v-on:click="delivered(order.idOrder)"> Porudžbina dostavljena</button></td>

				</tr>
			
			</table>
			<div v-if="this.role==='manager'"><p>Zahtevi dostavljača</p>
			<table><tr><td>id zahteva</td><td>id Porudžbine</td><td>Dostavljač</td><td></td></tr>
			<tr v-for="request in requests">
			<td>{{request.idRequest}}</td>
			<td>{{request.idOrder}}</td>
			<td>{{request.deliverer}}</td>
			<td><button v-on:click="approve(request.idRequest)">Odobri</button></td>
			</tr>
			
			</table></div>
		</div>
		</div>`
		
});