Vue.component("buyersWhoOrdered", {
    name: "buyersWhoOrdered",
    data: function () {
      return {
        users:[],
		type:"",
		role:"",
		searching:"",
		username:"",
        userNameSort:"",
		nameSort:"",
		surnameSort:"",
		pointsSort:""
    };
    },
    mounted: function(){
        		this.refreshPage();	 

    },
    methods: {
		refreshPage(){
			        this.username = window.localStorage.getItem('username');
					axios.get('/buyersWhoOrdered', {params:{userName: this.username}})
				.then(response => {
		           
		            for(var i =0;i< response.data.length;i++){
		                var user = {};
		                user.name = response.data[i].name;
		                user.lastName = response.data[i].surname;
		                user.username = response.data[i].userName;
						user.type = response.data[i].buyerType;
						user.points = response.data[i].customerPoints;
		                user.suspicious = response.data[i].suspicious;
						user.blocked = response.data[i].blocked;
						user.role = "kupac";
		                this.users.push(user);
		            }
		         
		        });
					
			
		},
		
		search(){
			this.users = [];
			if(this.type == "" && this.role == "" && this.searching == ""){
				this.refreshPage();
			}else if(this.type != ""){
				axios.get('/searchingBuyers', {params:{searching:this.searching, role:this.role, type:this.type}})
                .then(response => {
                for(var i =0; i< response.data.length; i++){
                    var user = {};
                    user.name = response.data[i].name;
                    user.lastName = response.data[i].surname;
                    user.username = response.data[i].userName;
                    user.role = "kupac";
                    user.points = response.data[i].customerPoints;
                    user.type= response.data[i].buyerType;
					user.suspicious = response.data[i].suspicious;
					user.blocked = response.data[i].blocked;                   

                    this.users.push(user);
                }
			});
				
			}
		},
		
		sortTable(event){
			id = event.target.id;
			
			if(id === "userName"){
				if(this.userNameSort === ""){
					this.userNameSort = "ascending";
				}else if(this.userNameSort === "descending"){
					this.userNameSort = "ascending";
				}else{
					this.userNameSort = "descending";
				}
				var tempVar;
				for(var i = 0; i < this.users.length; i++){
					for(var j = 0; j < this.users.length-1; j++){
						if(this.userNameSort === "descending"){
							if(this.users[j].username > this.users[j+1].username){
								tempVar = this.users[j];
                                this.users[j] = this.users[j+1];
                                this.users[j+1] = tempVar;  
							}
						}else{
							if(this.users[j].username < this.users[j+1].username){
                                tempVar = this.users[j];
                                this.users[j] = this.users[j+1];
                                this.users[j+1] = tempVar;
                            }
						}
					}
				}
			}else if(id === "name"){
				if(this.nameSort === ""){
					this.nameSort = "ascending";
				}else if(this.nameSort === "descending"){
					this.nameSort = "ascending";
				}else{
					this.nameSort = "descending";
				}
				var tempVar;
				for(var i = 0; i < this.users.length; i++){
					for(var j = 0; j < this.users.length-1; j++){
						if(this.nameSort === "descending"){
							if(this.users[j].name > this.users[j+1].name){
								tempVar = this.users[j];
                                this.users[j] = this.users[j+1];
                                this.users[j+1] = tempVar;  
							}
						}else{
							if(this.users[j].username < this.users[j+1].username){
                                tempVar = this.users[j];
                                this.users[j] = this.users[j+1];
                                this.users[j+1] = tempVar;
                            }
						}
					}
				}
				
			}else if(id === "surname"){
				if(this.surnameSort === ""){
					this.surnameSort = "ascending";
				}else if(this.surnameSort === "descending"){
					this.surnameSort = "ascending";
				}else{
					this.surnameSort = "descending";
				}
				var tempVar;
				for(var i = 0; i < this.users.length; i++){
					for(var j = 0; j < this.users.length-1; j++){
						if(this.surnameSort === "descending"){
							if(this.users[j].lastName > this.users[j+1].lastName){
								tempVar = this.users[j];
                                this.users[j] = this.users[j+1];
                                this.users[j+1] = tempVar;  
							}
						}else{
							if(this.users[j].lastName < this.users[j+1].lastName){
                                tempVar = this.users[j];
                                this.users[j] = this.users[j+1];
                                this.users[j+1] = tempVar;
                            }
						}
					}
				}
			}else {
				
				if(this.pointsSort === ""){
					this.pointsSort = "ascending";
				}else if(this.pointsSort === "descending"){
					this.pointsSort = "ascending";
				}else{
					this.pointsSort = "descending";
				}
				var tempVar;
				for(var i = 0; i < this.users.length; i++){
					for(var j = 0; j < this.users.length-1; j++){
						if(this.pointsSort === "descending"){
							if(this.users[j].points > this.users[j+1].points){
								tempVar = this.users[j];
                                this.users[j] = this.users[j+1];
                                this.users[j+1] = tempVar;  
							}
						}else{
							if(this.users[j].points < this.users[j+1].points){
                                tempVar = this.users[j];
                                this.users[j] = this.users[j+1];
                                this.users[j+1] = tempVar;
                            }
						}
					}
				}
			}
			
		}
  
    },
    template: 
    ` <div>
		<div class="maliHeder">
				<a href="#/">
				<button style="font-size: 100%;">Odjavi se</button></a>
		</div>
		<div class="vertical-menu">
			<a href="#/buyerProfile">Moj profil</a>
			<a href="#/restaurants">Restorani</a>
			
			<a href="#/myRestaurants">Moj restoran</a>
			<a href="#/orders">Porud??bine</a>
			<a href="#/buyersWhoOrdered" class='active'>Kupci</a>
			<a href="#/allComments" >Utisci i komentari</a> 
		
		</div>
		
		<br>
		<div class="tabela">                      			
			<form @submit="search" >
				<input type="text" v-model="searching" placeholder="Ime/ prezime/ korisnicko ime"></input>
				<button>Pretra??i</button>
			</form>
			
		    <label>Uloga:</label>
			<select v-model="role" @change="search">
				<option value="" selected>Svi</option>
				<option value="buyer">Kupci</option>
				<option value="administrator">Administratori</option>
				<option value="manager">Menadzeri</option>
				<option value="deliverer">Dostavljaci</option>
			</select>
			<label>Tip kupca:</label>
			<select v-model="type" @change="search">
					<option value="" selected>Svi</option>
					<option value="Golden">Golden</option>
					<option value="Silver">Silver</option>
					<option value="Bronze">Bronze</option>
					<option value="Usual">Usual</option>
			</select>
		</div>
		<br>
		<div>
			<table class="tabela">	
				<tr>
					<th @click="sortTable" v-bind:class="nameSort" id="name">Ime</th>
					<th @click="sortTable" v-bind:class="surnameSort" id="surname">Prezime</th>
					<th @click="sortTable" v-bind:class="userNameSort" id="userName">Korisnicko ime</th>
					<th>Uloga</th>
					<th>Tip kupca</th>
					<th @click="sortTable" v-bind:class="pointsSort" id="points">Bodovi</th>
					<th> </th>
					<th> </th>
				</tr>
				<tr v-for="user in users">
					<td>{{user.name}}</td>
					<td>{{user.lastName}}</td>
					<td>{{user.username}}</td>
					<td>{{user.role}}</td>
					<td>{{user.type}}</td>
					<td>{{user.points}}</td>
				</tr>
			
			</table>
		</div>
		
      </div>
	</div>
`
    ,
    
  });