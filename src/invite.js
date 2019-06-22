import React from 'react';
import { Row, Col, Button } from 'reactstrap';

export default function Invite({ handleAuthButton }) {
  return (
    <Row>
      <Col className="login-container">
        <h1 className="center-head">
          Пожалуйста, авторизуйтесь для входа в приложение
        </h1>
        <Button color="danger" onClick={() => handleAuthButton()} size="lg">
          Авторизоваться
        </Button>
      </Col>
    </Row>
  );
}
