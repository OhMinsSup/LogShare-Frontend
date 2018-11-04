import * as React from 'react';
import RegisterTemplate from 'src/components/auth/RegisterTemplate';
import RegisterFormContainer from 'src/containers/auth/RegisterFormContainer';

const Register = () => <RegisterTemplate form={<RegisterFormContainer />} />;

export default Register;
