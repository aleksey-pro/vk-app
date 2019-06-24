import React from 'react';
import { Card, CardImg, CardText, CardBody, CardHeader } from 'reactstrap';

export default function FriendCard({ friend }) {
  return (
    <div>
      <Card
        body
        inverse
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', borderColor: '#333' }}
      >
        <CardHeader>{`${friend.first_name} ${friend.last_name}`}</CardHeader>
        <CardImg top width="100%" src={friend.photo_100} alt="My photo" />
        <CardBody>
          <CardText>{friend.city.title}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}
