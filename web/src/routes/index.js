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
import CreateProject from './CreateProject';
import Discover from './Discover';
import Project from './Project';
import Application from './Application';
import ApplicationDetails from './ApplicationDetails';
import User from './User';
import Projects from './Projects';
import UpdateProject from './UpdateProject';
import Applications from './Applications';
import Users from './Users';
import Emails from 'Src/modules/Emails';

export default [
  {
    name: 'Create project',
    pathname: '/create-project',
    component: CreateProject,
    access: [k.PROFESSOR],
    withAuth: true,
    withSidebar: 'Create Project'
  },
  {
    name: 'UserProjects',
    pathname: '/user-projects',
    component: Projects,
    access: [k.PROFESSOR],
    withAuth: true,
    withSidebar: 'My Projects'
  },
  {
    name: 'Projects',
    pathname: '/project/list',
    component: Discover,
    access: [k.PROFESSOR, k.STUDENT, k.ADMIN],
    withAuth: true,
    withSidebar: 'Projects'
  },
  {
    name: 'UpdateProject',
    pathname: '/update-project',
    component: UpdateProject,
    access: [k.PROFESSOR, k.STUDENT],
    withAuth: true,
    withSidebar: true
  },
  {
    name: 'Application',
    pathname: '/application',
    component: Application,
    access: [k.STUDENT, k.PROFESSOR],
    withAuth: true,
    withSidebar: 'Application'
  },
  {
    name: 'Project',
    pathname: '/projects/:id',
    component: Project,
    access: [k.PROFESSOR, k.STUDENT, k.ADMIN],
    withAuth: true,
    withSidebar: true
  },
  {
    name: 'CVSetup',
    pathname: '/cv-setup',
    component: CVSetup,
    access: [k.PROFESSOR, k.STUDENT],
    withAuth: true
  },
  {
    name: 'ProfessorSetup',
    pathname: '/professor-setup',
    component: ProfessorSetup,
    access: [k.PROFESSOR],
    withAuth: true
  },
  {
    name: 'VerifyEmail',
    pathname: '/verify',
    component: VerifyEmail
  },
  {
    name: 'Setup',
    pathname: '/setup',
    component: Setup,
    access: [k.ADMIN, k.PROFESSOR, k.STUDENT, k.UNSET],
    withAuth: true
  },
  {
    name: 'Home',
    pathname: '/home',
    component: Home
  },
  {
    name: 'Profile',
    pathname: '/',
    component: Profile,
    access: [k.PROFESSOR, k.STUDENT, k.ADMIN, k.UNSET],
    withAuth: true,
    withSidebar: 'Profile'
  },

  // Admin interfaces
  {
    name: 'Emails',
    exact: true,
    link: '/emails',
    pathname: ['/emails', '/emails/:subroute'],
    component: Emails,
    access: [k.ADMIN],
    withAuth: true,
    withSidebar: 'Emails'
  },
  {
    name: 'Users',
    pathname: '/users',
    component: Users,
    access: [k.ADMIN],
    withAuth: true,
    withSidebar: 'Users'
  },
  {
    name: 'Applications',
    pathname: '/applications',
    component: Applications,
    access: [k.ADMIN],
    withAuth: true,
    withSidebar: 'Applications'
  },
  {
    name: 'Application details',
    pathname: '/applications/:id',
    component: ApplicationDetails,
    access: [k.ADMIN],
    withAuth: true,
    withSidebar: true
  },
  {
    name: 'User',
    pathname: '/user/:id',
    component: User,
    access: [k.ADMIN],
    withAuth: true,
    withSidebar: true
  },

  {
    name: 'Login',
    pathname: '/signin',
    component: Login,
    withAuth: false
  },
  {
    name: 'Register',
    pathname: '/signup',
    component: Register,
    withAuth: false
  },
  {
    name: 'SetPassword',
    pathname: '/set-password',
    component: SetPassword,
    withAuth: false
  },
  {
    name: 'ForgotPassword',
    pathname: '/forgot-password',
    component: ForgotPassword,
    withAuth: false
  }
];
