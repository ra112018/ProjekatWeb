Vue.component("success", {
	name: "success",
	data: function(){
		return {
		username:"",
        role:""
		};
	},
	methods: {
		mounted: function(){
              this.username = window.localStorage.getItem('username');
              this.role = window.localStorage.getItem('role');
            },
	},
	template: `<div>	 
	<div class="maliHeder">
		<a href="#/">
		<button style="font-size: 100%;">Odjavi se</button></a>
	</div>
	
	<div class="vertical-menu">
        <a href="#/buyerProfile">Moj profil</a>
        <a href="#">Restorani</a>
        <a href="#/orders">Porudžbine</a>
        <a href="#/basket">Korpa</a>
        <a href="#">Utisci i komentari</a> </div>
      <p class="naslov"><b>Uloga: Kupac</b></p>
      <p class="p1">Uspešna prijava</p>
		</div>`
		
});