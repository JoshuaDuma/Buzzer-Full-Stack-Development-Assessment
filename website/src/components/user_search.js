import React from 'react';
import { Route, Routes, Link, BrowserRouter } from 'react-router-dom';

export default class user_search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      results: [] 
    };

    this._onChange = this._onChange.bind(this);
    this._clearSearch = this._clearSearch.bind(this);
    this.reloadPage = this.reloadPage.bind(this);
  }

  reloadPage(event){
    // If on the user page, reload.
    if(window.location.pathname.split("/")[1] == 'user'){
      window.location.navigate("/user/" + event + "?limit=25")
    }
  }

  _clearSearch(event){
    this.reloadPage(event)
    this.setState({
      results: []
    });
  }

  _onChange(event){
    const that = this;
    if(event.target.value != ''){
      fetch('http://localhost:4111/search_users?name=' + event.target.value)
      .then(
        function (response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
  
          // Examine the text in the response
          response.json().then(function (data) {
            that.setState({
              results: data
            });
          });
        }
      )
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
      });
    }
    else{
      that.setState({
        results: [  ]
      });
    }
  }

  render() {
    return(
    <div className="container">
        <div className='hint-wrapper'>
          <label htmlFor="exampleDataList" className="form-label h4">User Search</label>
          <input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." onChange={this._onChange} onClick={this._onChange} />
          <ul className="list-group datalist-wrapper">
            {
              this.state.results.map(el =>
                <Link to={"/user/" + el.name + "?limit=25"} key={el._id} onClick={this._clearSearch} className="list-group-item list-group-item-action"><span className="fw-bold">{el.name}</span><span className="text-muted"> {el.company}</span></Link>
              )
            }
          </ul>
        </div>
      </div>
    )
  }
}