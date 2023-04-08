import './Quiz.css';
import Question from './Question'
import Header from './Header'
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

function Quiz() {
    let params = useParams();
    console.log(params.shortName);
    console.log(params.first);
    console.log(params.last);

    const [data, setData] = useState(Object);

    useEffect(() => {
        fetch(`/api/question-data?select=${params.first}-${params.last}`)
            .then((res) => res.json())
            .then((data) => setData(data))
    }, []);

    return (
        <div className="Quiz">
            <Header/>
            <span className='quiz-title'>Title</span>
            <span className='sub-title'>Subtitle</span>
            <Question
                question="Question 1 question"
                option1="This is option A"
                option2="This is option B"
                option3="This is option C"
                option4="This is option d"
                questionImg="https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Cannon_Green_and_Nassau_Hall%2C_Princeton_University.jpg/1200px-Cannon_Green_and_Nassau_Hall%2C_Princeton_University.jpg"
            />
            <Question
                question="Question 2 question"
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
