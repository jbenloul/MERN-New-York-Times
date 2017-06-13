// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Geocoder API
var NYTAPI = "6b6d904ec694461f82e37141f540ee1e";
var beginDate = 1
var endDate = 2
// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(title) {

    console.log(title);

    // Figure out the geolocation
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + NYTAPI + "&q="+ title 
        //+ "begin_date=20150101end_date20170609";

        // Find articles based on the query
        return axios.get(queryURL).then(function(response) {
          console.log(response.data.response.docs);

            return response.data.response.docs;
        });
    },


  // This function hits our own server to retrieve the record of query results
  getSaved: function() {
    return axios.get("/api");
  },

  // This function posts new searches to our database.
  postArticle: function(title, date, url) {
    return axios.post("/api", { title, date, url });
  }
};

// We export the API helper
module.exports = helper;
