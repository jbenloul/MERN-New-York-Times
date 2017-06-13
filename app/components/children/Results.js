// Include React
var React = require("react");

var helpers = require('.././utils/helpers')

// Creating the Results component
var Results = React.createClass({
  // Here we render the function
  getInitialState: function() {
    return { title: "", date: "", url: "" };
  },

  saveButton: function(title, date, url) {
   helpers.postArticle(title, date, url).then(function(response) {
    console.log("Current Saved", response.data);
    this.props.setSaved;
  }.bind(this));
  },

  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Article Results</h3>
        </div>
        <div className="panel-body text-center">
           {this.props.results.map(function(search, i) {
           return (
           <div>
            
              <p key={i} className="text-left col-md-10 col-xs-8">{search.lead_paragraph} 
              </p> 
              <br></br>

                   <button onClick={()=>this.saveButton(search.lead_paragraph, search.pub_date, search.web_url)} 
                   className="btn btn-primary col-md-1 col-xs-2"> Save </button>
                      <a target="_blank" href={search.web_url}> 
                    <button className="btn btn-danger col-md-1 col-xs-2"> Read More </button> 
                  </a>
              <br></br>
              <hr></hr>
           </div>
            );
          }.bind(this))}

        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Results;


            {/*onclick, pass a function
            created here or passed down?
            need to pass up the state or props.
            */}
//{search.pub_date}
