import React from 'react';
import { Row } from 'reactstrap';
import { getUser, getFriends } from './api/actions';
import UserCard from './components/userCard';
import FriendCard from './components/friendCard';

class Profile extends React.Component {
  state = {
    user: {
      city: {},
    },
    friends: [
      {
        city: {},
      },
    ],
  };

  checkStorage = data => {
    return JSON.parse(localStorage.getItem(data));
  };

  componentDidMount() {
    const { api } = this.props;
    // Проверим - есть ли данные в localStorage
    const storage = {
      user: this.checkStorage('userData'),
      friends: this.checkStorage('friendsData'),
    };

    // Если нет  - берем их из API и сохраняем в localStorage,
    // в state помещаем данные из API
    if (storage.user === null) {
      getUser(api).then(user => {
        localStorage.setItem('userData', JSON.stringify(user));
        this.setState({ user: user[0] });
      });
    } else {
      // Если данные есть в localStorage - помещаем их сразу в state
      this.setState({ user: storage.user[0] });
    }

    if (storage.friends === null) {
      getFriends(api).then(friends => {
        localStorage.setItem('friendsData', JSON.stringify(friends));
        this.setState({ friends: friends.items });
      });
    } else {
      this.setState({ friends: storage.friends.items });
    }
  }

  renderFriendCards = () => {
    const { friends } = this.state;
    return friends.map((friend, idx) => {
      return <FriendCard friend={friend} key={idx} />;
    });
  };

  render() {
    const { user } = this.state;
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
