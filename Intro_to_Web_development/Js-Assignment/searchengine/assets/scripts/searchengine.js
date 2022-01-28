let search = document.getElementById('search');
let button = document.getElementById('button');
let button2 = document.getElementById('button2');
let button3 = document.getElementById('button3')

let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];

let username = "guest1";
let password = "12345";
let inputUserName = document.getElementById('username');
let inputpassword = document.getElementById('password');
let cansearch = false;

button3.addEventListener('click', function () {
    if (username === inputUserName.value && password === inputpassword.value) {
        cansearch = true;
        console.log(cansearch)
        modal.style.display = "none";
    }
});


button.addEventListener('click', function () {
    if (cansearch) {
        let link = "https://www.google.com/search?q=" + search.value;
        window.location.href = link;
    }
    else {
        window.alert("You need to log in first");
    }
});
button2.addEventListener('click', function () {
    if (cansearch) {
        let link2 = "https://www.bing.com/search?q=" + search.value;
        window.location.href = link2;
    }
    else {
        window.alert("You need to log in first");
    }
});

//modal

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}