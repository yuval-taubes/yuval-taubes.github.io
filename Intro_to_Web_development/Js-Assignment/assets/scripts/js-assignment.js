
const input = document.getElementById('inputCelsius');
const button = document.getElementById('button');
const input2 = document.getElementById('inputFahrenheit');
const button2 = document.getElementById('button2');




const body = document.querySelector("body")
const label = document.querySelectorAll("input")
const paragraph = document.querySelectorAll("p")
const darkModeToggle = document.getElementById('darkMode');
const li = document.querySelectorAll('a');
const header = document.querySelectorAll('h1');


button.addEventListener('click', function () {
    let temp = input.value;
    if (isNaN(temp)) {
        document.getElementById("outputF").innerText = "Please type in a number"
    }
    else {
        document.getElementById("outputF").innerText = temp * 1.8 + 32 + " Degrees";
    }
});
button2.addEventListener('click', function () {
    let temp = input2.value;
    if (isNaN(temp)) {
        document.getElementById("outputF").innerText = "Please type in a number"
    }
    else {
        document.getElementById("outputC").innerText = (temp - 32) / 1.8 + " Degrees";
    }
});
darkModeToggle.addEventListener('click', function () {
    body.classList.toggle('darkMode');
    Array.from(darkModeToggle).forEach(a => {
        a.classList.toggle("darkMode")
    })
    Array.from(paragraph).forEach(a => {
        a.classList.toggle("darkMode")
    })
    Array.from(label).forEach(a => {
        a.classList.toggle("darkMode")
    })
    Array.from(li).forEach(a => {
        a.classList.toggle("darkMode")
    })
    Array.from(header).forEach(a => {
        a.classList.toggle("darkMode")
    })
});
