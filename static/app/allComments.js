Vue.component("allComments", {
  name: "allComments",
  data: function() {
    return {
      comments: [],
	  role:null,
	  username:null
     
    }
  },
  mounted: function() {
	
    this.username = window.localStorage.getItem('username');
    this.role = window.localStorage.getItem('role');
	this.refreshPage();
  
  },
  methods: {
		refreshPage:function(){
			axios.get('/allComments').then(response => {
				this.comments=response.data;
				});
		},
   
		acceptComment: function(idComment){
			axios
					.post('/approveComment',{},{ params:{ id:idComment }})
						
					.then(function(response){
							alert("Odobren komentar!")
							
					});
				this.refreshPage();
				
		},
		
		declineComment: function(event){
			
		}
  },
  template: 
    ` <div>
        
            <div >
                <div class="maliHeder">
					<a href="#/">
					<button style="font-size: 100%;">Odjavi se</button></a>
				</div>
				<div class="vertical-menu">
        <a href="#/buyerProfile" v-if="this.role==='administrator'">Moj profil</a>
		<a href="#/buyerProfile" v-if="this.role==='manager'">Moj profil</a>

        <a href="#/restaurants" v-if="this.role==='administrator'">Restorani</a>
		<a href="#/restaurants" v-if="this.role==='manager'">Restorani</a>

		<a href="#/myRestaurants" v-if="this.role==='manager'" >Moj restoran</a>

 		<a href="#/orders" v-if="this.role==='manager'">Porudžbine</a>
	    <a href="#/orders" v-if="this.role==='deliverer'">Porudžbine</a>
		<a href="#/buyersWhoOrdered" v-if="this.role==='manager'" >Kupci</a>

      	<a href="#/userTableAdmin" v-if="this.role==='administrator'">Korisnici</a>
		<a href="#/addUser" v-if="this.role==='administrator'">Dodaj korisnika</a>
		<a href="#/suspiciousUsersTable" v-if="this.role==='administrator'">Pregled sumnjivih korisnika</a>

        <a href="#/allComments" v-if="this.role==='administrator'">Utisci i komentari</a> 
		<a href="#/allComments" v-if="this.role==='manager'">Utisci i komentari</a> </div>

				</div>
				<p class="naslov"><b>Komentari kupaca</b></p>
                <div class="tabela">
                    <table> 
                        <tr>
                            <th>Kupac</th>
                            <th>Komentar</th>
                            <th>Ocena</th>
                            <th>Restoran</th>
                            <th>Odobravanje</th>
                        </tr>
                        <tr v-for="comment in comments">
                            <td> {{comment.customerOfOrder}}</td>
                            <td> {{comment.text}}</td>
                            <td> {{comment.mark}}</td>
                            <td>{{comment.restaurant.restaurantName}} </td>
                            <td v-if="comment.approved==='WaitingForApproval'"><button @click="acceptComment(comment.idComment)">Prihvati</button><button @click="declineComment">Odbij</button></td>
                            <td v-if="comment.approved !=='WaitingForApproval'">{{comment.approved}}</td>

                            </tr>
                    </table>
                </div>
	
            </div>
        
    </div>
`
    ,
   
});