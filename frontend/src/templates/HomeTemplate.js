import { Footer } from 'src/atoms/'
import icon1 from 'src/images/icon1.PNG'
import icon2 from 'src/images/icon2.PNG'
import icon3 from 'src/images/icon3.PNG'
import mobile from 'src/images/mobile.jpg'
import test from 'src/images/testimonial1.jpg'
import test2 from 'src/images/testimonial2.jpg'
import { QuackForm } from 'src/molecules/'

import React from 'react'
import { Spinner } from 'react-bootstrap'
import {
    Jumbotron,
    Button,
    Container,
    Card,
    CardDeck,
    Row,
    Col,
    Carousel,
} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export function HomeTemplate({ data, quackFormState, currentUser }) {
    return (
        <>
            <Jumbotron className="cover">
                <Container>
                    <div className="text-center">
                        <h1>Pojďme vyřešit Vaše problémy</h1>
                    </div>
                </Container>
            </Jumbotron>

            <Jumbotron className="jumbotronWhite">
                <h2>Proč my?</h2>
                <Row className="benefits">
                    <Col sm={4}>
                        <img
                            alt="slabiny"
                            className="img-fluid"
                            height="100px"
                            src={icon1}
                            width="100px"
                        />
                        <h4>objevte a vyřešte své slabiny</h4>
                    </Col>
                    <Col sm={4}>
                        <img
                            alt="API"
                            className="img-fluid"
                            height="100px"
                            src={icon2}
                            width="100px"
                        />
                        <h4>APi k propojení Nahlaš.To na vlastní systém</h4>
                    </Col>
                    <Col sm={4}>
                        <img
                            alt="používání"
                            className="img-fluid"
                            height="100px"
                            src={icon3}
                            width="100px"
                        />
                        <h4>jasné a jednoduché používání</h4>
                    </Col>
                </Row>
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
                                Nahlaš.To je aplikace, která vám poběží v
                                jakémkoliv mobilu, ať už máte Android nebo iOS.
                                Snažíme se o čistý design, který vás sám o sobě
                                bude navádět, jak aplikaci používat.
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
                <h2>Ceník</h2>
                <CardDeck>
                    <Card>
                        <div className="text-center">
                            <Card.Header>
                                <h3>Free</h3>
                            </Card.Header>
                            <div className="text-center">
                                <Card.Body>
                                    <Card.Text>
                                        <ul>
                                            <li>5 uživatelů</li>
                                            <li>učet správce</li>
                                        </ul>
                                    </Card.Text>
                                    <div className="text-center">
                                        <Card.Title>
                                            <h3>0 €</h3>
                                        </Card.Title>
                                    </div>
                                </Card.Body>
                            </div>
                            <Button className="homepageButton">To chci</Button>
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
                                        <ul>
                                            <li>25 uživatelů</li>
                                            <li>učet správce</li>
                                        </ul>
                                    </Card.Text>
                                    <Card.Title>
                                        <h3>8 €</h3>
                                    </Card.Title>
                                </Card.Body>
                            </div>
                            <Button className="homepageButton">To chci</Button>
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
                                        <ul>
                                            <li>dle domluvy</li>
                                        </ul>
                                    </Card.Text>
                                    <Card.Title>
                                        <h3>20 €</h3>
                                    </Card.Title>
                                </Card.Body>
                            </div>
                            <Button className="homepageButton">To chci</Button>
                        </div>
                    </Card>
                </CardDeck>
            </Jumbotron>

            <Jumbotron className="jumbotronBlue">
                <Carousel indicators={false}>
                    <Carousel.Item>
                        <img
                            alt="uživatel"
                            className="d-block w-100"
                            src={test}
                        />
                        <Carousel.Caption>
                            <h3>zaměstnanec v korporátu</h3>
                            <p>Nahlaš.To používám v práci téměř každý den.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            alt="uživatel"
                            className="d-block w-100"
                            src={test2}
                        />

                        <Carousel.Caption>
                            <h3>běžný uživatel</h3>
                            <p>
                                Když se něco rozbije u nás v bytovce, snadno to
                                nahlásím.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Jumbotron>

            <Jumbotron className="jumbotronWhite">
                <Container>
                    <div className="text-center">
                        <h2>Zaujali jsme vás?</h2>

                        <p>Pošlete nám mail a my se vám ozveme do 24 hodin.</p>
                        <a
                            href="mailto:tym7nahlasto@gmail.com"
                            rel="noreferrer"
                            target="_blank"
                        >
                            <Button className="homepageButton">
                                Vyzkoušet Nahlaš.To
                            </Button>
                        </a>
                    </div>
                </Container>
            </Jumbotron>

            <Footer />
            {currentUser && <QuackForm {...quackFormState} />}
            {data && (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            )}
        </>
    )
}
