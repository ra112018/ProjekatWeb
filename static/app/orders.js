Vue.component("orders", {
	name: "orders",
	data: function(){
		return {
			role:localStorage.getItem('role'),
		    user:localStorage.getItem('user'),
		    username:localStorage.getItem('username'),

			restaurantName:"",
			orders:[],
			requests:[]

		};
	},
	methods: {
		refreshPage(){
			

              this.username = window.localStorage.getItem('username');
              this.role = window.localStorage.getItem('role');
			  this.user=window.localStorage.getItem('user');
			axios.get('/OrdersFromMyRestaurant',{params:{userName: this.username}})
				.then(response => {
		            for(var i =0;i< response.data.length;i++){
		                var order = {};
		                order.idOrder = response.data[i].idOrder;
		                order.articles = response.data[i].articles;
		                order.restaurantName = response.data[i].restaurantName;
						order.timeOfOrder=response.data[i].timeOfOrder;
						order.price = response.data[i].price;
		                order.user = response.data[i].user;
		                order.orderStatus = response.data[i].orderStatus;
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
			
		prepare: function(value){
			axios
					.post('/prepareOrder', {userName: this.username,idOrder:value
                    },{params:{userName: this.username,idOrder:value}})
						
					.then(function(response){
						alert("Porudzbina je u pripremi!")
					   this.refreshPage();

					});
		},
		delivered: function(value){
			axios
					.post('/deliveredOrder', {userName: this.username,idOrder:value
                    },{params:{userName: this.username,idOrder:value}})
						
					.then(function(response){
						alert("Porudzbina dostavljena!")
					   this.refreshPage();

					});
		},
		approve:function(id){
			axios
					.post('/approveOrder', {userName: this.username,idRequest:id
                    },{params:{userName: this.username,idRequest:id}})
						
					.then(function(response){
						alert("Porudzbina odobrena za dostavljača!")
					   this.refreshPage();

					});
		},
		cancel: function(value){
			axios
					.post('/buyerCancelOrder', {userName: this.username,idOrder:value
                    },{params:{userName: this.username,idOrder:value}})
						
					.then(function(response){
						 if(response.data){
						alert("Uspešno otkazana porudžbina!")
                }
                else{
                    alert("Otkazali ste porudžbine više od 5 puta u poslednjih 30 dana, te ste ubačeni u listu sumnjivih korisnika.")
                }
					    this.refreshPage();

					});
		}
		
	},
	mounted: function(){
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
	
		<a href="#/myRestaurants" v-if="this.role==='manager'" >Moji restorani</a>
	
        <a href="#/orders" v-if="this.role==='kupac'" class="active">Porudžbine</a>
		<a href="#/orders" v-if="this.role==='manager'" class="active">Porudžbine</a>
		<a href="#/orders" v-if="this.role==='deliverer'" class="active">Porudžbine</a>
  
        <a href="#/basket" v-if="this.role==='kupac'">Korpa</a>
		
        <a href="#" v-if="this.role==='kupac'">Utisci i komentari</a> 
        <a href="#/comments" v-if="this.role==='manager'">Utisci i komentari</a> </div>
      
		<p class="naslov"><b>Porudžbine</b></p>
     
      <div class="pretraga">
			<input type="text" id="naziv" name="naziv" placeholder="Naziv restorana">
	        <input type="text" id="lokacija" name="lokacija" placeholder="Cena">
	        <input type="date" id="tip" name="tip" placeholder="Datum od">
	        <input type="date" id="tip" name="tip" placeholder="Datum do">
	        
	         <input type="submit" value="Pretraži"><br><strong>&nbsp;Filtriraj: </strong>
	        <label>Tip restorana</label>
	        <select name="kriterijum" id="kriterijum">
	            <option value="brza">Brza hrana</option>
	            <option value="giros">Giros</option>
	            <option value="kineska">Kineska hrana</option>
	            <option value="kuvana">Kuvana jela</option>
	            <option value="palačinke">Palačinke</option>
	            <option value="pizza">Pizza</option>
	            <option value="poslasticarnica">Poslastičarnica</option>
	            <option value="susi">Suši</option>
	        </select> <label>Status</label>
	        <select name="status" id="status">
	            <option value="brza">Obrada</option>
	            <option value="giros">U pripremi</option>
	            <option value="kineska">Čeka dostavljača</option>
	            <option value="kuvana">U transportu</option>
	            <option value="palačinke">Dostavljena</option>
	            <option value="pizza">Otkazana</option>
	        </select>
	        &nbsp;
	        <strong>Sortiraj prema: </strong> <select name="sortiranje" id="sort">
	        <option value="naziv">Naziv restorana</option>
	        <option value="lokacija">Cena porudžbine</option>
	        <option value="ocena">Datum porudžbine</option>
	        </select>  <select name="kriterijum" id="kriterijum">
	        <option value="rastuće">Rastuće</option>
	        <option value="opadajuće">Opadajuće</option>
		
	        </select>
	         <button> Sortiraj</button></td>
    	</div>
		
		<br><br><br>
<table class="tabelaPorudzbine">	
				<tr>
					<th   id="idOrder">Id</th>
					<th   id="restaurant">Restoran</th>
					<th   id="articleList">Artikal i kolicina</th>
					<th>Cena</th>
					<th>Status</th>
					<th> </th>
				</tr>
				<tr v-for="order in orders">
					<td>{{order.idOrder}}</td>
					<td>{{order.articles[0].restaurantName}}</td><div v-for="article in order.articles">
					<td colspan="2">{{article.articleName}}   {{article.numberOfArticles}}</td></div>

					<td>{{order.price}}</td>
					<td>{{order.orderStatus}}</td>
					
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
			<td>{{request.deliverer.userName}}</td>
			<td><button v-on:click="approve(request.idRequest)">Odobri</button></td>
			</tr>
			
			</table></div>
		</div>
		</div>`
		
});