import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { UserConsumer } from './App';

const Invite = () => (
  <UserConsumer>
    {context => {
      return (
        <Row>
          <Col className="login-container">
            <h1 className="center-head">
              Пожалуйста, авторизуйтесь для входа в приложение
            </h1>
            <Button color="danger" onClick={() => context()} size="lg">
              Авторизоваться
            </Button>
          </Col>
        </Row>
      );
    }}
  </UserConsumer>
);

export default Invite;
