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
        <fieldset>
          <label><input type="radio" id="html" value={props.option1}/>{props.option1}</label>
          
          <label><input type="radio" id="css" value={props.option2}/>{props.option2}</label>
          
          <label ><input type="radio" id="javascript" value={props.option3}/>{props.option3}</label>
          
          <label><input type="radio" id="react" value={props.option4}/>{props.option4}</label>
        </fieldset>
      </div>
    </div>
  );
}

export default Question;
