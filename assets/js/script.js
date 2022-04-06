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
const history = document.querySelector('#history');
const popArray = [todayWeather, day1Weather, day2Weather, day3Weather, day4Weather, day5Weather];
const atrArray = ['.title', '.temp', '.wind', '.humid', '.uv'];

userFormEl.addEventListener('submit', formSubmitHandler);

const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=74.0060&lon=40.7128&appid=2bd870c3ff12388ac354b0598f17ac0d';
const place = 'http://api.openweathermap.org/geo/1.0/direct?q=New York,NY,US&limit=1&appid=2bd870c3ff12388ac354b0598f17ac0d';
fetch(place).then(response => {
    return response.json();
}).then(data => {
    console.log(data);
})

function formSubmitHandler(event) {
    event.preventDefault();
    let searchedCity = cityInputEl.value;
    let searchedState = stateInputEl.value;
    let newUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchedCity},${searchedState},US&limit=1&appid=2bd870c3ff12388ac354b0598f17ac0d`
    fetch(newUrl).then(response => {
        return response.json();
    }).then(data => {
        let searchedLat = data[0].lat;
        let searchedLon = data[0].lon;
        let searchUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${searchedLat}&lon=${searchedLon}&units=imperial&appid=2bd870c3ff12388ac354b0598f17ac0d`
        let newDiv = document.createElement('div');
        newDiv.classList.add('btn');
        newDiv.classList.add('btn-secondary');
        newDiv.classList.add('search-history');
        newDiv.dataset.url = searchUrl;
        newDiv.textContent = searchedCity;
        history.append(newDiv);
        fetch(searchUrl).then(response => {
            return response.json();
        }).then(data => {
            let i = 0;
            popArray.forEach(element => {
                let currentDay = new Date;
                let nextDay = currentDay;
                nextDay.setDate(currentDay.getDate() + i);
                let displayDay = Intl.DateTimeFormat('en-US').format(nextDay);
                element.children('.title').text(displayDay);
                element.children('.title').append("<img>");
                element.children('.title').find("img").attr("src", `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`);
                element.children('.temp').text(data.daily[i].temp.day + 'F');
                element.children('.wind').text(data.daily[i].wind_speed);
                element.children('.humid').text(data.daily[i].humidity);
                element.children('.uv').text(data.daily[i].uvi);
                i++
            })
        })
    })
    cityInputEl.value = '';
    stateInputEl.value = '';
}

const searchHistory = $('#history');

searchHistory.on('click', event => {
    console.log($(event.currentTarget))
    let oldSearch = $(event.currentTarget).children().data('url');
    fetch(oldSearch).then(response => {
        return response.json();
    }).then(data => {
        let i = 0;
        popArray.forEach(element => {
            let currentDay = new Date;
            let nextDay = currentDay;
            nextDay.setDate(currentDay.getDate() + i);
            let displayDay = Intl.DateTimeFormat('en-US').format(nextDay);
            element.children('.title').text(displayDay);
            element.children('.title').append("<img>");
            element.children('.title').find("img").attr("src", `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`);
            element.children('.temp').text(data.daily[i].temp.day + 'F');
            element.children('.wind').text(data.daily[i].wind_speed);
            element.children('.humid').text(data.daily[i].humidity);
            element.children('.uv').text(data.daily[i].uvi);
            i++
        })
    })
})