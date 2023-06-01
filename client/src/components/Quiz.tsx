import './Quiz.css';
import Question from './Question';
import Header from './Header';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

function Quiz(this: any) {
    // Takes the first and last rows from the spreadsheet that should
    // be considered from the URL of the quiz.
    // TO-DO: Would be nice if we could find a way to link this to
    // the shortname so people couldn't just type any numbers up there.
    let params = useParams();
    const range = {
        first: params.first,
        last: params.last
    }

    // Updates the questions upon fetching them
    const [data, setData] = useState(Object);
    // Updates the number of questions correct upon the quiz's submission.
    const [correct, setCorrect] = useState(Number);
    // Updates the individual questions to mark as correct, where true represents a
    // question that was correctly answered.
    let initialMark : boolean[] = new Array(data.length).fill(false);
    const [mark, setMark] = useState(initialMark);

    // Fetch the quiz questions from the Google Sheet, using the
    // parameters from the URL, and updates the page's state.
    useEffect(() => {
        fetch(`/api/question-data`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(range)})
            .then((res) => res.json())
            .then((data) => setData(data))
    }, []);

    // Constructs the question components using JSON data and
    // puts components in a list.
    let questions = [];
    for (let i= 0; i < data.length; i++) {
        questions.push(
            <Question
                question={data[i].q}
                options={[data[i].option1, data[i].option2, data[i].option3, data[i].option4]}
                green={mark[i]}
                questionImg={data[i].questionImg ? data[i].questionImg : null}
                />
        );
    }

    // Runs upon quiz submission. Creates a FormData object that is
    // then converted to a JSON object which can be parsed by the server
    // and can update the attributes of the individual questions.
    function handleSubmit(event: { preventDefault: () => void; target: any; }) {
        event.preventDefault();
        const form = event.target;
        const formData = Object.fromEntries(new FormData(form));
        fetch('/api/submits', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({formData, range})})
            // This response returns an array of booleans which we
            // use to determine which questions were correct or not.
            .then((res) => res.json())
            // Change the class name of each question if its respective
            // index in the array is true. Then, add up all the true
            // values to get a final count of correct answers.
            .then((mark) => {
                setMark(mark);
                let correct = 0;
                mark.forEach((q: boolean) => {if (q) correct++});
                setCorrect(correct);
            })
    }

    return (
        <div className="Quiz">
            <Header/>
            <span className='quiz-title'>Title</span>
            <span className='sub-title'>Subtitle</span>
            <form onSubmit={handleSubmit}>
                {questions}
                <input type="submit"/>
            </form>
            <p>{correct}</p>
        </div>
    );
}

export default Quiz;
