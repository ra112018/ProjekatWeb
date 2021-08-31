const HomePage = { template: '<home-page></home-page>' }
const LogIn = { template: '<login></login>' }
const Register = { template: '<register></register>' }
const Success = { template: '<success></success>' }
const BuyerProfile = { template: '<buyer-profile></buyer-profile>' }
const Basket = {template: '<basket></basket>' }
const Orders = {template: '<orders></orders>' }
const Restaurants={template:'<restaurants></restaurants>'}
const SelectedRestaurant={template:'<selected-restaurant></selected-restaurant>'}
const UserTableAdmin = {template:'<userTableAdmin></userTableAdmin>'}
const AddRestaurant={template:'<addRestaurant></addRestaurant>'}


const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: HomePage},
	    { path: '/login', component: LogIn },
 		{ path: '/register', component: Register },
	 	{ path: '/success', component: Success },
		{ path: '/buyerProfile', component: BuyerProfile },
		{ path: '/basket', component: Basket },
		{ path: '/orders', component: Orders },
		{ path: '/restaurants',component:Restaurants},
		{ path: '/selectedRestaurant',component:SelectedRestaurant},
		{ path: '/userTableAdmin',component:UserTableAdmin},
		{ path: '/addRestaurant',component:AddRestaurant}



	  ]
});

var app = new Vue({
	router,
	el: '#homePage'
});