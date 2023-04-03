import './Quiz.css';
import {useNavigate} from "react-router-dom"
import Question from './Question'
import Header from './Header'

function Quiz(props: {name: String, date: String, first: number, last: number}) {
  const navigate = useNavigate();
    function handleClick(){
        console.log(props.first);
        console.log(props.last);
    }

  return (
    <div className="Quiz">
        <Header/>
        {/* <button onClick={handleClick}>{props.name}</button>
        <p>{props.date}</p> */}
        <span className='quiz-title'>Title</span>
        <span className='sub-title'>Subtitle</span>
        <Question 
          question="Quesiton 1 question" 
          option1="This is option A" 
          option2="This is option B"
          option3="This is option C"
          option4="This is option d"
          questionImg="https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Cannon_Green_and_Nassau_Hall%2C_Princeton_University.jpg/1200px-Cannon_Green_and_Nassau_Hall%2C_Princeton_University.jpg"
        />
        <Question 
          question="Quesiton 2 question" 
          option1="This is option A" 
          option2="This is option B"
          option3="This is option C"
          option4="This is option d"
          questionImg="https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Cannon_Green_and_Nassau_Hall%2C_Princeton_University.jpg/1200px-Cannon_Green_and_Nassau_Hall%2C_Princeton_University.jpg"
        />
        
        <button className="finish-quiz">Finish Quiz</button>
    </div>
  );
}

export default Quiz;
