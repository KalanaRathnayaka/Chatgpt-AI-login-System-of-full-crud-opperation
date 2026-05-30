const API = "http://localhost:5000/api";

// REGISTER USER
async function registerUser(){

const name = document.getElementById("name").value.trim();
const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value.trim();

const error = document.getElementById("error");
error.innerText = "";

// Name validation
if(name === ""){
error.innerText = "Name is required";
return;
}

// Email validation
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailPattern.test(email)){
error.innerText = "Invalid email format";
return;
}

// Password validation
if(password.length < 6){
error.innerText = "Password must be at least 6 characters";
return;
}

// Send request to backend
const res = await fetch(API + "/register",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({name,email,password})
});

const data = await res.json();

alert("User Registered Successfully");

console.log(data);

// Clear fields
document.getElementById("name").value="";
document.getElementById("email").value="";
document.getElementById("password").value="";

getUsers();

}


// GET USERS
async function getUsers(){

const res = await fetch(API + "/users");
const users = await res.json();

const list = document.getElementById("userList");
list.innerHTML = "";

users.forEach(user => {

const li = document.createElement("li");

li.innerHTML = `
${user.name} - ${user.email}

<button onclick="updateUser('${user._id}','${user.name}','${user.email}')">
Update
</button>

<button onclick="deleteUser('${user._id}')">
Delete
</button>
`;

list.appendChild(li);

});

}


async function deleteUser(id){

await fetch(API + "/users/" + id,{
method:"DELETE"
});

alert("User Deleted");

getUsers();

}

async function updateUser(id,oldName,oldEmail){

const name = prompt("Enter new name", oldName);
const email = prompt("Enter new email", oldEmail);

await fetch(API + "/users/" + id,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({name,email})
});

alert("User Updated");

getUsers();

}