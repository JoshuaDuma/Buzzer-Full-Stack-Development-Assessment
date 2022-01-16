import React, { Suspense } from 'react';
import { Route, Routes, Link, BrowserRouter } from 'react-router-dom';
const UserSearchComponent = React.lazy(() => import('../components/user_search'));
const UserPostSummaryComponent = React.lazy(() => import('../components/user_post_summary'));

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
    <div className="container">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <UserPostSummaryComponent /> 
          </div>
        </div>
      </Suspense>
    </div>
    )
  }
} 