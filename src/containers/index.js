import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import {connect} from 'react-redux';import {LocaleProvider} from 'antd';

import {getStorage} from '../utils/storage';
import {USER_ID, TOKEN} from '../constants/common';
import SignIn from './signIn';
import Home from './home';
import '../assets/styles/index.scss';

import zh_CN from 'antd/lib/locale-provider/zh_CN';
// import {LANGUAGE} from '../constants/common';
//let language = require (`antd/lib/locale-provider/${LANGUAGE}`);

@connect (state => ({
  state: state.userReducer,
}))
class App extends React.Component {
  constructor () {
    super ();
    this.state = {
      locale: zh_CN,
    };
  }
  componentDidMount () {
    const userId = getStorage (USER_ID);
    const token = getStorage (TOKEN);

    if (token && userId) {
      this.setState ({
        isAuthenticated: true,
      });
    }
  }

  handleRender = () => {
    const {location, state} = this.props;
    if (state.isAuthenticated) {
      return <Home />;
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
  //exact的值为bool型，为true是表示严格匹配(’/link’与’/’是不匹配的)，为false时为正常匹配。
  render () {
    return (
      <LocaleProvider locale={this.state.locale}>
        <Router>
          <Switch>
            <Route path="/signin" component={SignIn} />
            <Route exract render={this.handleRender} />
          </Switch>
        </Router>
      </LocaleProvider>
    );
  }
}

export default App;
