import React, { Suspense } from 'react';
import { Route, Routes, Link, BrowserRouter } from 'react-router-dom';
const UserSearchComponent = React.lazy(() => import('../components/user_search'));
const UserPageComponent = React.lazy(() => import('../components/user_page'));

export default class User extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="container">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="row">
          <div className="col-sm-12 col-md-4 border-right">
              <UserSearchComponent />
            </div>
          <div className="col-sm-12 col-md-8">
              <UserPageComponent />
          </div>
        </div>
      </Suspense>
    </div>
    )
  }
} 