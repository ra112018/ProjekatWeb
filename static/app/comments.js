Vue.component("comments", {
  name: "comments",
  data: function() {
    return {
      comments: [],
     
    }
  },
  mounted: function() {
  
  },
  methods: {
   
		acceptComment: function(event){
			
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
					<a href="#/buyerProfile">Moj profil</a>
					<a href="#/restaurants">Restorani</a>
					<a href="#/myRestaurants">Moji restorani</a>
					<a href="#/orders">Porudžbine</a>
					<a href="#/comments" class="active">Utisci i komentari</a> 
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
                        <tr>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td><button v-if="this.role ==='manager'" @click="acceptComment">Prihvati</button>
								 <button v-if="this.role ==='manager'" @click="declineComment">Odbij</button></td>
   
                            </tr>

                    </table>
          
                </div>
            </div>
        
    </div>
`
    ,
   
});