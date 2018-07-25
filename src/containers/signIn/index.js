import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { Spin, Button, message as toast } from 'antd';
import { FormattedMessage } from 'react-intl';

import storage from '../../utils/storage';
import {
  USERNAME,
  PASSWORD,
  WEBSITE_NAME,
  COPYRIGHT,
} from '../../constants/common';
import {signInAction} from '../../actions';
import logo from '../../assets/images/logo.png';
import LoginForm from './loginForm';

@connect (
  state => ({
    state: state.signInReducer,
  }),
  dispatch => ({
    signIn: user => dispatch (signInAction.signIn (user)),
  })
)
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

    const username = storage.get (USERNAME);
    const password = storage.get (PASSWORD);

    this.setState ({
      username,
      password,
    });
  }

  handleSubmit = e => {
    e.preventDefault ();
    this.loginForm.props.form.validateFields (async (err, values) => {
      if (!err) {
        await this.props.signIn ({
          userName: values.username,
          password: values.password,
        });

        let {state} = this.props;
        if (state.isSuccess) {
          toast.success ('登陆成功');
        } else {
          toast.error (state.message);
        }

        if (values.remember === true) {
          storage.set (USERNAME, values.username);
          storage.set (PASSWORD, values.password);
        } else {
          storage.remove (USERNAME, values.username);
          storage.remove (PASSWORD, values.password);
        }
      }
    });
  };

  render () {
    const {state} = this.props;

    return state.isSuccess
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
            <LoginForm wrappedComponentRef={form => (this.loginForm = form)} />
            <Button
              className="btn-login"
              type="primary"
              onClick={this.handleSubmit}
            >
              <Spin />
              <FormattedMessage id='signBtn' defaultMessage='登陆' />
            </Button>
            <p className="copyright">
              &copy; {COPYRIGHT}
            </p>
          </div>
        </div>;
  }
}
export default SignIn;
