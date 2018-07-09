import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {message} from 'antd';

import {getStorage} from '../../utils/storage';
import {
  USERNAME,
  PASSWORD,
  WEBSITE_NAME,
  COPYRIGHT,
} from '../../constants/common';
// import {signInAction} from '../../actions';
import logo from '../../assets/images/logo.png';
import LoginForm from './loginForm';

@connect (state => ({
  state: state.userReducer,
}))
class SignIn extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount () {
    let {location} = this.props;
    if (location.state) {
      message.warning (location.state.message);
    }

    const username = getStorage (USERNAME);
    const password = getStorage (PASSWORD);

    this.setState ({
      username,
      password,
    });
  }

  render () {
    const {state} = this.props;

    return state.isAuthenticated
      ? <Redirect
          to={{
            pathname: '/home',
            form: {
              from: this.props.location,
            },
          }}
        />
      : <div className="page page-login vertical-align">
          <div className="page-content vertical-align-middle">
            <div className="brand">
              <img src={logo} alt="..." />
              <h2 className="brand-text">
                {WEBSITE_NAME}
              </h2>
            </div>
            <LoginForm />
            <p>
              &copy; {COPYRIGHT}
            </p>
          </div>
        </div>;
  }
}
export default SignIn;
