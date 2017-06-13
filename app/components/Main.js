// Include React
var React = require("react");

// Here we include all of the sub-components
var Search = require("./children/Search");
var Results = require("./children/Results");
var Saved = require("./children/Saved");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  // Note how we added in this saved state variable
  getInitialState: function() {
    return { searchTerm: "", results: [], saved: []};
  },

  // The moment the page renders get the History
  componentDidMount: function() {
    // Get the latest history.
    helpers.getSaved().then(function(response) {
      console.log(response);
      if (response !== this.state.saved) {
        console.log("saved", response.data);
        this.setState({ saved: response.data });
      }
    }.bind(this));
  },

  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function() {

    // Run the query for the address
    helpers.runQuery(this.state.searchTerm).then(function(data) {
      if (data !== this.state.results) {
         console.log(data[0].snippet);
        this.setState({ results: data });

      }
    }.bind(this));
  },
  // This function allows childrens to update the parent.
  setTerm: function(title) {
    this.setState({ searchTerm: title });
  },

  setSaved: function(response){
        this.setState({ saved: this.state.saved.concat(response) });
  },

  // Here we render the function
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2 className="text-center">New York Times Article Finder!</h2>
            <p className="text-center">
              <em>Search for any keyword!</em>
            </p>
          </div>

          <div className="col-md-12">
            <Search setTerm={this.setTerm} />
          </div>

          <div className="col-md-12">
            <Results results={this.state.results} setSaved={this.state.setSaved} />
          </div>
        </div>

        <div className="row">
          <Saved saved={this.state.saved} />
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
