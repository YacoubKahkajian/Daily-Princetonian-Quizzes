import { useState, useEffect } from 'react';
import './HomeScreen.css';
import Header from './components/Header'
import Preview from "./components/Preview"

function HomeScreen() {
  const [data, setData] = useState(Object);

  useEffect(() => {
    fetch("api/quiz-data")
        .then((res) => res.json())
        .then((data) => setData(data))
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
    <div className="Home">
      <Header></Header>
        <div className="featured-banner">
            <div className="featured-text">THE LATEST QUIZ</div>
            <div className="featured">{quizzes[0]} </div>
        </div>
        <h1 style={{textAlign: 'center'}}>PREVIOUS QUIZZES</h1>
        <span className="grid">{quizzes.slice(1)}</span>
    </div>
  );
}

export default HomeScreen;
