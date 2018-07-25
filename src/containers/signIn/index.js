import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { message as toast } from 'antd';

import {setStorage,getStorage, removeStorage} from '../../utils/storage';
import {
  USERNAME,
  PASSWORD,
  WEBSITE_NAME,
  COPYRIGHT,
} from '../../constants/common';

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
      toast.warning (location.state.message);
    }

    const username = getStorage (USERNAME);
    const password = getStorage (PASSWORD);

    this.setState ({
      username,
      password,
    });
  }

  handleSubmit = e => {
    e.preventDefault ();
    this.props.form.validateFields (async (err, values) => {
      if (!err) {
        await this.props.signIn ({
          userName: values.username,
          password: values.password,
        });

        let {isSuccess, message} = this.props.state;

        if (isSuccess) {
          toast.success ('登陆成功');
        } else {
          toast.error (message);
        }

        if (values.remember === true) {
          setStorage (USERNAME, values.username);
          setStorage (PASSWORD, values.password);
        } else {
          removeStorage (USERNAME, values.username);
          removeStorage (PASSWORD, values.password);
        }
      }
    });
  };

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
            <LoginForm onSubmit={this.handleSubmit} />
            <p>
              &copy; {COPYRIGHT}
            </p>
          </div>
        </div>;
  }
}
export default SignIn;
