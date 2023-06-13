import './Question.css'

function Question(props: {question: string, options: string[], green : boolean, questionImg?: string}) {
    let choices = [];
    let i = 0;
    for (const option of props.options) {
        // Every choices list has a hidden zero value checked off by default.
        // Zero values are parsed by the server as unanswered questions in the
        // answerArray and result in a warning for the user.
        choices.push(
            <input type="radio" id="html" name={props.question} value={0} defaultChecked/>
        )
        i++;
        if (option)
            choices.push(
                <><label>
                    <input type="radio" id="html" name={props.question} value={i}/>
                    <div className="option">{option}</div>
                </label></>
            );
    }

    return (
        <div className={"question-container" + (props.green ? " green" : "")}>
            <img className="question-img" src={props.questionImg} alt=" "></img>
            <div className="question">{props.question}
                <div className="choices">
                    {choices}
                </div>
            </div>
        </div>
);
}

export default Question;
