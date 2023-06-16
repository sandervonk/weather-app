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

import { Toast, SuccessToast, ErrorToast, Popup } from "/svonk-util/util.js";

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
  STEP 5: Create a function that displays the weather data for a city
  ----------------------------------------------------------------------------------
*/