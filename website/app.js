// Personal API Key for geoNames API
const apiGeoURL = 'http://api.geonames.org/searchJSON';
const apiGeoUserName = 'perobok';
// Personal API Key for WeatherBit API
const apiWeatherURL = 'https://api.weatherbit.io/v2.0/forecast/daily';
const apiWeatherKey = 'a37ee370636f4a9ea951b07969113c7e';
// Personal API for Pixabay
const apiPictureURL = 'https://pixabay.com/api/';
const apiPictureKey = '20614359-7c7fdf79fa0e5a77a9260f522';

// Create a new date instance dynamically with JS 
let d = new Date()


let yearC = d.getFullYear();
let monthC = d.getMonth() + 1;
let dtC = d.getDate();

// If we want 0 in front of single number of day or month
if (dtC < 10) {
    dtC = '0' + dtC;
}
if (monthC < 10) {
    monthC = '0' + monthC;
}
const today = yearC + '-' + monthC + '-' + dtC;

// Event listener to add function to existing HTML DOM element
document.querySelector("#generate").addEventListener('click', geoData);

/* Function called by event listener :*/

async function geoData(e) {
    e.preventDefault();
    // this part of code will return number of days before our trip. 
    const tripDate = document.getElementById("date1").value;
    const trip = new Date(Date.parse(tripDate));
    const Difference_In_Time = trip.getTime() - d.getTime();
    const differenceInDays = Difference_In_Time / (1000 * 3600 * 24);
    const roundDays = Math.round(differenceInDays);
    console.log(roundDays);
    //then I was taking value from text input and pass int to the getData async function
    const destination = document.querySelector("#destination").value;
    const data = await getData(destination);

};
/* Function to GET coordinates Data */
async function getData(destination) {
    try {
        const responseGeo = await fetch(`${apiGeoURL}?q=${destination}&username=${apiGeoUserName}`);
        const dataGeo = await responseGeo.json();
        console.log(dataGeo.geonames[0])
        const countryName = dataGeo.geonames[0].countryName;
        const lat = dataGeo.geonames[0].lat;
        const lng = dataGeo.geonames[0].lng;
        console.log(countryName, lat, lng);
        // to GET weather data
        const responseWeather = await fetch(`${apiWeatherURL}?lat=${lat}&lon=${lng}&key=${apiWeatherKey}`);
        const dataWeather = await responseWeather.json();
        console.log(dataWeather)
            // to GET picture 
        const responsePic = await fetch(`${apiPictureURL}?key={ ${apiPictureKey} }&q=${destination}&image_type=photo`);
        const dataPic = await responsePic.json();
        console.log(dataPic)

    } catch (error) {
        console.log("error", error);
    }
};

// Function to get weather data from an API. 
/* Function to POST data */
/*
async function postData(zipCode, temp, feelings, townName) {
    const response = await fetch('http://localhost:7600/', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zipCode, temp, feelings, newDate, townName }),

    });
    return await response.text()
};
*/

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
    } *
    /