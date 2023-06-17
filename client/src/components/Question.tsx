import './Question.css'
import {useEffect, useState} from "react";

function Question(props: {question: string, options: string[], green : boolean, disabled: boolean, questionImg?: string, altText?: string, explain?: string}) {
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
                    <input type="radio" id="html" name={props.question} value={i} disabled={props.disabled}/>
                    <div className={"option" + (props.disabled ? " disabled" : "")}>{option}</div>
                </label></>
            );
    }

    const [color, setColor] = useState(String);
    useEffect(() => {
        console.log("hi");
        if (props.green) setColor(" green");
        else if (props.disabled) setColor(" red");
    }, [props.disabled]);

    return (
        <div className={"question-container " + color}>
            <img className="question-img" src={props.questionImg} alt={props.altText}></img>
            <div className="question">{props.question}
                <div className="choices">
                    {choices}
                </div>
                <div className={"explain" + (!props.disabled ? " hidden" : "")}>{props.explain}</div>
            </div>
        </div>
);
}

export default Question;
