import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import {getStorage} from '../utils/storage';
import {USER_ID, TOKEN} from '../constants/common';

@connect (state => ({
  state: state.userReducer,
}))
class RouteChecker extends React.Component {
  componentWillMount () {
    const userId = getStorage (USER_ID);
    const token = getStorage (TOKEN);

    if (token && userId) {
      this.setState ({
        isAuthenticated: true,
      });
    }
  }

  handleRender = () => {
    const {location, state, ComposedComponent} = this.props;
    console.log(this.props);
    if (state.isAuthenticated) {
      return <ComposedComponent {...this.props} />;
    } else {
      return (
        <Redirect
          to={{
            pathname: '/signin',
            state: {
              from: location,
              message: '请您先登录，谢谢！',
            },
          }}
        />
      );
    }
  };

  render () {
    const {...rest} = this.props;

    return <Route {...rest} render={this.handleRender} />;
  }
}

export default RouteChecker;
