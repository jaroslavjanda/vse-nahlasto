import React from 'react';
import { Card, Row, CardDeck } from 'react-bootstrap';

export function Tickets({ tickets }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        <div>
          <Row>
            {console.log(tickets)}
            <CardDeck>
              {tickets.map((item) => (
                <Card style={{ width: '100%' }} key={item.title}>
                  <Card.Img variant="top" src="https://picsum.photos/180/100" />
                  <Card.Body>
                    <h3>{item.title}</h3>
                    <Card.Text>{item.content}</Card.Text>
                    <div>

                    </div>
                  </Card.Body>
                </Card>
              ))}
            </CardDeck>
          </Row>
        </div>
      </div>
    </div>
  );
}
