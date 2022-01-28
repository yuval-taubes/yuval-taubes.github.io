let regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
let username = document.getElementById('name').value;
let password = document.getElementById('password').value;
let button = document.getElementById('button');
let validname = document.getElementById('validname');
let validpassword = document.getElementById('validpassword');

button.addEventListener('click', function () {

    if(!regName.test(username)){
        window.alert('Invalid name given');
    }
    if(password === ""){
        window.alert('please enter a password');
    }
});