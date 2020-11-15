import React, {useState} from 'react';
import { Card, CardDeck, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from 'src/utils/auth';

export const CardsTicket = ({item, like, requestSendLike}) => {

    const [liked, setliked] = useState(like)
    const [enabled, setenabled] = useState(true)
    const { user } = useAuth();

    return(
    <Card style={{ width: '100%' }} key={item.title}>
        <Card.Img variant="top" src="https://picsum.photos/180/100" />
        <Card.Header as="h5">
            <div>{item.date}</div>
            <Badge variant="secondary">{item.status[0].status}</Badge>
        </Card.Header>
        <Card.Body>
            <h3>{item.title}</h3>
            <Card.Text>{item.content}</Card.Text>
            <div>
            <div onClick={() => {
                if(enabled && user){
                    setliked(liked+1)
                    setenabled(false)
                    requestSendLike({variables:{ownerId: user.user_id, ticketId:item.ticket_id}});
                }
            }}>
                <FontAwesomeIcon icon={faThumbsUp} className="mr2 f4" />
                {liked}
            </div>
            </div>
        </Card.Body>
    </Card>
    )  
}

                