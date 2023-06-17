/* ------------------------------------------------------------------------------ */
/* - © 2023 Sander Vonk | Requires permission for replication or commercial use - */
/* ------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------ */
/* -------------- WEATHER APP WORKSHOP | MVHacks 2023 | 06/15/2023 -------------- */
/* ------------------------------------------------------------------------------ */
/* ----------------- This file will contain our Javascript Code ----------------- */
/* ------------------------------------------------------------------------------ */

/* 
  RESOURCES
  ----------------------------------------------------------------------------
    You can find your API key here: https://home.openweathermap.org/api_keys
    README for @svonk/utils (though this is an adapted version for
      a non-node environment): https://code.svonk.me/util/#readme
    The project slides: https://mvhacks-slides.svonk.me
    The project code: https://mvhacks-code.svonk.me
*/

/* 
  GETTING TO KNOW THE TECHNOLOGIES
  ----------------------------------------------------------------------------
  We'll be using jQuery for this project, which is a library that contains
  a lot of useful functions for Javascript. We'll primarily be using the
  $("selector") syntax, which serves similarly to document.querySelector
  
  jQuery also comes with its own AJAX function and event handlers, which
  we'll be using to make requests to the OpenWeatherMap API and to handle
  interactions with the page. Here's an example:
  
  We'll also be using @svonk/utils, which is a library I wrote to make
  javascript web development more streamlined. It's not necessary, but
  it allows us to focus on writing this app instead of writing boilerplate
  code. Since this is a non-node environment, I've adapted it to work.

  Thankfully, we're able to import the modified version as a module, which
  will allow us to import specific functions from it. We'll be using the
  syntax import { function } from "module", which is a new feature in JS.

  We'll primarily use the Toast and Popup classes from @svonk/utils, which
  will allow us to display messages to the user. We can import them like so: 
*/

import { InfoToast, SuccessToast, ErrorToast } from "/svonk-util/util.js";

/* 
  FUNCTION STRUCTURE
  ----------------------------------------------------------------------------
  We'll be using a lot of functions in this project, so let's go over how to
  write them.

  The structure of a function is:

  function name (parameters) {
    body
  }

  The parameters are the variables that the function takes as input, and the
  body is the code that the function runs. We can call a function by writing
  its name, followed by parentheses, with the parameters inside the 
  parentheses, like this:

  name(parameters)
*/


/*
  STEP 12: Let's make it so that the city isn't static
  ----------------------------------------------------------------------------
  Now that we've built the infastructure for our app to show the forecast, 
  let's make it so that we can change the city that we're getting the forecast
  for!

  Uncomment the line below and change your getWeatherData() call from step 10
  to use the current_city variable as the city parameter!
*/

let current_city = "San Francisco";

// 
let city_data = {}

function init(){
  new SuccessToast("Hello World!", 1500); // <-- you can remove this if you like
  /*
     STEP 4: Let's try out our getWeatherData function!
     ----------------------------------------------------------------------------
     We'll be using the city "San Francisco" and a callback that prints the data
     to the console. We'll use the default parameters for type and units
  */
  // getWeatherData("San Francisco", (r)=>{console.log(r)});

  /*
     STEP 10: Let's run our new functions!
     ----------------------------------------------------------------------------
     You can delete the line from STEP 4, and uncomment the line below, adding
     the city as "San Francisco", and a callback to addForecastCards with the
     new weather data as a parameter!
  */
  getWeatherData(current_city, (r)=>{addForecastCards(r)} );

  // getWeatherData(current_city, (r)=>{setCurrentWeather(r)}, "weather") <-- [ UNCOMMENT FOR STEP 15 ]
};

// Run init() when the page is ready
$(document).ready(init);

/* ---------------------------------------------------------------------------- */
/* -------------------------   [ START CODE BELOW ]   ------------------------- */
/* ---------------------------------------------------------------------------- */


// API key for OpenWeatherMap
const API_KEY = "[ find yours at https://home.openweathermap.org/api_keys ]";
// default units for the weather data
const default_unit = "standard";
// function to get the unit symbol for a unit
const getUnitSymbol = (unit) => {
  switch (unit) {
    case "imperial":
      return "${getUnitSymbol(default_unit)}F";
    case "metric":
      return "${getUnitSymbol(default_unit)}C";
    default:
      return " K";
  }
}

