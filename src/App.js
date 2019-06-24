import React, { createContext } from 'react';
import './App.css';

import { Container, Alert } from 'reactstrap';
import { login } from './api/actions';
import Invite from './invite';
import Profile from './profile';

const API_VERSION = '5.73';
const APP_KEY = 6262771;
// Этого можно было совсем не делать,
// просто решил показать умение использовать react.context
const LoginContext = createContext({});
const UserProvider = LoginContext.Provider;
export const UserConsumer = LoginContext.Consumer;

class App extends React.Component {
  validateToken = () => {
    const token = localStorage.getItem('access_token');
    return !!token;
  };

  state = {
    isAuthorized: this.validateToken(),
    errorOccurred: false,
  };

  /**
   * Аутентифицируемся черз VK API и сохраняем ключ в localStorage
   */
  handleLogin = () => {
    login(APP_KEY, 2)
      .then(response => {
        const token = response.session.sid;
        localStorage.setItem('access_token', token);
        this.setState({ isAuthorized: true, errorOccurred: false });
      })
      // Здесь я решил перхватить ошибку из reject чтобы отреденерить сообщение
      // если логин не успешен
      .catch(err => this.setState({ errorOccurred: true }));
  };

  render() {
    const { isAuthorized, errorOccurred } = this.state;
    return (
      <UserProvider value={this.handleLogin}>
        <div className="App">
          <Container>
            {errorOccurred && (
              <Alert className="alert-custom" color="danger">
                Ошибка авторизаци!
              </Alert>
            )}
            {!isAuthorized && <Invite />}
            {isAuthorized && <Profile api={API_VERSION} />}
            <p className="laws">
              Free Vector Art by{' '}
              <a href="https://vecteezy.com">www.vecteezy.com</a>
            </p>
          </Container>
        </div>
      </UserProvider>
    );
  }
}

export default App;
