Vue.component("suspiciousUsersTable", {
	name: "suspiciousUsersTable",
	data: function() {
		return {
			users:[],
			type:"",
			searching:"",
			userNameSort:"",
			nameSort:"",
			surnameSort:"",
			pointsSort:""
		};
	},
	
	mounted: function() {
		this.refreshPage();
	},
	
	methods: {
		
		refreshPage(){
			axios.get('/suspiciousUsersTable')
			.then(response => {
				for(var i = 0; i<response.data.length; i++){
					var user = {};
					 user.name = response.data[i].name;
		             user.lastName = response.data[i].surname;
		             user.username = response.data[i].userName;
				     user.type = response.data[i].buyerType;
				     user.points = response.data[i].customerPoints;
		             user.suspicious = response.data[i].suspicious;
					 user.blocked = response.data[i].blocked;
					 
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
			<a href="#/userTableAdmin">Korisnici</a>
			<a href="#/addUser">Dodaj korisnika</a>
			<a href="#/suspiciousUsers" class="active">Pregled sumnjivih korisnika</a>
			<a href="#" >Utisci i komentari</a> 
		
		</div>
		
	
		
	</div>
`
  ,
});
	