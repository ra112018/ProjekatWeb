const HomePage = { template: '<home-page></home-page>' }
const LogIn = { template: '<login></login>' }
const Register = { template: '<register></register>' }
const Success = { template: '<success></success>' }
const KupacProfil = { template: '<kupacProfil></kupacProfil>' }



const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: HomePage},
	    { path: '/login', component: LogIn },
 		{ path: '/register', component: Register },
	 	{ path: '/success', component: Success },
		{ path: '/kupacProfil', component: KupacProfil }


	  ]
});

var app = new Vue({
	router,
	el: '#homePage'
});