function getWeatherData(
  city, // the city to get the weather data for
  callback, // the function to call when the data is received
  type = "forecast", // defaults to "forecast", can be "weather"
  units = default_unit // optional parameter, if not provided it defaults to US units
) {
  // ensure that all needed parameters are present
  if (!(city && callback)) {
    new ErrorToast("Could not fetch data", "missing parameters");
    return;
    // ensure that they are of the correct type
  } else if (typeof city !== "string" || typeof callback !== "function") {
    new ErrorToast("Could not fetch data", "invalid parameters");
    return;
  }
  /*
   STEP 1: If the parameters are valid, let's start building our request link.
   --------------------------------------------------------------------------------
    The link to make a request to the OpenWeatherMap API is:
    https://api.openweathermap.org/data/2.5/{type}?q={city}&appid={API_KEY}&units={units}
  
    We can use a template literal to build this link, which is a string, surrounded by 
    backquotes (`) that allows us to insert variables into it. We'll use the syntax 
    ${variable} to insert a variable.
  
    Try it out! 
    
    Edit the second part of the link, being added to requestUrl to fit the format
    
    IMPORTANT: Don't forget to use the result of encodeURIComponent on the city, 
    to ensure that the city name is properly formatted for the url! Spaces and 
    special characters could cause issues, so we'll use encodeURIComponent to 
    ensure that the city name is properly formatted for the url.

    Ex: encodeURIComponent("San Francisco") returns "San%20Francisco"
  */
  
  let requestUrl = "https://api.openweathermap.org/data/2.5/"
  
  requestUrl += `${type}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${units}`;

  /*
    STEP 2: Making the request using jQuery's AJAX function
    --------------------------------------------------------------------------------
    This function ($.getJSON) takes an object as a parameter, with the properties:
    - url: the url to make the request to
    - success: the function to call when the request is successful
    - error: the function to call when the request fails

    We'll be using arrow functions, which are a shorthand for writing functions

    The syntax for arrow functions is: (parameters) => { body }

    Try writing an error function that creates a new ErrorToast with the error code
    that the error function receives as a parameter, remembering that the constructor
    for ErrorToast is:
    
    new ErrorToast("warning message", "error code")

    In this case, the error code will equal to:

    err?.responseJSON?.message || err?.status || err || "unknown error"

    Which just means that if err.responseJSON.message is defined, use that, otherwise
    use err.status, otherwise use err, otherwise use "unknown error." The ?. syntax is
    called optional chaining, and is a shorthand for checking if a property is defined
    before accessing it, which allows us to avoid errors if the property is undefined.
  */

  $.getJSON({
    
      url: requestUrl, // the url to make the request to (built in STEP 1)

      error: (err) => {
        // Completed STEP 2
        new ErrorToast("Could not fetch data", err?.responseJSON?.message || err?.status || err || "unknown error");
      },

    success: (result) => { // The function to call when the request is successful
        // save the city data for further use
        city_data = result.city;
        // log data to console for testing (can remove if you like)
        console.log(`%cWeather Data (${type}): `, "background:linear-gradient(45deg, #3ab7f7 0%, #2ba0db 45%, #1c89c0 100%);color:white;padding:10px 20px;font-family:Lato,sans-serif;font-weight:bold;font-size:1.5em", result);
        /*
          STEP 3: Handling the data
          --------------------------------------------------------------------------
          Call the callback function with the data: a singular day if it's a weather 
          request, or the array of days if it's a forecast request. We'll use: 
          
          condition ? true_condition : false_condition

          This is called a ternary operator, shorthand for:

            if (condition) {
              return true_condition;
            } else {
              return false_condition;
            }

          Below, we'll use it to check if the type is "forecast", and if it is, we'll
          return the list of days, otherwise we'll return the singular day.

          Fill in the parameters for the callback function below! If the type is 
          forecast (type === "forecast"), return the list of days (result.list),
          otherwise return the singular day (result).
        */

        callback(type === "forecast" ? result.list : result);
      }
    }
  );
}




