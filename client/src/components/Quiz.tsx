import './Quiz.css';
import Question from './Question';
import Header from './Header';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

function Quiz(this: any) {
    let params = useParams();
    const range = {
        first: params.first,
        last: params.last
    }

    const [data, setData] = useState(Object);
    const [correct, setCorrect] = useState(Number);

    useEffect(() => {
        fetch(`/api/question-data`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(range)})
            .then((res) => res.json())
            .then((data) => setData(data))
    }, []);

    let questions = [];
    for (let i= 0; i < data.length; i++) {
        questions.push(
            <Question
                question={data[i].q}
                options={[data[i].option1, data[i].option2, data[i].option3, data[i].option4]}
                questionImg={data[i].questionImg}
                />
        )
    }

    function handleSubmit(event: { preventDefault: () => void; target: any; }) {
        event.preventDefault();
        const form = event.target;
        const formData = Object.fromEntries(new FormData(form));
        fetch('/api/submits', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({formData, range})})
            .then((res) => res.json())
            .then((correct) => setCorrect(correct))
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
