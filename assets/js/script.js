//getting and declaring variables
const userFormEl = document.querySelector('#user-form');
const cityInputEl = document.querySelector('#city');
const stateInputEl = document.querySelector('#state');
const tempDiv = document.querySelector('.temp');
const todayWeather = $('#current-date');
const day1Weather = $('#day1');
const day2Weather = $('#day2');
const day3Weather = $('#day3');
const day4Weather = $('#day4');
const day5Weather = $('#day5');
//didn't need both jquery and vanilla selectors but I'm not messing with anything at this point
const history = document.querySelector('#history');
const searchHistory = $('#history');
//array of elements that will be used to populate weather info
const popArray = [todayWeather, day1Weather, day2Weather, day3Weather, day4Weather, day5Weather];
//event listener to call form function when it is submitted
userFormEl.addEventListener('submit', formSubmitHandler);
//form submit function
function formSubmitHandler(event) {
    event.preventDefault();
    //take input city and state value to be used in api call and for displaying
    let searchedCity = cityInputEl.value;
    let searchedState = stateInputEl.value;
    let searchCombo = searchedCity + ", " + searchedState;
    let newUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchedCity},${searchedState},US&limit=1&appid=2bd870c3ff12388ac354b0598f17ac0d`
    //fetch geolocation api to tunr city and state into usable lat and long
    fetch(newUrl).then(response => {
        return response.json();
    }).then(data => {
        //gets lat and lon from returned promises/objects
        let searchedLat = data[0].lat;
        let searchedLon = data[0].lon;
        let searchUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${searchedLat}&lon=${searchedLon}&units=imperial&appid=2bd870c3ff12388ac354b0598f17ac0d`
        //make a search history button
        let newDiv = document.createElement('div');
        newDiv.classList.add('btn');
        newDiv.classList.add('btn-secondary');
        newDiv.classList.add('search-history');
        //stores data attributes to be used on history click
        newDiv.dataset.url = searchUrl;
        newDiv.dataset.name = searchCombo;
        newDiv.textContent = searchedCity;
        history.append(newDiv);
        //fetch 5 day+ forecast call to be used to populate html elements with respective data
        fetch(searchUrl).then(response => {
            return response.json();
        }).then(data => {
            let i = 0;
            popArray.forEach(element => {
                let currentDay = new Date;
                let nextDay = currentDay;
                nextDay.setDate(currentDay.getDate() + i);
                let displayDay = Intl.DateTimeFormat('en-US').format(nextDay);
                element.children('.place').text(searchCombo);
                element.children('.title').text(displayDay);
                element.children('.title').append("<img>");
                element.children('.title').find("img").attr("src", `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`);
                element.children('.temp').text('Temp: ' + data.daily[i].temp.day + 'F');
                element.children('.wind').text('Wind Spd: ' + data.daily[i].wind_speed);
                element.children('.humid').text('Humidity: ' + data.daily[i].humidity);
                if (data.daily[i].uvi < 4) {
                    element.children('.uv').addClass('bg-success text-white');
                } else if (data.daily[i].uvi >= 4 && data.daily[i].uvi < 7) {
                    element.children('.uv').addClass('bg-warning text-white');
                } else {
                    element.children('.uv').addClass('bg-danger text-white');
                }
                element.children('.uv').text('UV: ' + data.daily[i].uvi);
                i++
            })
        })
    })
    //clears out the input text from forms
    cityInputEl.value = '';
    stateInputEl.value = '';
}
//function to be executed when search history button is clicked
//retrieves stored data attributes to be used in new api call
searchHistory.on('click', event => {
    let oldSearch = event.target.dataset.url;
    let oldName = event.target.dataset.name;
    fetch(oldSearch).then(response => {
        return response.json();
    }).then(data => {
        let i = 0;
        popArray.forEach(element => {
            let currentDay = new Date;
            let nextDay = currentDay;
            nextDay.setDate(currentDay.getDate() + i);
            let displayDay = Intl.DateTimeFormat('en-US').format(nextDay);
            element.children('.place').text(oldName);
            element.children('.title').text(displayDay);
            element.children('.title').append("<img>");
            element.children('.title').find("img").attr("src", `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`);
            element.children('.temp').text('Temp: ' + data.daily[i].temp.day + 'F');
            element.children('.wind').text('Wind Spd: ' + data.daily[i].wind_speed);
            element.children('.humid').text('Humidity: ' + data.daily[i].humidity);
            if (data.daily[i].uvi < 4) {
                element.children('.uv').addClass('bg-success text-white');
            } else if (data.daily[i].uvi >= 4 && data.daily[i].uvi < 7) {
                element.children('.uv').addClass('bg-warning text-white');
            } else {
                element.children('.uv').addClass('bg-danger text-white');
            }
            element.children('.uv').text('UV: ' + data.daily[i].uvi);
        i++
        })
    })
})