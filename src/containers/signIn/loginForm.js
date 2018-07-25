import React from 'react';
import {Form, Spin, Icon, Input, Button, Checkbox} from 'antd';
// import {setStorage, removeStorage} from '../../utils/storage';
// import {USERNAME, PASSWORD} from '../../constants/common';
// import {connect} from 'react-redux';
// import {signInAction} from '../../actions';

const FormItem = Form.Item;

// @connect (
//   state => ({
//     state: state.signInReducer,
//   }),
//   dispatch => ({
//     signIn: user => dispatch (signInAction.signIn (user)),
//   })
// )
class LoginForm extends React.Component {
  // handleSubmit = e => {
  //   e.preventDefault ();
  //   this.props.form.validateFields (async (err, values) => {
  //     if (!err) {
  //       await this.props.signIn ({
  //         userName: values.username,
  //         password: values.password,
  //       });

  //       let {isSuccess, message} = this.props.state;

  //       if (isSuccess) {
  //         toast.success ('登陆成功');
  //       } else {
  //         toast.error (message);
  //       }

  //       if (values.remember === true) {
  //         setStorage (USERNAME, values.username);
  //         setStorage (PASSWORD, values.password);
  //       } else {
  //         removeStorage (USERNAME, values.username);
  //         removeStorage (PASSWORD, values.password);
  //       }
  //     }
  //   });
  // };

  render () {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form style={{textAlign: 'left'}}>
        <FormItem>
          {getFieldDecorator ('username', {
            rules: [{required: true, message: '请输入您的账号!'}],
          }) (
            <Input
              prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
              placeholder="账号"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator ('password', {
            rules: [{required: true, message: '请输入密码!'}],
          }) (
            <Input
              prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />}
              type="password"
              placeholder="密码"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator ('remember', {
            valuePropName: 'checked',
            initialValue: true,
          }) (<Checkbox style={{color: '#fff'}}>记住密码</Checkbox>)}
          <a className="login-form-forgot">
            忘记密码？
          </a>
          <Button className="btn-login" type="primary" htmlType="submit">
            <Spin />
            登录
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create () (LoginForm);
