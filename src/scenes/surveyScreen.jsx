import 'bootstrap/dist/css/bootstrap.min.css';
import './surveyScreen.css';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Navbar, ProgressBar } from 'react-bootstrap';
import {useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import * as pages from '../questions.js';



function Survey() {
  
  const pageAmount = pages.pageAmount;
  const [progressValue, setProgress] = useState(0);
  const [userName, setUserName] = useState("Johnny Appleseed");
  const [currentPage, setCurrentPage] = useState(pages.getPage(1));
  const [currentPageNumber, setPageNumber] = useState(1);
  // console.log(pages.getQuestionValue(currentPageNumber, 0));
  // pages.setQuestionValue(currentPageNumber, "row1", 1);
  // console.log(pages.getQuestionValue(currentPageNumber, 0));
  // pages.clearQuestionValue(currentPageNumber, "row1", 0);
  // console.log(pages.getQuestionValue(currentPageNumber, 0));
  console.log(pages.getQuestionValue(currentPageNumber, 0));

  const handleNextClick = () => {
    console.log(selected)
    console.log(selected["column1"])
    if (!getValidAnswer(currentPageNumber)) { // Create helper validity function
      alert("You have not selected two answers.\nPlease review each entry, and select one for both \"Most Important\" and \"Least Important\".")
      return
    }
    if (!(currentPageNumber + 1 > pageAmount)) {
      setPageNumber(currentPageNumber + 1);
      console.log(currentPageNumber);
      setCurrentPage(pages.getPage(currentPageNumber + 1));
    } 
  }
  const handleBackClick = () => {
    if (!(currentPageNumber - 1 < 1)) {
      setPageNumber(currentPageNumber - 1);
      setCurrentPage(pages.getPage(currentPageNumber - 1));
    } 
  }

  function handleNavClick(destination) {
    if (destination === currentPageNumber) {
      return;
    }
    if (!getValidAnswer(currentPageNumber) && !(destination - currentPageNumber < 0)) { // Create helper validity function
      alert("You have not selected two answers.\nPlease review each entry, and select one for both \"Most Important\" and \"Least Important\".")
      return
    }
    if ((destination - currentPageNumber) > 1) {  // Now accounts for jumping of non-completed problems
      for (let i = currentPageNumber; i < destination; i++) {
        if (!getValidAnswer(i)) {
          alert("Please do not skip questions");
          return;
        }
      }
    }
    if (!(currentPageNumber === destination)) {
      setPageNumber(destination);
      setCurrentPage(pages.getPage(destination));
    }
  }

  function getValidAnswer(pageNumber) {
    let counter = 0;
    for (let i = 0; i < 4; i++) {
      // Doesn't check if answers are formatted properly, assumes no bug
      if ((pages.getQuestionValue(pageNumber, i) == 1) || (pages.getQuestionValue(pageNumber, i) == -1)) {
        counter++;
      }
      if (counter == 2) {
        return true;
      }
    }
    return false;
  }

  const [selected, setSelected] = useState({
    "column1": '',
    "column2": ''
  });
  
  function handleRadioChange(event) {
    const { name, value } = event.target;
    const setValue = name === "column1" ? 1 : -1;
    const othCol = name === "column1" ? "column2" : "column1";
    pages.setQuestionValue(currentPageNumber, selected[name], 0);
    const isSameRow = Object.values(selected).includes(value);
    setSelected({
      [name]: value,
      [othCol]: isSameRow ? "" : selected[othCol]
    });
    pages.setQuestionValue(currentPageNumber, value, setValue);
    console.log(pages.getQuestionValue(currentPageNumber, 0));
  }

  const checkConclusive = () => {
    // Check totals, 3>= -> conclusive, <3 = inconclusive
    return "Conclusive";
  }

  const handleSubmitClick = () => {
    // Fill in 'questions' array for json

    pages.updateBuckets();
    var currentDate = new Date();
    const isoString = currentDate.toISOString();
    
    let questionsObj = [];
    for (let i = 1; i <= pageAmount; i++) {
      let question = {
        survey_id: 1,
        patient_id: 1,
        question_id: i,
        category_1: pages.getPage(i).question1.bucketValue,
        category_2: pages.getPage(i).question2.bucketValue,
        category_3: pages.getPage(i).question3.bucketValue,
        category_4: pages.getPage(i).question4.bucketValue,
        value_1: pages.getPage(i).question1.value,
        value_2: pages.getPage(i).question2.value,
        value_3: pages.getPage(i).question3.value,
        value_4: pages.getPage(i).question4.value,
      }
      questionsObj[i-1] = question;
    }

    let requestBody = {
      // Cant get these until we get the link
      number_questions: pageAmount,
      survey_id: 1,
      patient_id: 1,

      // Totals !!! NOT ACCOUNTING FOR IF DIFFERENT BUCKETS ARE ADDED !!!!
      maintain_day_to_day_activities: pages.buckets.maintain_day_to_day_activities,
      avoid_dependence: pages.buckets.avoid_dependence,
      avoid_high_costs: pages.buckets.avoid_high_costs, 
      avoid_long_term_side_effects: pages.buckets.avoid_long_term_side_effects,
      living_longer: pages.buckets.living_longer,
      avoid_hospitalization: pages.buckets.avoid_hospitalization,
      avoid_short_term_effects: pages.buckets.avoid_short_term_effects,

      // Conditional on totals
      status: checkConclusive(),

      // Get date
      date_completed: isoString,

      // Quesitons array
      questions: questionsObj,
    }

    // Creating options
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    };
    console.log(JSON.stringify(requestBody))

    const url = 'example.com';

    fetch(url, options)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }


  function Next({isNotFinalQuestion}) {
    if (currentPageNumber < pageAmount) {
      isNotFinalQuestion= true;
    }
    if (isNotFinalQuestion) {
      return <Button className="mx-3" id="nextButton" onClick={handleNextClick} size="lg" >Next</Button>;
    }
  }
  function Submit({isFinalQuestion}) {
    if (currentPageNumber === pageAmount) {
      isFinalQuestion = true;
    }
    if (isFinalQuestion) {
      return <Button className="mx-3" id="submitButton" onClick={handleSubmitClick} variant="success" size="lg" >Submit</Button>;
    }
  }
  function NavButton({number}) {
    if (currentPageNumber === number) {
      return <Button onClick={() => handleNavClick(number)} className="rounded-circle pageNav active" >{number}</Button>
    } else {
      return <Button onClick={() => handleNavClick(number)} className="rounded-circle pageNav" variant="outline-secondary" >{number}</Button>
    }
  }

  return (
    <body>
    <div className="App">
      <Navbar className="p-2" id="color-nav" variant="light">
        <Container>
          <Navbar.Brand href="#home">
            <img
              id="primeLogo"
              src={require('../img/prime-logo-temp.PNG')}
              width="70"
              height="70"
              className="d-inline-block align-top"
              alt="PRIME Logo"
            />
          </Navbar.Brand>
          <Navbar.Text style={{color: 'white'}}>
            Welcome, {userName}
          </Navbar.Text>
        </Container>
      </Navbar>
      <div style = {{display: 'block', padding: 10}}><h3> Question {currentPageNumber} / {pageAmount} </h3></div>

      <div id='questions-guide' className="m-3">
        <p>Choose one outcome that is <strong>most</strong> important to you and one that is <strong>least</strong> important to you</p>
      </div>
      <Container id="questionCardContainer">
        <Card className='shadow mb-3' id="question-card">
        <Card.Body>
        <Container>
          <Card.Title>
          <Row>
            <Col xs={5} sm={4} className="mostLeastCol">Most Important</Col>
            <Col xs={2} sm={4} className="mostLeastCol"></Col>
            <Col xs={5} sm={4} className="mostLeastCol">Least Important</Col>
          </Row>
          </Card.Title>
        </Container>
          <Form>
            
            <Row className="even-row">
              <Col><Form.Check className="radio-large" type='radio' name="column1" value="row1" checked={pages.getQuestionValue(currentPageNumber, 0) === 1} onChange={handleRadioChange}/></Col>
              <Col className="question-col"><p>{currentPage.question1.bucket}</p></Col>
              <Col><Form.Check className="radio-large" type='radio' name="column2" value="row1" checked={pages.getQuestionValue(currentPageNumber, 0) === -1} onChange={handleRadioChange}/></Col>
            </Row>
            <Row className="odd-row">
              <Col><Form.Check className="radio-large" type='radio' name="column1" value="row2" checked={pages.getQuestionValue(currentPageNumber, 1) === 1} onChange={handleRadioChange}/></Col>
              <Col className='question-col'><p>{currentPage.question2.bucket}</p></Col>
              <Col><Form.Check className="radio-large" type='radio' name="column2" value="row2" checked={pages.getQuestionValue(currentPageNumber, 1) === -1} onChange={handleRadioChange}/></Col>
            </Row>
            <Row className="even-row">
              <Col><Form.Check className="radio-large" type='radio' name="column1" value="row3" checked={pages.getQuestionValue(currentPageNumber, 2) === 1} onChange={handleRadioChange}/></Col>
              <Col className="question-col"><p>{currentPage.question3.bucket}</p></Col>
              <Col><Form.Check className="radio-large" type='radio' name="column2" value="row3" checked={pages.getQuestionValue(currentPageNumber, 2) === -1} onChange={handleRadioChange}/></Col>
            </Row>
            <Row className="odd-row" id="lastRow">
              <Col><Form.Check className="radio-large" type='radio' name="column1" value="row4" checked={pages.getQuestionValue(currentPageNumber, 3) === 1} onChange={handleRadioChange}/></Col>
              <Col className="question-col"><p>{currentPage.question4.bucket}</p></Col>
              <Col><Form.Check className="radio-large" type='radio' name="column2" value="row4" checked={pages.getQuestionValue(currentPageNumber, 3) === -1} onChange={handleRadioChange}/></Col>
            </Row>
          </Form>

          <Row>
            <Col id = "submitColumn"> 
            </Col>
          </Row>
        </Card.Body>
      </Card> 
    </Container>
    <div className="mx-auto mb-3">
      <Button className="mx-3" variant="outline-secondary" id="backButton" size="lg" onClick={handleBackClick}>Back</Button>
      <Next></Next>
      <Submit></Submit>
    </div>
    <Container id="questionNavContainer" fluid>
      <div className="row justify-content-md-center">
        <NavButton number={1}></NavButton>
        <NavButton number={2}></NavButton>
        <NavButton number={3}></NavButton>
        <NavButton number={4}></NavButton>
        <NavButton number={5}></NavButton>
        <NavButton number={6}></NavButton>
        <NavButton number={7}></NavButton>
      </div>
    </Container>
    
    </div>
    </body>
  );
}

export default Survey;
