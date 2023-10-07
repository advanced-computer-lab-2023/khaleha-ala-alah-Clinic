import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input, Switch } from 'antd';
import { useForm } from 'antd/es/form/Form';
import PublicLayout from '../../layout/public/Public';
import { useNavigateHome } from '../../utils/use-navigate-home';
import PatientSignUp from '../components/PatientSignUp';

const SignUp = () => {
  const navigateHome = useNavigateHome();
  const [form] = useForm();

  const signUp = () => {
    form
      .validateFields()
      .then(() => navigateHome())
      .catch(() => null);
  };

  return (
    <PatientSignUp />
  );
};

export default SignUp;
