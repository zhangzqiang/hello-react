import React from 'react';
import {Form, Icon, Input, Checkbox} from 'antd';
const FormItem = Form.Item;

class LoginForm extends React.Component {
  render () {
    //经过 Form.create 包装的组件将会自带 this.props.form 属性
    const {form: {getFieldDecorator}} = this.props;
    const nameDecorator = getFieldDecorator ('username', {
      rules: [{required: true, message: '请输入您的账号!'}],
    });
    const passwordDecorator = getFieldDecorator ('password', {
      rules: [{required: true, message: '请输入密码!'}],
    });
    const rememberDecorator = getFieldDecorator ('remember', {
      valuePropName: 'checked',
      initialValue: true,
    });

    return (
      <Form style={{textAlign: 'left'}}>
        <FormItem>
          {nameDecorator (
            <Input
              prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
              placeholder="账号"
            />
          )}
        </FormItem>
        <FormItem>
          {passwordDecorator (
            <Input
              prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />}
              type="password"
              placeholder="密码"
            />
          )}
        </FormItem>
        <FormItem>
          {rememberDecorator (
            <Checkbox style={{color: '#fff'}}>记住密码</Checkbox>
          )}
          <a className="login-form-forgot">
            忘记密码？
          </a>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create () (LoginForm);
