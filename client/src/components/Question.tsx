import './Question.css'

function Question(props: {question: string, options: string[], green : boolean, questionImg?: string}) {
    let choices = [];
    let i = 0;
    for (const option of props.options) {
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
