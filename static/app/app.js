const HomePage = { template: '<home-page></home-page>' }
const LogIn = { template: '<login></login>' }
const Register = { template: '<register></register>' }
const Success = { template: '<success></success>' }
const BuyerProfile = { template: '<buyer-profile></buyer-profile>' }
const Basket = {template: '<basket></basket>' }
const Orders = {template: '<orders></orders>' }
const Restaurants={template:'<restaurants></restaurants>'}
const MyRestaurants={template:'<myRestaurants></myRestaurants>'}
const SelectedRestaurant={template:'<selected-restaurant></selected-restaurant>'}
const UserTableAdmin = {template:'<userTableAdmin></userTableAdmin>'}
const AddRestaurant= {template:'<addRestaurant></addRestaurant>'}
const AddArticle= {template:'<addArticle></addArticle>'}
const AddUser = {template:'<addUser></addUser>'}
const Comments = {template:'<comments></comments>'}
const AllComments = {template:'<allComments></allComments>'}
const EvaluateRestaurant = {template:'<evaluateRestaurant></evaluateRestaurant>'}
const SuspiciousUsersTable  = {template:'<suspiciousUsersTable></suspiciousUsersTable>'}
const BuyersWhoOrdered = {template: '<buyersWhoOrdered></buyersWhoOrdered>'}

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
		{ path: '/myRestaurants',component:MyRestaurants},
		{ path: '/selectedRestaurant/:id',component:SelectedRestaurant},
		{ path: '/userTableAdmin',component:UserTableAdmin},
		{ path: '/addRestaurant',component:AddRestaurant},
		{ path: '/addArticle',component:AddArticle},
		{ path: '/addUser',component:AddUser},
		{ path: '/comments',component:Comments},
		{ path: '/allComments',component:AllComments},
		{ path: '/evaluateRestaurant/:id',component: EvaluateRestaurant},
		{ path: '/suspiciousUsersTable',component:SuspiciousUsersTable},
		{ path: '/buyersWhoOrdered',component: BuyersWhoOrdered}
		
	]
});

var app = new Vue({
	router,
	el: '#homePage'
});