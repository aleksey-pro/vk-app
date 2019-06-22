import React from 'react';
import { Row } from 'reactstrap';
import { getUser, getFriends } from './api/actions';
import UserCard from './components/userCard';
import FriendCard from './components/friendCard';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        city: {},
      },
      friends: [
        {
          city: {},
        },
      ],
    };
  }

  componentDidMount() {
    const { api } = this.props;
    getUser(api).then(user => this.setState({ user: user[0] }));
    getFriends(api).then(friends => this.setState({ friends: friends.items }));
  }

  renderFriendCards = () => {
    const { friends } = this.state;
    return friends.map((friend, idx) => {
      return <FriendCard friend={friend} key={idx} />;
    });
  };

  render() {
    const { user } = this.state;
    console.log(this.state);
    return (
      <div className="profile-container">
        <Row className="user-container">
          <UserCard user={user} />
        </Row>
        <Row className="friends-container">{this.renderFriendCards()}</Row>
      </div>
    );
  }
}

export default Profile;
