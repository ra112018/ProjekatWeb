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
			editingName:false,
			editingType:false,
			editingStatus:false
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
		enableEditingName: function(value){
      this.tempValueName = value;
      this.editingName = true;
    },
	disableEditingName: function(){
      this.tempValueName = null;
      this.editingName = false;
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
			<br><em><strong><div v-if="!editingName" @click="enableEditingName(restaurant.restaurantName)">{{restaurant.restaurantName}} </div>
			<div v-if="editingName"> <input v-model="tempValueName"/></div>
			</strong></em><br><div v-if="!editingType" @click="enableEditingType(restaurant.restaurantType)">{{restaurant.restaurantType}} </div>
			 <div v-if="editingType"> <input v-model="tempValueType"/></div><br>
			<p class="open"><div v-if="!editingStatus" @click="enableEditingStatus(restaurant.status)">{{restaurant.status}}</div></p>
			<div v-if="editingStatus"> <select v-model="tempValueStatus"><option value="Open">Otvoreno</option>
			<option value="Closed">Zatvoreno</option></select></div><br>
			<button class="addButton" @click="newArticle" :id="restaurant.restaurantName"> Dodaj artikal </button>
		</span>
		<span class="opis1"><br><button  v-if="editingName" >
			Sačuvaj</button> <button  v-if="editingName"  @click="disableEditingName">
			Otkaži</button><br><br><button v-if="editingType" >Sačuvaj</button><button v-if="editingType" @click="disableEditingType">Otkaži</button><br>
			<br><br><button  v-if="editingStatus" >Sačuvaj</button><button  v-if="editingStatus" @click="disableEditingStatus">Otkaži</button>
		</span>
		
		<br></div></div>&#160;&#160;&#160;&#160;&#160;&#160;&#160;<button>Promeni sliku</button><br><br><br>
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
