import React from 'react';
import { Footer } from 'src/atoms/';
import icon1 from 'src/images/icon1.PNG';
import icon2 from 'src/images/icon2.PNG';
import icon3 from 'src/images/icon3.PNG';
import mobile from 'src/images/mobile.jpg';
import testimonial from 'src/images/testimonial1.jpg';
import testimonial2 from 'src/images/testimonial2.jpg';
import { CommunityCardsHomepage } from 'src/molecules/';
import { useHistory } from 'react-router-dom';
import { route } from 'src/Routes';
import { Link } from 'src/atoms/';

import {
  Jumbotron,
  Button,
  Container,
  Card,
  CardDeck,
  Row,
  Col,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'src/templates/Homepage.css';

export function HomeTemplate({ communitiesHomepage, isMember }) {
  const history = useHistory();
  return (
    <>
      <Jumbotron className="cover">
        <Container>
          <div className="cover-text">
            <h1>
              Pojďme vyřešit Vaše problémy
              <br />
              &#9745;
            </h1>
            <Link to={route.signUp()}>
              <Button className="homepageButton">To chci</Button>
            </Link>
          </div>
        </Container>
      </Jumbotron>

      <Jumbotron className="jumbotronWhite">
        <h2>Proč my?</h2>
        <Container>
          <Row>
            <Col lg={4} sm={6}>
              <div
                className="card text-center hover-shadow-lg hover-translate-y-n10"
                id="benefits"
              >
                <div className="px-4 py-5">
                  <img
                    alt="slabiny"
                    className="img-fluid"
                    height="70px"
                    src={icon1}
                    width="100px"
                  />
                </div>
                <div className="px-4 pb-5">
                  <h5>objevte a vyřešte své slabiny</h5>
                </div>
              </div>
            </Col>
            <Col lg={4} sm={6}>
              <div
                className="card text-center hover-shadow-lg hover-translate-y-n10"
                id="benefits"
              >
                <div className="px-4 py-5">
                  <img
                    alt="API"
                    className="img-fluid"
                    height="70px"
                    src={icon2}
                    width="100px"
                  />
                </div>
                <div className="px-4 pb-5">
                  <h5>API k propojení Nahlaš.To na vlastní systém</h5>
                </div>
              </div>
            </Col>
            <Col lg={4} sm={6}>
              <div
                className="card text-center hover-shadow-lg hover-translate-y-n10"
                id="benefits"
              >
                <div className="px-4 py-5">
                  <img
                    alt="používání"
                    className="img-fluid"
                    height="70px"
                    src={icon3}
                    width="100px"
                  />
                </div>
                <div className="px-4 pb-5">
                  <h5>jasné a jednoduché používání</h5>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Jumbotron>

      <Jumbotron className="jumbotronBlue">
        <Container>
          <Row>
            <Col lg={6}>
              <div className="info">
                <h2>
                  Nahlašujte své problémy <br />
                  kdekoliv a kdykoliv
                </h2>
                <p>
                  Nahlaš.To je aplikace, která vám poběží v jakémkoliv mobilu,
                  ať už máte Android nebo iOS. Snažíme se o čistý design, který
                  vás sám o sobě bude navádět, jak aplikaci používat.
                </p>
              </div>
            </Col>

            <Col lg={6}>
              <img alt="mobile" src={mobile} />
            </Col>
          </Row>
        </Container>
      </Jumbotron>

      <Jumbotron className="jumbotronWhite">
        {communitiesHomepage && (
          <>
            <h2>Prozkoumejte komunity</h2>
            <Container>
              <CommunityCardsHomepage
                communitiesHomepage={communitiesHomepage}
                isMember={isMember}
              />
            </Container>
          </>
        )}
      </Jumbotron>

      <Jumbotron className="jumbotronBlue">
        <div className="text-center">
          <h2>Recenze</h2>
        </div>
        <Container>
          <CardDeck>
            <Row>
              <Col lg={6} sm={6}>
                <Card>
                  <Card.Body>
                    <Card.Text className="testimonial">
                      "Nahlaš.To používám v práci téměř každý den."
                    </Card.Text>
                    <div className="avatar-author">
                      <img
                        alt="uživatel"
                        className="avatar"
                        src={testimonial}
                      />
                      <div className="ml-2">
                        <h6>
                          zaměstnankyně <br />
                          korporátu
                        </h6>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6} sm={6}>
                <Card>
                  <Card.Body>
                    <Card.Text className="testimonial">
                      "Když se něco rozbije u nás v bytovce, snadno to
                      nahlásím."
                    </Card.Text>
                    <div className="avatar-author">
                      <img
                        alt="uživatel"
                        className="avatar"
                        src={testimonial2}
                      />
                      <div className="ml-2">
                        <h6>
                          běžný <br />
                          uživatel
                        </h6>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </CardDeck>
        </Container>
      </Jumbotron>

      <Jumbotron className="jumbotronWhite">
        <h2>Ceník</h2>
        <CardDeck className="">
          <Card>
            <div className="text-center">
              <Card.Header>
                <h3>Free</h3>
              </Card.Header>
              <div className="text-center">
                <Card.Body>
                  <Card.Text>
                    <ul className="list-unstyled">
                      <li>5 uživatelů</li>
                      <li>účet správce</li>
                    </ul>
                  </Card.Text>
                  <div className="text-center">
                    <Card.Title>
                      <h3>0 €</h3>
                    </Card.Title>
                  </div>
                </Card.Body>
              </div>
              <a
                href="mailto:tym7nahlasto@gmail.com?subject=Chci Free verzi"
                rel="noreferrer"
                target="_blank"
              >
                <Button className="homepageButton">Vybrat</Button>
              </a>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <Card.Header>
                <h3>Pro</h3>
              </Card.Header>
              <div className="text-center">
                <Card.Body>
                  <Card.Text>
                    <ul className="list-unstyled">
                      <li>25 uživatelů</li>
                      <li>účet správce</li>
                    </ul>
                  </Card.Text>
                  <Card.Title>
                    <h3>8 €</h3>
                  </Card.Title>
                </Card.Body>
              </div>
              <a
                href="mailto:tym7nahlasto@gmail.com?subject=Chci Pro verzi"
                rel="noreferrer"
                target="_blank"
              >
                <Button className="homepageButton">Vybrat</Button>
              </a>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <Card.Header>
                <h3>Ultimate</h3>
              </Card.Header>
              <div className="text-center">
                <Card.Body>
                  <Card.Text>
                    <ul className="list-unstyled">
                      <li>dle domluvy</li>
                    </ul>
                  </Card.Text>
                  <Card.Title>
                    <h3>20 €</h3>
                  </Card.Title>
                </Card.Body>
              </div>
              <a
                href="mailto:tym7nahlasto@gmail.com?subject=Chci Ultimate verzi"
                rel="noreferrer"
                target="_blank"
              >
                <Button className="homepageButton">Vybrat</Button>
              </a>
            </div>
          </Card>
        </CardDeck>
      </Jumbotron>

      <Jumbotron className="jumbotronBlue">
        <Container>
          <div className="text-center">
            <h2>Zaujali jsme vás?</h2>

            <p>Pošlete nám mail a my se vám ozveme do 24 hodin.</p>
            <Link to={route.signUp()}>
              <Button className="homepageButton">Vyzkoušet Nahlaš.To</Button>
            </Link>
          </div>
        </Container>
      </Jumbotron>

      <Footer />
    </>
  );
}
