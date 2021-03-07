// Personal API Key for OpenWeatherMap API
const apiURL = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = '53b13c8594d3424db8a5cafbf426c968';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toLocaleDateString();

// Event listener to add function to existing HTML DOM element
document.querySelector("#generate").addEventListener('click', weatherData);

/* Function called by event listener :

This is callback function thet will invoke after click on generate button. 
I used asincronus function so I can use await to perform get, post and update inn order but only after previous function 
was done. I used math.floor to round tempreture value. After that I invoked post data and updateUI functions.
*/
async function weatherData(e) {
    e.preventDefault();
    const feelings = document.querySelector("#feelings").value;
    const zipCode = document.querySelector("#zip").value;
    const data = await getData(zipCode);
    const temp = Math.floor(data.main.temp);
    const townName = data.name;
    const dataPost = await postData(zipCode, temp, feelings, townName);
    const update = await updateUI(zipCode, temp, feelings, townName);
};
/* Function to GET Web API Data*/
async function getData(zipCode) {
    try {
        const response = await fetch(`${apiURL}?zip=${zipCode}&appid=${apiKey}&units=metric`); // I declared metric units here
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
}
/* Function to POST data 

I head a lot of dificulties to find whitch url to pass. All the time I had error that says: cors need to read http or https...
My server was local so it was unknown to me. Finally I found solution on other sites to put localhost with port number. :) */

async function postData(zipCode, temp, feelings, townName) {
    const response = await fetch('http://localhost:7600/', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zipCode, temp, feelings, newDate, townName }),

    });
    return await response.text()
};

/* Function to GET Project Data 

I tried to reach last object in array by "putting allData.lenght - 1" inside square brackets after innerHTML
but that solution for some reason woun't work. There was no error in console but nothing showed in the DOM. 
 Then I decided to change get function in server.js. Instead of data.push I used data.unshift
to put last entry at the start of array. Then it was easy to access with location [0]. */

const updateUI = async(zipCode, temp, feelings, townName) => {
    const request = await fetch(`http://localhost:7600/`)
    try {
        const allData = await request.json();
        console.log(allData);
        document.querySelector("#date").innerHTML = allData[0].newDate;
        document.querySelector("#temp").innerHTML = 'Current temperature: ' + allData[0].temp + " &#176C";
        document.querySelector("#townName").innerHTML = allData[0].zipCode + '  ' + allData[0].townName;
        document.querySelector("#content").innerHTML = 'Your feeling today:  ' + allData[0].feelings;

    } catch (error) {
        console.log("error", error);
    }
}