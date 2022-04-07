# weather-dashboard-api-challenge

When the user loads the page a search form with inputs corresponding to city and state are loaded
the form will autofocus to the city input. When the user enters a city and state and then either hits enter 
or clicks the "Get Weather" button to submit the form an eventhandler in the linked JavaScript file 
will prevent the default behavior of the page reloading and take the city and state values, 
assigning them to variables.

These variables will be interpolated into the api call url in order to first take the city and state
and get their latitude and longitude values. Those values will then be interpolated into anoter api call url
in order to get an object containing various weather data about the location. The functioning handling this second call
will first take the searched city and state values as well as the url calling the forecast and assign them 
separately as data values to a div that will be appending to the search history section. Next it will take the searched city/state values and make it the text to the first section on the main/todays weather div.
The function will then parse through the forecast object getting and assigning the desired weather data
to the respective divs according to date and value. If the weather has a good/caution/danger UVI a conditional statement
will assign that div a background color of green/orange/red respectively.

The user can search for another city/state and that will be added to the history and then have it's weather
information displayed. They can also click on one of the history divs, which will have the appearance of a 
bootstrap button, to call a function similar to the original forecast handler which will call the forecast
from the url stored as a data attributed in the div and title the page with the other data attribute holding
city and state. The page will then be filled out just like the previous function the only difference being
an additional history button will not be created.

https://jpmare29.github.io/weather-dashboard-api-challenge/

![2022-04-06](https://user-images.githubusercontent.com/74988217/162101888-0fecc3e7-9235-4df1-a9c0-819a78935f69.png)
