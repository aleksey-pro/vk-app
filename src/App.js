import React from 'react';
import './App.css';

import { Container, Alert } from 'reactstrap';
import { login } from './api/actions';
import Invite from './invite';
import Profile from './Profile';

const API_VERSION = '5.73';

class App extends React.Component {
  validateToken = () => {
    const token = localStorage.getItem('access_token');
    return !!token;
  };

  state = {
    isAuthorized: this.validateToken(),
    errorOccurred: false,
  };

  handleLogin = () => {
    login(6262771, 2)
      .then(response => {
        const token = response.session.sid;
        localStorage.setItem('access_token', token);
        this.setState({ isAuthorized: true, errorOccurred: false });
      })
      // Здесь я решил перхватить ошибку из reject чтобы отреденерить сообщение
      .catch(err => this.setState({ errorOccurred: true }));
  };

  render() {
    const { isAuthorized, errorOccurred } = this.state;
    return (
      <div className="App">
        <Container>
          {errorOccurred && (
            <Alert className="alert-custom" color="danger">
              Ошибка авторизаци!
            </Alert>
          )}
          {!isAuthorized && <Invite handleAuthButton={this.handleLogin} />}
          {isAuthorized && <Profile api={API_VERSION} />}
          <p className="laws">
            Free Vector Art by{' '}
            <a href="https://vecteezy.com">www.vecteezy.com</a>
          </p>
        </Container>
      </div>
    );
  }
}

export default App;
