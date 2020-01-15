import { connect } from 'react-redux';
import UserList from './UserList';
import { action } from 'Src/utils';
import { pick } from 'ramda';
import {
  USER_LIST,
  MAKE_ADMIN,
  MAKE_PROFESSOR,
  MAKE_STUDENT
} from 'Src/constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  listUsers: () => dispatch(action(USER_LIST.REQUEST)),
  clearUsers: () => dispatch(action(USER_LIST.RECEIVE, [])),
  makeAdmin: data => dispatch(action(MAKE_ADMIN.REQUEST, data)),
  makeProfessor: data => dispatch(action(MAKE_PROFESSOR.REQUEST, data)),
  makeStudent: data => dispatch(action(MAKE_STUDENT.REQUEST, data))
});

const mapStateToProps = state => ({
  currentUser: state.app.user,
  ...pick(['users', 'isLoading'], state.userList)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
