import { useState, useEffect } from 'react';
import './HomeScreen.css';
import Header from './components/Header'
import Preview from "./components/Preview"
import Feedback from "./components/Feedback";
import AboutLink from "./components/AboutLink";
import {Helmet} from "react-helmet";

function HomeScreen() {
  const [data, setData] = useState(Object);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("api/quiz-data")
        .then((res) => res.json())
        .then((data) => setData(data))
        .then(() => setLoaded(true))
  }, []);

  let quizzes = [];
  
  for (let i = data.length - 1; i >= 0; i--)
    quizzes.push(
        <li key = {data[i].route}>
          <Preview
          name={data[i].name}
          date={data[i].date}
          first={data[i].firstRow}
          last={data[i].lastRow}
          image={data[i].imageURL}
          route={data[i].route}/>
        </li>
);

  return (
      <><Helmet>
          <title>The Daily Princetonian Quizzes</title>
          <meta name="description" content="Test your knowledge on recent events with these fun news quizzes by The Daily Princetonian."/>
      </Helmet>
          <div className="Home">
              <Header></Header>
              <p className={'loading' + (isLoaded ? " hidden" : "")}>Loading...</p>
              <div className={(!isLoaded ? "hidden" : "")}>
                  <div className={"featured-banner"}>
                      <div className="featured-text">THE LATEST QUIZ</div>
                      <div className="featured">{quizzes[0]} </div>
                  </div>
                  <h1 style={{textAlign: 'center'}}>PREVIOUS QUIZZES</h1>
                  <span className="grid">{quizzes.slice(1)}</span>
                  <AboutLink></AboutLink>
              </div>
              <Feedback></Feedback>
          </div>
      </>
  );
}

export default HomeScreen;
