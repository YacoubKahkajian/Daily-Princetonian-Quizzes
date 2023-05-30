// the "?" after id means it's an optional argument, so when you create a <Question> it must have a name argument, but can or cannot have an id
// function Question(props: {name: String, id?: number}) {
import './Question.css'

function Question(props: {question: string, options: string[], questionImg?: string, correct: number}) {
    let choices = [];
    let i = 0;
    for (const option of props.options) {
        i++;
        if (option != null)
            choices.push(
                <><input type="radio" id="html" value={props.correct == i ? 'green' : 'red'}/><label>{option}</label></>
            );
    }

    return (
        <div className="Question">
            {/* the different inputs are stored in the props argument object, so to access them do "props.{add in your attribute you want}" */}
            {/* <p>{props.name} {props.id}</p> */}
            <img className="question-img" src={props.questionImg} alt=" "></img>
            <span className="question">{props.question}</span>

            <div className="choices">
                {choices}
            </div>
            <button className="check-question">Check</button>
        </div>
    );
}

export default Question;
