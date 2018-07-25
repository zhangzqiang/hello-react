import React from 'react';
import {connect} from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import storage from '../utils/storage';
import {AUTH_ID} from '../constants/common';
import SignIn from './signIn';
import Home from './home';
import '../assets/styles/index.scss';

@connect (state => ({
  state: state.signInReducer,
}))
class App extends React.Component {
  constructor () {
    super ();
    // const language = `antd/lib/locale-provider/${LANGUAGE}.js`;
    this.state = {
      // locale: require (language),
      isAuthenticated: false,
    };
  }

  //页面组件加载完成之后调用
  componentDidMount () {
    //从localstorage中获取AUTH_ID
    const auth_id = storage.get (AUTH_ID);

    //判断AUTH_ID是否存在
    if (auth_id) {
      //判断后台AUTH_ID是否有效

      //如果有效，则跳转到Home页面
      this.setState ({
        isAuthenticated: true,
      });
    }
  }

  handleRender = () => {
    const {location, state} = this.props;

    if (state.isSuccess) {
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

  render () {
    //LocaleProvider antd多语言支持组件
    //Route，exact的值为bool型，默认为true，为true是表示严格匹配(’/link’与’/’是不匹配的)，为false时为正常匹配。
    return (
        <Router>
          <Switch>
            <Route path="/signin" component={SignIn} />
            <Route exract render={this.handleRender} />
          </Switch>
        </Router>
    );
  }
}

export default App;
