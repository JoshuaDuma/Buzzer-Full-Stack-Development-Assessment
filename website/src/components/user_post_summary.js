import React from 'react';
import { Route, Routes, Link, BrowserRouter } from 'react-router-dom';

export default class user_post_summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      totalPosts: 0,
      results: [] 
    };

    this.loadFeed = this.loadFeed.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore(){
      this.limit += this.limit
      this.loadFeed()
  }

  componentDidMount() {
      this.loadFeed()
  }

  componentWillUnmount() { 
  }

  mtoM = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec'
  ]

  modifydate(date){
    var split = date.split("/")
    var day, month, year
    day = split[0]
    month = this.mtoM[parseInt(split[1])-1]
    year = split[2]
    return month + " " + day + ", " + year
  }

  limit = 25
  page = 1

  loadFeed(){
    const that = this;
      fetch('http://localhost:4111/feed?' + 'limit=' + this.limit)
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
              results: data.results,
              totalPosts: data.hits
            });
          });
        }
      )
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
      });
  }

  render() {
    return(
        <div className="container border-right">
            <div className="mb-2 h4">
                User Activity Table
            </div>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
  }
}