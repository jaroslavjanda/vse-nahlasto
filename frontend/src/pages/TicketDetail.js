import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { Button, Loading } from '../atoms'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../utils/auth'
import { TicketComment, UserImageAndName } from '../molecules'

const TICKET_DETAIL_QUERY = gql`
  query TicketDetail($ticketId: Int!) {
    ticket(ticketId: $ticketId) {
      user_id
      ticket_id
      title
      date
      image
      content
    }
  }
`

const COMMENT_QUERY = gql`
  query Comment($ticketId: Int!) {
    ticketComments(ticketId: $ticketId) {
      content
      user {
        name
        surname
      }
    }
  }
`

// const UPLOAD_COMMENT = gql`
// mutation CommentUpload($comment: )
// `

export const TicketDetail = ({ match }) => {

  const ticketId = parseInt(match.params.ticketId)
  const ticketState = useQuery(TICKET_DETAIL_QUERY, { variables: { ticketId } })
  const ticket = ticketState.data?.ticket

  const commentState = useQuery(COMMENT_QUERY, { variables: { ticketId } })
  const comment = commentState.data?.ticketComments


  // const auth = useAuth()


  return (
    <div style={{ textAlign: 'center' }}>
      {ticketState.loading && (
        <Loading />
      )}
      {!ticketState.loading && (
        <div>
          {commentState.loading && (
            <Loading />
          )}

          {!commentState.loading && (
            <div>
              <TicketComment
                ticketTitle={ticket?.title}
                ticketContent={ticket?.content}
                // ticket image parametr bude zde
              />

              <Container className="mt-2">

                {console.log("TicketDetail", comment)}

                {/*<p>{comment[0].user[0]}</p>*/}
                {/*<p>{comment[0].user[0].surname}</p>*/}



                {/*<UserImageAndName*/}

                {/*  // user={comment[0].user[0].name}*/}




                {/*/>*/}


                {/*<Row>*/}
                {/*  <Col style={{ textAlign: 'left', maxWidth: '25px' }}>*/}
                {/*    <FontAwesomeIcon icon={faUserCircle} />*/}
                {/*  </Col>*/}

                {/*  {console.log(comment?.content)}*/}
                {/*  <Col style={{ textAlign: 'left' }}>{comment[0].user[0].name}</Col>*/}
                {/*</Row>*/}

                <Form>
                  <Form.Group controlId="ControlInput1">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Komentuj zde"
                    />
                  </Form.Group>
                  <Button
                    className="pull-right"
                    // type="submit"
                    variant="success"
                    onClick={() => toast.success('Komentář byl přidan.')}
                  >
                    Podtvrdit
                  </Button>
                </Form>
              </Container>

              {/*<Container className="mt-2">*/}
              {/*  <Row>*/}
              {/*    <Col style={{ textAlign: 'left', maxWidth: '25px' }}>*/}
              {/*      <FontAwesomeIcon icon={faUserCircle} />*/}
              {/*    </Col>*/}
              {/*    <Col style={{ textAlign: 'left' }}>*/}
              {/*      Jméno Příjmení*/}
              {/*      <p style={{ textAlign: 'left', marginTop: '5px' }}>*/}
              {/*        {comment[0].content}*/}
              {/*      </p>*/}
              {/*    </Col>*/}
              {/*  </Row>*/}
              {/*</Container>*/}

              <Container className="mt-2">
                <Row>
                  <Col style={{ textAlign: 'left', maxWidth: '25px' }}>
                    <FontAwesomeIcon icon={faUserCircle} />
                  </Col>
                  <Col style={{ textAlign: 'left' }}>
                    Jméno Příjmení
                    <p style={{ textAlign: 'left', marginTop: '5px' }}>
                      Toto je již existující dlouhý komentář. Leave dead animals as
                      gifts sit in window and stare oooh, a bird, yum scoot butt on
                      the rug yet hack sleep all day whilst slave is at work, play
                      all night whilst slave is sleeping. Lick face hiss at owner,
                      pee a lot, and meow repeatedly scratch at fence purrrrrr eat
                      muffins and poutine until owner comes back shred all toilet
                      paper and spread around the house, and meow. Brown cats with
                      pink ears. Meeeeouw and sometimes switches in french and say
                      "miaou" just because well.
                    </p>
                  </Col>
                </Row>
              </Container>
            </div>
          )}
          )}
        </div>
      )}
    </div>)
}
