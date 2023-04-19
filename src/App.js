import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Navbar, ProgressBar } from 'react-bootstrap';
import {useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import QuestionView from './questionView';
import * as pages from './questions.js';
import Survey from './scenes/surveyScreen.jsx';
import LandingPage from './scenes/landing.jsx';
import { Routes, Route,} from "react-router-dom";
import { BrowserRouter } from "react-router-dom"







function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<LandingPage/>} />
      <Route path="/survey" element={<Survey/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
