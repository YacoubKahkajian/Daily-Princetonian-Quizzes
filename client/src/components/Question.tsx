import './Question.css'

function Question(props: {question: string, options: string[], green : boolean, questionImg?: string}) {
    let choices = [];
    let i = 0;
    for (const option of props.options) {
        i++;
        if (option)
            choices.push(
                <><label><input type="radio" id="html" name={props.question} value={i}/>{option}</label></>
            );
    }

    return (
        <div className={"Question" + (props.green ? " green" : "")}>
            <img className="question-img" src={props.questionImg} alt=" "></img>
            <span className="question">{props.question}</span>

            <div className="choices">
                {choices}
            </div>
        </div>
);
}

export default Question;
