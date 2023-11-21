import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input, Switch } from 'antd';
import { LoginOutlined } from '@ant-design/icons/lib';
import { useForm } from 'antd/es/form/Form';
import PublicLayout from '../../layout/public/Public';
import { useNavigateHome } from '../../utils/use-navigate-home';
import axios from 'axios';

const SignIn = () => {
  const [form] = useForm();
  const navigateHome = useNavigateHome();

  const login = () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log(values);
        const data = {
          username: values.login,
          password: values.password
        };
        console.log(data);
        await axios
          .post('http://localhost:4000/users/login', data)
          .then(async (res) => {
            const token = res.data.token;
            const role = res.data.role;
            await localStorage.setItem('token', token);
            //message.success('Login Successfull');
            console.log('aaaa');
            if (role === 'patient') {
              window.location.replace('/patientHome');
            } else if (role === 'doctor') {
              window.location.replace('/doctorHome');
            } else if (role === 'admin') {
              window.location.replace('/adminHome');
            }
          })
          .catch(async (err) => {
            console.log(err.response.data.error);
            if (err.response.data.error === 'User not verified yet') {
              await localStorage.setItem('token', err.response.data.token);
              //message.error('User not verified yet');
              window.location.replace('/verifyUser');
            } else if (err.response.data.error === 'Doctor not approved yet') {
              await localStorage.setItem('token', err.response.data.token);
              //message.error('Doctor not approved yet');
              window.location.replace('/notApproved');
            } else {
              // message.error('Invalid Credentials');
            }
          });
      })
      .catch(() => null);
  };

  return (
    <PublicLayout bgImg={`${window.origin}/content/login-page.jpg`}>
      <h4 className='mt-0 mb-1'>Login form</h4>

      <p className='text-color-200'>Login to access your Account</p>

      <Form form={form} layout='vertical' className='mb-4'>
        <Form.Item name='login' rules={[{ required: true, message: <></> }]}>
          <Input placeholder='Username' />
        </Form.Item>
        <Form.Item name='password' rules={[{ required: true, message: <></> }]}>
          <Input placeholder='Password' type='password' />
        </Form.Item>

        <div className='d-flex align-items-center mb-4'>
          <Switch defaultChecked /> <span className='ml-2'>Remember me</span>
        </div>

        <Button
          block={false}
          type='primary'
          onClick={login}
          htmlType='submit'
          icon={<LoginOutlined style={{ fontSize: '1.3rem' }} />}
        >
          Login
        </Button>
      </Form>
      <br />
      <p className='mb-1'>
        <a href='#'>Forgot password?</a>
      </p>

      <p>
        Don't have an account? <Link to='../sign-up'>Sign up!</Link>
      </p>
    </PublicLayout>
  );
};

export default SignIn;
