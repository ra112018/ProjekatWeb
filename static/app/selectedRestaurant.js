-Vue.component("selected-restaurant", {
	name: "selected-restaurant",
	data: function(){
		return {
			
        usPass:null,
        name: null,
        lastName:null,
        date:null,
		type:null,
        gender:null,
        showErrorMessage: false,
        username: localStorage.getItem('username'),
		user:localStorage.getItem('user'),
		role:localStorage.getItem('role'),
		
        backup: {},
		restaurant:null,
		articles:null,
		comments:null

		//decodeVar: null
		};
	},
	mounted: function(){
		 let id = this.$route.params.id;
	
              this.username = window.localStorage.getItem('username');
              this.role = window.localStorage.getItem('role');
			  this.user=window.localStorage.getItem('user');
            axios
              .get('/restaurantDetails?id='+id,{params:{restaurantName: id}})
	          .then(response => {
			this.restaurant=response.data;
               
	});	
	
				axios.get('/articles?id='+id,{params:{restaurantName: id}}).then(response => {
					this.username = window.localStorage.getItem('username');
              this.role = window.localStorage.getItem('role');
			  this.user=window.localStorage.getItem('user');
				this.articles=response.data;
				});
				
				axios.get('/comments',{params:{restaurantName: id}}).then(response => {
				this.comments=response.data;
				});
				

		},
	
	methods: {
 
		addToCart: function(value){
					axios
					.post('/addArticleToCart', {userName: this.username,articleName:value
                    },{params:{userName: this.username,articleName:value}})
						
					.then(function(response){
						alert("Dodato u korpu!")
					});
			}
		},

	template: ` 
	<div>
		<div v-if="this.role==='kupac' || this.role==='administrator' || this.role==='manager' || this.role==='deliverer'" class="maliHeder">
		<a href="#/">
		<button style="font-size: 100%;">Odjavi se</button></a>
	</div>
	<div>
		<div v-if="this.role===null " class="maliHeder">
		<a href="#/login">
		<button style="font-size: 100%;">Prijavi se</button></a>
	</div>
	
	<div class="vertical-menu">
       <a href="#/buyerProfile" v-if="this.role==='kupac'">Moj profil</a>
 		<a href="#/buyerProfile" v-if="this.role==='administrator'">Moj profil</a>
        <a href="#/buyerProfile" v-if="this.role==='manager'">Moj profil</a>
       
        <a href="#/restaurants" v-if="this.role==='kupac'" class="active">Restorani</a>
		<a href="#/restaurants" v-if="this.role==='administrator'" class="active">Restorani</a>
		<a href="#/restaurants" v-if="this.role==='manager'" >Restorani</a>
		
		<a href="#/userTableAdmin" v-if="this.role==='administrator'">Korisnici</a>
		<a href="#/addUser" v-if="this.role==='administrator'">Dodaj korisnika</a>
		<a href="#/suspiciousUsersTable" v-if="this.role==='administrator'">Pregled sumnjivih korisnika</a>

        <a href="#/orders" v-if="this.role==='kupac'">Porudžbine</a>
		<a href="#/orders" v-if="this.role==='manager'">Porudžbine</a>
        <a href="#/basket" v-if="this.role==='kupac'">Korpa</a>
		<a href="#" v-if="this.role==='manager'">Kupci</a>

        <a href="#" v-if="this.role==='kupac'">Utisci i komentari</a>
		<a href="#" v-if="this.role==='administrator'">Utisci i komentari</a>
		<a href="#" v-if="this.role==='manager'">Utisci i komentari</a>
	 </div>
	
		
	<div class="restoran">
		<img class="logo4" :src="restaurant.logo"/>
		<span class="opisRestorana"><br><br>{{restaurant.restaurantName}}<br><p class="open">{{restaurant.status}}</p><p>{{restaurant.restaurantType}}</p>
		LOKACIJU DODATI
		</span>
		</div>
		
	<div class="restoran" v-for="(article,value) in articles">
	<img class="logo4" :src="article.articlePhoto" width="200em" height="160em">&nbsp;&nbsp;<p>{{article.articleName}}</p><br> &#8943;&#8943;
	<p>{{article.articleType}}</p><br>&#8943;&#8943;
	<p>{{article.description}}</p><br>&#8943;&#8943;
	<p>{{article.price}}</p><br>&#8943;&#8943;
	<p v-if="role=='kupac'"> <button v-on:click="addToCart(article.articleName)">Dodaj u korpu </button></p></div>
	<div><p>Komentari</p>
		<table>
			<th>Kupac</th>
			<th>Komentar</th>
			<th>Ocena</th>
			<th>Status komentara</th>
			<tr v-for="comment in comments" v-if="comment.approved==='Approved'">
				<td>{{comment.customerOfOrder}}</td>
				<td>{{comment.text}}</td>
				<td>{{comment.mark}}</td>
			</tr>
		</table>
	</div>
	
	
	</div>
	</div>
	</div>

`
		
});