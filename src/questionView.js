import React from 'react';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import CenteredRectangle from './questionView';
import { Navbar, ProgressBar } from 'react-bootstrap';
import {useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';

function QuestionView() {


  const [progressValue, setProgress] = useState(0);
  const handleSubmitClick = () => {
    if (!(progressValue + 10 > 100)) {
      setProgress(progressValue + 10);
    } 
  }
  return (
    <Card className='question-card'>
      <Card.Body>
        <Card.Title>
        <Row>
          <Col>Most Important</Col>
          <Col>Outcome</Col>
          <Col>Least Important</Col>
        </Row>
        </Card.Title>
        <Form>
          <Row className="even-row">
            <Col><Form.Check type='radio'/></Col>
            <Col className="question-col"><p>I would like to minimize my dependancy on others</p></Col>
            <Col><Form.Check type='radio'/></Col>
          </Row>
          <Row className="odd-row">
            <Col><Form.Check type='radio'/></Col>
            <Col className='question-col'><p>Which of the teenage mutant ninja turtles is your favorite</p></Col>
            <Col><Form.Check type='radio'/></Col>
          </Row>
          <Row className="even-row">
            <Col><Form.Check type='radio'/></Col>
            <Col className="question-col"><p>Do you think that Michael Jordan or LeBron James is the GOAT</p></Col>
            <Col><Form.Check type='radio'/></Col>
          </Row>
          <Row className="odd-row">
            <Col><Form.Check type='radio'/></Col>
            <Col className="question-col"><p>Do you want this drug to cure you</p></Col>
            <Col><Form.Check type='radio'/></Col>
          </Row>
        </Form>

        <Row>
          <Col>
            <Button variant="primary" onClick={handleSubmitClick}>Submit</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default QuestionView;
