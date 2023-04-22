// the "?" after id means it's an optional argument, so when you create a <Question> it must have a name argument, but can or cannot have an id
// function Question(props: {name: String, id?: number}) {
import './Question.css'

function Question(props: {question: string, option1: string, option2: string, option3: string, option4: string, questionImg: string}) {
  return (
    <div className="Question">
      {/* the different inputs are stored in the props argument object, so to access them do "props.{add in your attribute you want}" */}
      {/* <p>{props.name} {props.id}</p> */}
      <span className="question">{props.question}</span>
      <img className="question-img" src={props.questionImg}></img>

      <div className="choices">
          <input type="radio" id="choice1" name="button" value={props.option1}/>
          <label htmlFor ="choice1">{props.option1}</label><br></br>

          <input type="radio" id="choice2" name="button" value={props.option2}/>
          <label htmlFor ="choice2">{props.option2}</label><br></br>
          
          <input type="radio" id="choice3" name="button" value={props.option3}/>
          <label htmlFor ="choice3">{props.option3}</label><br></br>
          
          <input type="radio" id="choice4" name="button" value={props.option4}/>
          <label htmlFor ="choice4">{props.option4}</label><br></br>
      </div>
    </div>
  );
}

export default Question;
