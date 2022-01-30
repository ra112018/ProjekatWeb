Vue.component("userTableAdmin", {
    name: "userTableAdmin",
    data: function () {
      return {
        users:[],
		type:"",
		role:"",
		searching:"",
		searchingName:"",
		searchingSurname:"",
		searchingUsername:"",
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
					axios.get('/buyers')
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
		            axios.get('/admins')
				.then(response => {
		           
		            for(var i =0;i< response.data.length;i++){
		                var user = {};
		                user.name = response.data[i].name;
		                user.lastName = response.data[i].surname;
		                user.username = response.data[i].userName;
		                user.role = "administrator";
		                this.users.push(user);
		            }
		         
		        });
		        axios.get('/managers')
				.then(response => {
		           
		            for(var i =0;i< response.data.length;i++){
		                var user = {};
		                user.name = response.data[i].name;
		                user.lastName = response.data[i].surname;
		                user.username = response.data[i].userName;
						user.blocked = response.data[i].blocked;
		                user.role = "manager";
		                this.users.push(user);
		            }
		         
		        });
		        axios.get('/deliverers')
				.then(response => {
		           
		            for(var i =0;i< response.data.length;i++){
		                var user = {};
		                user.name = response.data[i].name;
		                user.lastName = response.data[i].surname;
		                user.username = response.data[i].userName;
						user.blocked = response.data[i].blocked;
		                user.role = "deliverer";
		                this.users.push(user);
		            }
		         
		        });
					
			
		},
		deleteUser(event){
			
			username = event.target.id;
            for(var i =0;i<this.users.length;i++){
              if(this.users[i].username == username){
                    axios
                .post('/deleteUser',{}, {params:{userName:username}})
                .then((response) => {
                  alert("Obrisan korisnik ");
                  this.users = [];
                  this.refreshPage();
                  
                })
                
              }
          }
			
		},
		
		blockUser(event){
			
			username = event.target.id;
			 for(var i =0;i<this.users.length;i++){
              if(this.users[i].username == username){
                    axios
				.post('/blockUser',{}, {params:{userName:username}})
				.then((response)=> {
					alert("Korisnik je blokiran");
					this.users = [];
					this.refreshPage();
				})
                
              }
          }					
		
		},
		search(){
			var usersForSearch = this.users;
			this.users = [];
			if(this.searchingName == "" && this.searchingSurname == "" && this.searchingUsername==""){
				alert("Potrebno je uneti kriterijum pretrage");
			}else {
				if(this.searchingName != "" ){
					for(var i =0;i< usersForSearch.length;i++){
		                    if((usersForSearch[i].name).includes(this.searchingName))
							{
								this.users.push(usersForSearch[i]);
							}
		                }
				}
				if(this.searchingSurname!=""){
					for(var i =0;i< usersForSearch.length;i++){
		                    if((usersForSearch[i].lastName).includes(this.searchingSurname))
							{
								this.users.push(usersForSearch[i]);
								console.log("prezimeee");
							}
		                }
				}
				if(this.searchingUsername != ""){
					for(var i =0;i< usersForSearch.length;i++){
		                    if((usersForSearch[i].username).includes(this.searchingUsername))
							{
								this.users.push(usersForSearch[i]);
							}
		                }
				}
               
			/*	 axios.get('/searchingAdmins', {params:{searching:this.searching, role:this.role}})
		            .then(response => {
		                for(var i =0;i< response.data.length;i++){
		                    var user = {};
		                    user.name = response.data[i].name;
		                    user.lastName = response.data[i].surname;
		                    user.username = response.data[i].userName;
		                    user.role = "administrator";
		                    this.users.push(user);
		                }
		             
		            });
		            axios.get('/searchingManagers', {params:{searching:this.searching, role:this.role}})
		            .then(response => {
		                for(var i =0;i< response.data.length;i++){
		                    var user = {};
		                    user.name = response.data[i].name;
		                    user.lastName = response.data[i].surname;
		                    user.username = response.data[i].userName;
		                    user.blocked = response.data[i].blocked;
							user.role = "manager";
		                    this.users.push(user);
		                }
		             
		            });
 					axios.get('/searchingDeliverers', {params:{searching:this.searching, role:this.role}})
		            .then(response => {
		                for(var i =0;i< response.data.length;i++){
		                    var user = {};
		                    user.name = response.data[i].name;
		                    user.lastName = response.data[i].surname;
		                    user.username = response.data[i].userName;
		                    user.blocked = response.data[i].blocked;
							user.role = "deliverer";
		                    this.users.push(user);
		                }
		             
		            });
		           axios.get('/searchingBuyers', {params:{searching:this.searching, role:this.role, type:this.type}})
	                .then(response => {
	                for(var i =0;i< response.data.length;i++){
	                    var user = {};
	                    user = response.data[i];
	                    user.role = "kupac";                
	                    this.users.push(user);
					}
				});*/
				
			}
		},
		filterType(){
			var usersForFilter = this.users;
			this.users = [];
			if(this.type == "Usual" ){
					for(var i =0;i< usersForFilter.length;i++){
		                    if(usersForFilter[i].type == "Usual")
							{
								this.users.push(usersForFilter[i]);
							}
		                }
				}
			else if(this.type =="Bronze"){
					for(var i =0;i< usersForFilter.length;i++){
		                    if(usersForFilter[i].type == "Bronze")
							{
								this.users.push(usersForFilter[i]);
							}
		                }
				}
			else if(this.type =="Silver"){
					for(var i =0;i< usersForFilter.length;i++){
		                    if(usersForFilter[i].type == "Silver")
							{
								this.users.push(usersForFilter[i]);
							}
		                }
				}
			else if(this.type =="Golden"){
					for(var i =0;i< usersForFilter.length;i++){
		                    if(usersForFilter[i].type == "Golden")
							{
								this.users.push(usersForFilter[i]);
							}
		                }
				}
		},
		filterRole(){
			var usersForFilter = this.users;
			this.users = [];
			if(this.role == "buyer" ){
					for(var i =0;i< usersForFilter.length;i++){
		                    if(usersForFilter[i].role == "kupac")
							{
								this.users.push(usersForFilter[i]);
							}
		                }
				}
			else if(this.role =="administrator"){
					for(var i =0;i< usersForFilter.length;i++){
		                    if(usersForFilter[i].role == "administrator")
							{
								this.users.push(usersForFilter[i]);
							}
		                }
				}
			else if(this.role =="manager"){
					for(var i =0;i< usersForFilter.length;i++){
		                    if(usersForFilter[i].role == "manager")
							{
								this.users.push(usersForFilter[i]);
							}
		                }
				}
			else if(this.role =="deliverer"){
					for(var i =0;i< usersForFilter.length;i++){
		                    if(usersForFilter[i].role == "deliverer")
							{
								this.users.push(usersForFilter[i]);
							}
		                }
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
			<a href="#/userTableAdmin" class="active">Korisnici</a>
			<a href="#/addUser">Dodaj korisnika</a>
			<a href="#/suspiciousUsersTable">Pregled sumnjivih korisnika</a>
			<a href="#/allComments" >Utisci i komentari</a> 
		
		</div>
		
		<br>
		<div class="tabela">                      			
			<form @submit="search" >
				<input type="text" v-model="searchingName" placeholder="Ime"></input>
				<input type="text" v-model="searchingSurname" placeholder="Prezime"></input>
				<input type="text" v-model="searchingUsername" placeholder="Korisnicko ime"></input>

				<button>Pretraži</button>
			</form>
			
		    <label>Uloga:</label>
			<select v-model="role" @change="filterRole">
				<option value="" selected>Svi</option>
				<option value="buyer">Kupci</option>
				<option value="administrator">Administratori</option>
				<option value="manager">Menadzeri</option>
				<option value="deliverer">Dostavljaci</option>
			</select>
			<label>Tip kupca:</label>
			<select v-model="type" @change="filterType">
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
					
					<td v-if="user.role !='administrator'"> <button @click="deleteUser" :id="user.username"> Obrisi</button></td>
                    <td v-if="user.role =='administrator'"> <button :disabled=true @click="deleteUser" :id="user.username"> Obrisi</button></td>
                    <td v-if="(user.role =='kupac' |  user.role =='manager' |  user.role =='deliverer') && user.blocked == false"> <button @click="blockUser" :id="user.username">Blokiraj</button></td>
                    <td v-if="(user.role =='kupac' |  user.role =='manager' |  user.role =='deliverer') && user.blocked == true"> <button :disabled=true @click="blockUser" :id="user.username">Blokiraj</button></td>
					<td v-if="user.role =='administrator'"> <button @click="blockUser" :disabled=true :id="user.userName"> Blokiraj</button></td>
                  
					
				</tr>
			
			</table>
		</div>
		
      </div>
	</div>
`
    ,
    
  });