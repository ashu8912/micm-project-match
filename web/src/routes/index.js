import withAuth from 'Src/enhancers/withAuth';
import * as k from 'Src/constants/values';
import Home from './Home';
import Register from './Register';
import SetPassword from './SetPassword';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import Setup from './Setup';
import VerifyEmail from './VerifyEmail';
import Profile from './Profile';
import ProfessorSetup from './ProfessorSetup';
import CVSetup from './CVSetup';

export default [
  {
    name: 'CVSetup',
    pathname: '/cvsetup',
    component: withAuth(CVSetup, true, [k.PROFESSOR, k.STUDENT])
  },
  {
    name: 'ProfessorSetup',
    pathname: '/professorsetup',
    component: withAuth(ProfessorSetup, true, [k.PROFESSOR])
  },
  {
    name: 'VerifyEmail',
    pathname: '/verify',
    component: VerifyEmail
  },
  {
    name: 'Setup',
    pathname: '/setup',
    component: withAuth(Setup, true, [k.ADMIN, k.PROFESSOR, k.STUDENT, k.UNSET])
  },
  {
    name: 'Login',
    pathname: '/signin',
    component: withAuth(Login, false)
  },
  {
    name: 'Register',
    pathname: '/signup',
    component: withAuth(Register, false)
  },
  {
    name: 'SetPassword',
    pathname: '/setpassword',
    component: withAuth(SetPassword, false)
  },
  {
    name: 'ForgotPassword',
    pathname: '/forgotpassword',
    component: withAuth(ForgotPassword, false)
  },
  {
    name: 'Home',
    pathname: '/home',
    component: Home
  },
  {
    name: 'Profile',
    pathname: '*',
    component: withAuth(Profile, true, [k.PROFESSOR])
  }
];
