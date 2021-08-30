Vue.component("userTableAdmin", {
    name: "userTableAdmin",
    data: function () {
      return {
        users:[],

		role:"",
       
    };
    },
    mounted: function(){
        			 axios.get('/buyers')
		.then(response => {
           
            for(var i =0;i< response.data.length;i++){
                var user = {};
                user.name = response.data[i].name;
                user.lastName = response.data[i].surname;
                user.username = response.data[i].userName;
				user.type=response.data[i].userTypeName;
                user.role = "kupac";
                this.users.push(user);
            }
         
        });
            axios.get('/admins')
		.then(response => {
           
            for(var i =0;i< response.data.length;i++){
                var user = {};
                user.name = response.data[i].name;
                user.lastName = response.data[i].surname;
                user.username = response.data[i].userName;
                user.role = "administrator";
                this.users.push(user);
            }
         
        });
        axios.get('/managers')
		.then(response => {
           
            for(var i =0;i< response.data.length;i++){
                var user = {};
                user.name = response.data[i].name;
                user.lastName = response.data[i].surname;
                user.username = response.data[i].userName;
                user.role = "manager";
                this.users.push(user);
            }
         
        });
        axios.get('/deliverers')
		.then(response => {
           
            for(var i =0;i< response.data.length;i++){
                var user = {};
                user.name = response.data[i].name;
                user.lastName = response.data[i].surname;
                user.username = response.data[i].userName;
                user.role = "kupac";
                this.users.push(user);
            }
         
        });
    },
    methods: {
		deleteUser(event){
			
			
		},
		search(){
			
		}
  
    },
    template: 
    ` <div>
		<div>                     			
			<form @submit="search">
				<input type="text"></input>
				<button>Pretraži</button>
			</form>
		
		
			<select v-model="role" @change="search">
				<option value="" selected>Svi</option>
				<option value="buyer">Kupci</option>
				<option value="administrator">Administratori</option>
				<option value="manager">Menadzeri</option>
				<option value="deliverer">Dostavljaci</option>
			</select>
			
			<select v-model="userTypeName" @change="search">
					<option value="" selected>Svi</option>
					<option value="Golden">Golden</option>
					<option value="Silver">Silver</option>
					<option value="Bronze">Bronze</option>
					<option value="Usual">Usual</option>
			</select>
		</div>
		<div>
			<table>	
				<tr>
					<th>Ime</th>
					<th>Prezime</th>
					<th>Korisnicko ime</th>
					<th>Uloga</th>
					<th>Tip kupca</th>
					<th>Bodovi</th>
					<th> </th>
					<th> </th>
				</tr>
				<tr v-for="user in users">
					<td>{{user.name}}</td>
					<td>{{user.lastName}}</td>
					<td>{{user.username}}</td>
					<td>{{user.role}}</td>
					<td>{{user.type}}</td>
					
					<td v-if="user.role !='administrator'"> <button @click="deleteUser" :id="user.username"> Obrisi</button></td>
                    <td v-if="user.role =='administrator'"> <button :disabled=true @click="deleteUser" :id="user.userName"> Obrisi</button></td>
                    <td v-if="(user.role =='buyer' |  user.role =='manager' |  user.role =='deliverer')> <button  :id="user.userName"> Blokiraj</button></td>
                  
					
				</tr>
			
			</table>
		</div>
      </div>
`
    ,
    
  });