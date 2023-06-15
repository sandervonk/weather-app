// WEATHER APP | This file will contain our Javascript Code

// Resources:
//   You can find your API key here: https://home.openweathermap.org/api_keys
//   README for @svonk/utils (though this is an adapted version for
//     a non-node environment): https://code.svonk.me/util/#readme
//   The project slides: https://mvhacks-slides.svonk.me
//   The project code: https://mvhacks-code.svonk.me

// We'll be using jQuery for this project, which is a library that contains
// a lot of useful functions for Javascript. We'll primarily be using the
// $("selector") syntax, which serves similarly to document.querySelector

// We'll also be using @svonk/utils, which is a library I wrote to make
// javascript web development more streamlined. It's not necessary, but
// it allows us to focus on writing this app instead of writing boilerplate
// code. Since this is a non-node environment, I've adapted it to work.

// Thankfully, we're able to import the modified version as a module, which
// will allow us to import specific functions from it. We'll be using the
// syntax import { function } from "module", which is a new feature in JS.

// We'll primarily use the Toast and Popup classes from @svonk/utils, which
// will allow us to display messages to the user. We can import them like so:
import { Toast, SuccessToast, Popup } from "/svonk-util/util.js";

// jQuery comes with its own AJAX function and event handlers, which
// we'll be using to make requests to the OpenWeatherMap API and to handle
// interactions with the page. Here's an example:

// create a new toast when the page loads with jquery
$(document).ready(function () {
  // create a new toast with the message "Hello World!" that shows for 1500ms
  new SuccessToast("Hello World!", 1500); // SuccessToast is a child of Toast, with a pre-set icon
});

// Our API key for OpenWeatherMap
const API_KEY = "[ find it at https://home.openweathermap.org/api_keys ]";
