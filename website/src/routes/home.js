import React, { Suspense } from 'react';
import { Route, Routes, Link, BrowserRouter } from 'react-router-dom';
const UserSearchComponent = React.lazy(() => import('../components/user_search'));
const FeedComponent = React.lazy(() => import('../components/feed'));

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
    <div className="container">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="row">
          <div className="col-sm-12 col-md-4 border-right mb-4">
              <UserSearchComponent />
            </div>
          <div className="col-sm-12 col-md-8">
            <FeedComponent /> 
          </div>
        </div>
      </Suspense>
    </div>
    )
  }
} 