/*
  STEP 6: Tweak a function that creates a weather data card from the data
  ----------------------------------------------------------------------------------
  This function takes a singular day of weather data as a parameter, and creates
  an HTML (jQuery) element that displays the data in a card, as well as does another
  action when clicked. 

  If you like, you may edit the content of the card, and what happens when it's
  clicked. You can also add more elements to the card, or change the layout of the
  card. 
  
  You can find the icons in "img/weather", though they're already all set up for you, 
  so you don't need to change them.

  We need to add ".svg" or ".png" to the end of the icon code you can use 
  
  ___ + ".png"
  
  to do this for example.
  
  NOTE that both .png and .svg files are provided for each icon, so you can use either,
  but you must add the file extension to the end of the icon code. Just pick whichever
  you like. PNG files are bitmaps, so have pixels, while SVG files are vector images,
  so they scale better, but are more complex, and may not always work as intended
  
*/

function makePreviewHTML(day_raw) {
    // ensure that all needed parameters are present
  if (!day_raw) {
    new ErrorToast("Could not create preview", "missing data");
    return;
  }
  // ensure that they are of the correct type
  else if (typeof day_raw !== "object" || !(day_raw.main && day_raw.weather && day_raw.dt)) {
    new ErrorToast("Could not create preview", "invalid data");
    return;
  }
  // set options for refomatting the time
  const options = {
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    hour12: true
  }
  // reformat the data for easier access
  let day = {
    date: (new Date(day_raw.dt * 1000)).toLocaleString("en-US", options),
    //       ^ formats the date to MM/DD, HH AM/PM
    temp: Math.round(day_raw.main.temp),
    feels_like: day_raw.main.feels_like,
    high: day_raw.main.temp_max,
    low: day_raw.main.temp_min,
    weather: day_raw.weather[0],
    icon: day_raw.weather[0].icon + ".png"
  }
  // reformat the date to HH AM/PM MM/DD
  day.date = day.date.split(", ").reverse().join(" ")

  // -------------------------------------------------------------------------------
  //                   [ FOR STEP 6, YOU MAY EDIT THE CONTENT BELOW ]
  return $(`
    <div class="forecast_card" weather=${day.weather.main.toLowerCase().replace(" ", "")}>
      <img class="forecast_card__icon" alt="${day.weather.description}" src="img/weather/${day.icon}" />
      <div class="forecast_card_text">${day.date}
        <p class="forecast_card__temp">${day.temp}${getUnitSymbol(default_unit)}</p>
      </div>
    </div>
    `)
  // add a click event listener to the card to show some more info
    .click(() => {
      new InfoToast(
        `Feels like ${day.feels_like}${getUnitSymbol(default_unit)} with a high of ${day.high}${getUnitSymbol(default_unit)} and low of ${day.low}${getUnitSymbol(default_unit)}`,
        4000
      )
    })
  //                            [ END OF STEP 6 ]
  // -------------------------------------------------------------------------------
}


/*
  STEP 7: Create and add our forecast cards to the page
  ----------------------------------------------------------------------------------
  Now that we have a function that creates a card, let's use it to create a card for
  each data point in the forecast, and add it to forecast card row!
*/
function addForecastCards(forecast) {
  // ensure that all needed parameters are present
  if (!forecast) {
    new ErrorToast("Could not add forecast cards", "missing data");
    return;
  }
  // ensure that they are of the correct type
  else if (typeof forecast !== "object") {
    new ErrorToast("Could not add forecast cards", "invalid data");
    return;
  }
  // clear the forecast card row
  $(".forecast_card_row").html("");
    /*
    STEP 7: Create and display forecast cards
    -----------------------------------------------------------------------------
    We'll be using the makePreviewHTML function we created in STEP 6 when looping
    through each day in the forecast, adding the result to the forecast card row.

    Try it out! use the makePreviewHTML function to create a card for the day, 
    then append it to the #forecast_card_row element using jQuery's append 
    function, which takes an HTML element as a parameter and adds the jQuery 
    element (in our case the output of makePreviewHTML(day) its called on as a 
    child of the parameter element.

    Ex: $("<p>hi</p>").append($(document.body)) will add a paragraph element with
    the text "hi" to the body of the page.

  */
  forecast.forEach((day) => {

    $("#forecast_card_row").append(makePreviewHTML(day));

  });
  new SuccessToast(`Forecast for ${city_data.name} (${city_data.coord.lat}, ${city_data.coord.lon}) loaded successfully`, 4000);
}

