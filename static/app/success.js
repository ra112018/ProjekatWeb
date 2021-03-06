Vue.component("success", {
	name: "success",
	data: function(){
		return {
		username:"",
        role:localStorage.getItem('role'),
		user:localStorage.getItem('user'),
		stavka1:"",
		
		};
	},
	methods: {
		
	},
	mounted: function(){
              this.username = window.localStorage.getItem('username');
              this.role = window.localStorage.getItem('role');
			  this.stavka1="Moj profil";
			if(this.role=="kupac"){
			}
            },
	template: `<div>	 
	<div class="maliHeder">
		<a href="#/">
		<button style="font-size: 100%;" v-if="this.role != 'undefined'">Odjavi se</button></a>
        <a href="#/login" style="color: white; margin-right:90%" v-if="this.role=='undefined'">Nazad na prijavu</a>

	</div>
	
	<div class="vertical-menu">
        <a href="#/buyerProfile" v-if="this.role==='kupac'">Moj profil</a>
        <a href="#/buyerProfile" v-if="this.role==='administrator'">Moj profil</a>
		<a href="#/buyerProfile" v-if="this.role==='manager'">Moj profil</a>
		<a href="#/buyerProfile" v-if="this.role==='deliverer'">Moj profil</a>

        <a href="#/restaurants" v-if="this.role==='kupac'">Restorani</a>
        <a href="#/restaurants" v-if="this.role==='administrator'">Restorani</a>
		<a href="#/restaurants" v-if="this.role==='manager'">Restorani</a>

		<a href="#/myRestaurants" v-if="this.role==='manager'" >Moj restoran</a>

        <a href="#/orders" v-if="this.role==='kupac'">Porudžbine</a>
 		<a href="#/orders" v-if="this.role==='manager'">Porudžbine</a>
	    <a href="#/orders" v-if="this.role==='deliverer'">Porudžbine</a>
		<a href="#/buyersWhoOrdered" v-if="this.role==='manager'" >Kupci</a>

      	<a href="#/userTableAdmin" v-if="this.role==='administrator'">Korisnici</a>
		<a href="#/addUser" v-if="this.role==='administrator'">Dodaj korisnika</a>
		<a href="#/suspiciousUsersTable" v-if="this.role==='administrator'">Pregled sumnjivih korisnika</a>

        <a href="#/basket" v-if="this.role==='kupac'">Korpa</a>
        <a href="#" v-if="this.role==='kupac'">Utisci i komentari</a>
        <a href="#/allComments" v-if="this.role==='administrator'">Utisci i komentari</a> 
		<a href="#/allComments" v-if="this.role==='manager'">Utisci i komentari</a> </div>

      <p class="naslov"><b>Uloga: {{this.role}} </b></p>
      <p class="p1" v-if="this.role != 'undefined'">Uspešna prijava</p>
      <p class="p1" v-if="this.role == 'undefined'">Neuspešna prijava!</p>

		</div>`
		
});