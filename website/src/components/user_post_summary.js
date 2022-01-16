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
      fetch('https://buzzerapi.joshuaduma.ca/user_post_summary')
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
              results: data,
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
            User Activity in the Past 30 Days
            </div>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Total Posts</th>
                    <th scope="col">Total likes</th>
                    </tr>
                </thead>
                <tbody>
                {
                    this.state.results.map(el =>
                        <tr>
                            <th scope="row">{el.name}</th>
                            <td>{el.totalPosts}</td>
                            <td>{el.totalLikes}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
  }
}