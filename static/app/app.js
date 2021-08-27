const HomePage = { template: '<home-page></home-page>' }
const LogIn = { template: '<login></login>' }
const Register = { template: '<register></register>' }
const Success = { template: '<success></success>' }
const BuyerProfile = { template: '<buyer-profile></buyer-profile>' }
const Basket = {template: '<basket></basket>' }
const Orders = {template: '<orders></orders>' }
const UpdateProfile = {template: '<update-profile></update-profile>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: HomePage},
	    { path: '/login', component: LogIn },
 		{ path: '/register', component: Register },
	 	{ path: '/success', component: Success },
		{ path: '/buyerProfile', component: BuyerProfile },
		{ path: '/updateProfile', component: UpdateProfile },
		{ path: '/basket', component: Basket },
		{ path: '/orders', component: Orders }


	  ]
});

var app = new Vue({
	router,
	el: '#homePage'
});