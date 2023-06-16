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
  PAGE LOAD ACTIONS
  ----------------------------------------------------------------------------
  Create a new toast with the message "Hello World!" that shows for 1500ms
  - SuccessToast is a child of Toast, with a pre-set icon

  Run the getWeatherData function with the parameters "San Francisco", and
  a callback function to log the data to the console (for testing purposes)
*/

$(document).ready(function () {
  new SuccessToast("Hello World!", 1500); // <-- you can remove this
  /*
     STEP 4: Let's try out our getWeatherData function!
     ----------------------------------------------------------------------------
     We'll be using the city "San Francisco" and a callback that prints the data
     to the console. We'll use the default parameters for type and units
  */
  getWeatherData(/* [CHANGE THIS FOR STEP 4] */);

  /*
     STEP 10: Let's run our new functions!
     ----------------------------------------------------------------------------
     You can delete the line from STEP 4, and uncomment the line below, adding
     the city as "San Francisco", and a callback to addForecastCards with the
     new weather data as a parameter!
  */
  // getWeatherData( [CHANGE THIS FOR STEP 10] ); // <-- [ UNCOMMENT FOR STEP 10 ]
});

/* ---------------------------------------------------------------------------- */
/* -------------------------   [ START CODE BELOW ]   ------------------------- */
/* ---------------------------------------------------------------------------- */


// API key for OpenWeatherMap
const API_KEY = "[ find yours at https://home.openweathermap.org/api_keys ]";

function getWeatherData(
  city, // the city to get the weather data for
  callback, // the function to call when the data is received
  type = "forecast", // defaults to "forecast", can be "weather"
  units = "imperial" // optional parameter, if not provided it defaults to US units
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
  */
  
  let requestUrl = "https://api.openweathermap.org/data/2.5/"
  
  requestUrl += `[STEP 1: ADD YOUR TEMPLATE LITERAL STRING CONTENTS HERE]`;

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
  */

  $.getJSON({
    
      url: requestUrl, // the url to make the request to (built in STEP 1)

      error: null, // <-- [CHANGE THIS FOR STEP 2]
      
      success: (result) => { // The function to call when the request is successful
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

        callback(/* [CHANGE THIS FOR STEP 3] */);
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
  }
  // reformat the date to HH AM/PM MM/DD
  day.date = day.date.split(", ").reverse().join(" ")

  // -------------------------------------------------------------------------------
  //                     [ FOR STEP 6, EDIT CONTENT BELOW ]
  return $(`
    <div class="forecast_card" title="${new Date(day_raw.dt).toString()}">
      <div class="forecast_card__date">${day.date}</div>
      <div class="forecast_card__weather" title="${day.weather.description}>
        ${day.weather.main}
      </div>
      <div class="forecast_card__temp">${day.temp}°</div>
    </div>
    `)
  // add a click event listener to the card to show some more info
    .click(() => {
      new InfoToast(
        `Feels like ${day.feels_like}° with a high of ${day.high}° and low of ${day.low}°`,
        2000
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

    /* [ WRITE YOUR CODE FOR STEP 7 HERE] */

  });
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
