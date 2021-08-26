const HomePage = { template: '<home-page></home-page>' }
const LogIn = { template: '<login></login>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: HomePage},
	    { path: '/login', component: LogIn }
	  ]
});

var app = new Vue({
	router,
	el: '#homePage'
});