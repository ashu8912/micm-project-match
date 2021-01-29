import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { assocPath as set } from 'rambda';
import getFilename from '@lukeboyle/get-filename-from-path';
import UserPropTypes from 'Src/propTypes/User';
import Heading from 'Src/modules/Heading';
import Checkbox from 'Src/modules/Checkbox';
import InputField from 'Src/modules/InputField';
import { withRouter, Link } from 'react-router-dom';
import Loader from 'Src/modules/Loader';
import Button from 'Src/modules/Button';
import * as k from 'Src/constants/values';
import './userProfile.scss';

class UserProfile extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    public: PropTypes.bool,
    user: UserPropTypes,
    publicUser: UserPropTypes,
    application: PropTypes.object,
    id: PropTypes.string,
    history: PropTypes.object.isRequired,
    fetchUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    clearUser: PropTypes.func.isRequired
  };

  state = {
    isEditing: false,
    user: {}
  };

  componentDidMount() {
    if (this.props.public) this.props.fetchUser(this.props.id);
  }

  componentDidUpdate() {
    if (this.props.public && !this.props.publicUser && !this.props.isLoading)
      this.props.fetchUser(this.props.id);
  }

  componentWillUnmount() {
    this.props.clearUser();
  }

  handleChange = (propName, selector = ev => ev.target.value) => {
    return ev => {
      const user = set(propName, selector(ev), this.state.user);
      this.setState({ user });
    };
  };

  onClickEdit = ev => {
    this.setState({ isEditing: true, user: this.props.user });
  };

  onSubmit = ev => {
    ev.preventDefault();
    this.props.updateUser(this.state.user);
    this.setState({ isEditing: false });
  };

  render() {
    const { isLoading } = this.props;
    const { isEditing, user: editUser } = this.state;
    const user = this.props.public ? this.props.publicUser : this.props.user;
    const isApplicationSubmitted = Boolean(this.props.application);

    if (isLoading) return <Loader />;

    if (!user)
      return (
        <div className="user-profile">
          <Heading hideUnderline>User {this.props.id}</Heading>
          <div className="text-muted">Loading</div>
        </div>
      );

    return (
      <div className="UserProfile">
        <Heading hideUnderline>{`${user.firstName} ${user.lastName}`}</Heading>

        <div className="UserProfile__type">{user.type.toLowerCase()}</div>

        {isEditing && (
          <form className="UserProfile__details" onSubmit={this.onSubmit}>
            <div>
              <div>First Name</div>
              <div>
                <InputField
                  size="small"
                  value={editUser.firstName}
                  onChange={this.handleChange('firstName')}
                />
              </div>
            </div>
            <div>
              <div>Last Name</div>
              <div>
                <InputField
                  size="small"
                  value={editUser.lastName}
                  onChange={this.handleChange('lastName')}
                />
              </div>
            </div>
            <div>
              <div>Contact Number</div>
              <div>
                <InputField
                  size="small"
                  value={editUser.tel}
                  onChange={this.handleChange('tel')}
                />
              </div>
            </div>

            {editUser.professor && (
              <>
                <div>
                  <div>Department</div>
                  <div>
                    <InputField
                      size="small"
                      value={editUser.professor.department}
                      onChange={this.handleChange('professor.department')}
                    />
                  </div>
                </div>
                <div>
                  <div>Position</div>
                  <div>
                    <InputField
                      size="small"
                      value={editUser.professor.position}
                      onChange={this.handleChange('professor.position')}
                    />
                  </div>
                </div>
                <div>
                  <div>Affiliated with Mila?</div>
                  <div>
                    <Checkbox
                      size="small"
                      value={editUser.professor.mila}
                      onChange={this.handleChange('professor.mila', x => x)}
                    />
                  </div>
                </div>
                <div>
                  <div>Affiliated with McGill Regenerative Medicine Network?</div>
                  <div>
                    <Checkbox
                      size="small"
                      value={editUser.professor.mrmn}
                      onChange={this.handleChange('professor.mrmn', x => x)}
                    />
                  </div>
                </div>
                <div>
                  <div>University</div>
                  <div>
                    <InputField
                      size="small"
                      value={editUser.professor.university}
                      onChange={this.handleChange('professor.university')}
                      disabled={editUser.professor.mila === false}
                    />
                  </div>
                </div>
              </>
            )}
            <div>
              <Button color="success">Save</Button>
            </div>
          </form>
        )}

        {!isEditing && (
          <div className="UserProfile__details">
            <div>
              <div>Email</div>
              <div>{user.email}</div>
            </div>
            <div>
              <span>Contact Number</span>
              <span>{user.tel}</span>
            </div>
            {user.professor && (
              <>
                <div>
                  <span>Department</span>
                  <span>{user.professor.department}</span>
                </div>
                <div>
                  <span>Position</span>
                  <span>{user.professor.position}</span>
                </div>
                <div>
                  <span>Affiliated with McGill Regenerative Medicine Network?</span>
                  <span>{user.professor.mrmn ? 'Yes' : 'No'}</span>
                </div>
                <div>
                  <span>Affiliated with Mila?</span>
                  <span>{user.professor.mila ? 'Yes' : 'No'}</span>
                </div>
                {user.professor.mila && (
                  <div>
                    <span>University</span>
                    <span>{user.professor.university}</span>
                  </div>
                )}
              </>
            )}
            {(!this.props.public || user.cvKey) && user.type !== k.ADMIN && (
              <div>
                <span>Resume</span>
                {user.cvKey ? (
                  <>
                    <a
                      href={`/api/user/cv/${user.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-link"
                    >
                      View {getFilename(user.cvKey)}
                    </a>
                    {!this.props.public && (
                      <Link to="/cv-setup" className="button-link">
                        Update
                      </Link>
                    )}
                  </>
                ) : (
                  <Link to="/cv-setup" className="button-link">
                    Upload
                  </Link>
                )}
              </div>
            )}
            {!this.props.public && user.type === k.STUDENT && (
              <div>
                <span>Application</span>
                {isApplicationSubmitted ? (
                  <span className="text-success">Submitted</span>
                ) : (
                  <span className="text-muted">Not submitted</span>
                )}
              </div>
            )}
            {!this.props.public && (
              <div>
                <Button onClick={this.onClickEdit}>
                  Edit Details
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(UserProfile);
