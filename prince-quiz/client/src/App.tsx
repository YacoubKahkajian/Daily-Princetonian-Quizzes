import { useState, useEffect } from 'react';
import Quiz from './components/Quiz';
import './App.css';

function App() {
  const [data, setData] = useState(Object);

  // useEffect works such that whenever the thing in the square brackets changes, the function on the left is run
  // if the square bracket space is empty, the function runs on page load.
  // for instance if "i" was in the square brackets, whenever i was altered, the function would run
  useEffect(() => {
    fetch("/api")
        .then((res) => res.json())
        .then((data) => setData(data))
  }, []);

  let quizzes = [];
  for (let i = 0; i < data.length; i++)
    quizzes.push(<Quiz name={data[i].name} date={data[i].date} first={data[i].firstRow} last={data[i].lastRow}></Quiz>);

  return (
    <div className="App">
      {quizzes}
    </div>
  );
}

export default App;
