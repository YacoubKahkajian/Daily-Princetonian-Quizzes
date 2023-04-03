import { useState, useEffect } from 'react';
import './HomeScreen.css';
import {useNavigate} from "react-router-dom"
import Header from './components/Header'

function HomeScreen() {
  const [data, setData] = useState(Object);
  const navigate = useNavigate();

  // useEffect works such that whenever the thing in the square brackets changes, the function on the left is run
  // if the square bracket space is empty, the function runs on page load.
  // for instance if "i" was in the square brackets, whenever i was altered, the function would run
  // useEffect(() => {
  //   fetch("/api")
  //       .then((res) => res.json())
  //       .then((data) => setData(data))
  // }, []);

  // let quizzes = [];
  // for (let i = 0; i < data.length; i++)
  //   quizzes.push(<Quiz name={data[i].name} date={data[i].date} first={data[i].firstRow} last={data[i].lastRow}></Quiz>);

  return (
    <div className="Home">
      <Header></Header>
      <p className="page-title">Quizzes</p>
      <div className="big-block" onClick={()=>navigate("/example-quiz-1")}>
        <img src="https://localadventurer.com/wp-content/uploads/2018/04/nyc-bucket-list-new-york.jpg"></img>
        <span>Example Title</span>
      </div>
      <div className="right-sidebar-block" onClick={()=>navigate("/example-quiz-2")}>
        <img src="https://localadventurer.com/wp-content/uploads/2018/04/nyc-bucket-list-new-york.jpg"></img>
        <span>Example Title</span>
      </div>
      <div className="below-block" onClick={()=>navigate("/example-quiz-3")}>
        <img src="https://localadventurer.com/wp-content/uploads/2018/04/nyc-bucket-list-new-york.jpg"></img>
        <span>Example Title</span>
      </div>
    </div>
  );
}

export default HomeScreen;