/*
  STEP 11: Nicer scroll
  ----------------------------------------------------------------------------------
  Let's make it so that when the user scrolls using the mouse wheel on 
  "#forecast_card_row", it scrolls it horizontally instead of vertically, since
  there's horizontal overflow on the row, but some devices might only have a up and
  down scroll function

  we'll use the wheel event, which is fired when the user scrolls using the mouse
  wheel, and the scrollLeft function, which sets the horizontal scroll position of 
  an element to the value passed to it.

  Right now, our delta (change in scroll position) is null, so the scrollLeft just 
  stays the same.

  Set the event that should trigger this listener ("scroll") to get started.

  Then change the function to use the e.originalEvent.deltaY property, which is 
  the change in scroll position in the y direction (vertical). This will make it so 
  that the scrollLeft changes by the same amount as the scroll input in the y 
  direction, enabling us to scroll horizontally using the mouse wheel!
*/

$("#forecast_card_row").on("wheel", (e) => {

  // prevent the default scroll action
  e.preventDefault();
  
  let delta = e.originalEvent.deltaY;

  // scroll the forecast card row horizontally
  $("#forecast_card_row").scrollLeft($("#forecast_card_row").scrollLeft() + delta);
});


/*
  STEP 13: Let's make it so that the user can change the city!
  ----------------------------------------------------------------------------
  Now that we have a city input, let's make a way to refresh the visuals with
  the new city by:
  - getting the city from the input (find $("#city_input").val())
  - set the current_city variable
  - run the init() function to populate the screen with the new forecast
*/

function setCity() {
  new InfoToast("Setting city to " + $("#city_input").val(), 500);
  
  // Completed STEP 13
  current_city = $("#city_input").val();
  init();
}

/*
  STEP 14: Let's make the city input work!
  ----------------------------------------------------------------------------
  Now that we have a way to set the city, let's make it so that the user can
  change the city by:
  - adding a click event listener to the #city_submit button
  - calling the setCity function when the button is clicked
  - adding a keyup event listener to the #city_input input
  - check if the key pressed was the enter key (e.code === "Enter") and if it
    was, call the setCity function.
*/

$("#city_submit").click(setCity);
$("#city_input").keyup((e) => {
  if (" [ COMPLETE THIS FOR STEP 14 ] ") {
    setCity();
  }
});


/*
  STEP 15: Let's show the current weather as well
  ----------------------------------------------------------------------------
  Let's brighten up the top half of the page by showing the current weather as
  well as the forecast! instead of dynamically creating everything, this time
  we'll be using jquery to set the text of the pre-existing elements, using
  the new data we have from the current weather request!

  We'll be using the same data as in STEP 3, but this time we'll be using the
  current weather data instead of the forecast data. We'll also be using the
  .text() function, which sets the text of an element to the value passed to it.

  First, uncomment the indicated line in the definition of the function init()

  Then, let's use jQuery's .toggleClass("class_name", boolean) function to
  set the class of the body to add a class of "dark" to the body if the
  icon is a night icon (.includes("n")), and remove it if it's a day icon!

  Hint: the icon is current_weather.weather[0].icon
*/

function setCurrentWeather(current_weather) {
  // ensure that all needed parameters are present
  if (!current_weather) {
    new ErrorToast("Could not set current weather", "missing data");
    return;
  }
  // ensure that data is of the correct type
  else if (typeof current_weather !== "object") {
    new ErrorToast("Could not set current weather", "invalid data");
    return;
  }
  $(document.body).toggleClass("dark", /* STEP 15 [ ADD CODE HERE ] */);

  // add the current weather data to the page
  $("#current_location").text(current_weather.name+", "+current_weather.sys.country);
  $("#current_temp").text(current_weather.main.temp);
  $("#current_min_temp").text(current_weather.main.temp_min);
  $("#current_max_temp").text(current_weather.main.temp_max);
  $("#current_icon").attr("src", "img/weather/" + current_weather.weather[0].icon + ".png");
}






/*
  DEBUG: Enable some functions outside this scope
  --------------------------------------------------------------------------------
  Since this is a module (nessesary to use imports), we can't call its functions
  outside of when it's imported. To get around this for testing, we'll add them to 
  the window scope (the global scope) so that we can call them from the console!

  No need to change anything below, feel free to remove once you're done testing!
*/
window.getWeatherData = getWeatherData;
window.makePreviewHTML = makePreviewHTML;
window.addForecastCards = addForecastCards;

