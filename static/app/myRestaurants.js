Vue.component("myRestaurants", {
	name:"myRestaurants",
	data: function () {
		    return {
			restaurantList: [],
			username:"",
      	   role:localStorage.getItem('role'),
		   user:localStorage.getItem('user'),
			restaurantName:"",
			restaurant:null
	    }
	},
	methods:{
		newArticle(event){
		    router.push({ path: `/addArticle` })

		},
	},
	mounted: function(){
              this.username = window.localStorage.getItem('username');
              this.role = window.localStorage.getItem('role');
			  this.user=window.localStorage.getItem('user');
			axios.get('/findMyRestaurant',{params:{userName: this.username}})
				.then(response => {
		           
		                this.restaurant=response.data;
		         		localStorage.setItem("restaurantName", JSON.parse(JSON.stringify(response.data))[0]);

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
		<a href="#" v-if="this.role==='manager'">Kupci</a>

		<a href="#/comments" v-if="this.role==='manager'">Utisci i komentari</a>
 
	</div>

	<div class="grid">
			
		
		<div  class="restoran"><a href="#/selectedRestaurant"><img class="logo4"
			 :src="restaurant.logo" alt="Sample photo"/></a><span class="opis1"><br><br><br><em><strong>{{restaurant.restaurantName}}
		</strong></em><br>{{restaurant.restaurantType}}<br><p class="open">{{restaurant.status}}</p> {{restaurant.articles}}
		<button class="addButton" @click="newArticle" :id="restaurant.restaurantName"> Novi</button>
		</span></div></div>
	
	</div>
`,
});	
