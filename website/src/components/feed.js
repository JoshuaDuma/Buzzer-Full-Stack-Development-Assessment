import React from 'react';
import { Route, Routes, Link, BrowserRouter } from 'react-router-dom';

export default class feed extends React.Component {
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
      fetch('https://buzzerapi.joshuaduma.ca/feed?' + 'limit=' + this.limit)
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
                Recent Posts
            </div>
            <ul className="list-group list-group-flush">
            {
                this.state.results.map(el =>
                    <li className="list-group-item" key={el._id}>
                        <div className="row">
                            <div className="col-2">
                            <Link to={"/user/" + el.name + "?limit=25"}><img height="auto" width="100%" src={el.profile_pic} className="img-fluid rounded-circle mt-2" /></Link>
                            </div>
                            <div className="col-10">
                                <Link to={"/user/" + el.name + "?limit=25"} className="fw-bold h5 card-title p-0 m-0 btn btn-none">{el.name}</Link>
                                <span>
                                    - {this.modifydate(el.date_posted)}
                                </span>
                                <p className="card-text">{el.post_content}</p>
                                <div className="row row-cols-2 row-cols-lg-2 g-2 g-lg-3 clear-float">
                                    <div className="col">
                                        <Link to={"/user/" + el.name + "?limit=25"} className="p-0 btn btn-none text-muted disabled"><i className="far fa-heart"></i> {el.likes}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                )
            }
            {
            this.state.results.length < this.state.totalPosts
            &&
            <div>
                <button className='w-100 btn btn-outline-primary' onClick={this.loadMore}>
                    Load More
                </button>
            </div>
            }
            {
            this.state.results.length >= this.state.totalPosts
            &&
            <div className=" mt-3 text-center text-muted">
                End of posts
            </div>
            }
            </ul>
        </div>
    )
  }
}