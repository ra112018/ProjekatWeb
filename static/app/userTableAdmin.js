Vue.component("userTableAdmin", {
    name: "userTableAdmin",
    data: function () {
      return {
        users:[],
		role="",
		userTypeName=""
       
    };
    },
    mounted: function(){
        			
    },
    methods: {
		deleteUser(event){
			
			
		},
		search(){
			
		}
  
    },
    template: 
    ` <div>
<p>PROBAA</p>
		<div>
			<p>PROBAA</p>
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
					<td>{{user.surname}}</td>
					<td>{{user.userName}}</td>
					<td>{{user.role}}</td>
					<td>{{user.userTypeName}}</td>
					
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