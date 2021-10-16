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
			comments:null
	    }
	},
	methods:{
		newArticle(event){
		    router.push({ path: `/addArticle` })

		},
		findArticles: function(id){
				axios.get('/articles?id='+id).then(response => {
				this.articles=response.data;
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
	},
	mounted: function(){
              this.username = window.localStorage.getItem('username');

              this.role = window.localStorage.getItem('role');
			  this.user=window.localStorage.getItem('user');
			axios.get('/findMyRestaurant',{params:{userName: this.username}})
				.then(response => {
		           
		            this.restaurant=response.data;
		         	localStorage.setItem("restaurantName", this.restaurant.restaurantName);

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
		<a href="#" v-if="this.role==='manager'">Kupci</a>

		<a href="#/comments" v-if="this.role==='manager'">Utisci i komentari</a>
 
	</div>

	<div class="grid">
			
		
		<div class="restoran"><img class="logo4" :src="restaurant.logo"/>
		<span class="opis1">
			<br><br><br><em><strong>{{restaurant.restaurantName}}
			</strong></em><br>{{restaurant.restaurantType}}<br><p class="open">{{restaurant.status}}</p> 
			<button class="addButton" @click="newArticle" :id="restaurant.restaurantName"> Novi </button>
		</span></div></div>
	<div class="restoran" v-for="article in articles">
	
		<img class="articlePicture" :src="article.articlePhoto">&nbsp;
		<p>{{article.articleName}}</p><br>&#8943;&#8943;
		<p>{{article.description}}</p><br>&#8943;&#8943;
		<p>{{article.price}}</p>&nbsp;&nbsp;<div v-if="role==='manager'"><button> Izmeni artikal</button></div>
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
