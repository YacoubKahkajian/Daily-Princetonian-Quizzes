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
  for (let i = 0; i < data.length; i++)
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
      <p className="page-title">Quizzes</p>
        <span className="featured">{quizzes[0]} </span>
        <span className="grid">{quizzes.slice(1)}</span>
    </div>
  );
}

export default HomeScreen;
