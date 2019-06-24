import React from 'react';
import { Card, CardImg, CardText, CardBody, CardHeader } from 'reactstrap';

export default function UserCard({ user }) {
  return (
    <div>
      <Card
        body
        inverse
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', borderColor: '#333' }}
      >
        <CardHeader>{`${user.first_name} ${user.last_name}`}</CardHeader>
        <CardImg top width="100%" src={user.photo_100} alt="My photo" />
        <CardBody>
          <CardText>{user.city.title}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}
