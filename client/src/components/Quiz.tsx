import './Quiz.css';
import Question from './Question';
import Header from './Header';
import Modal from 'react-modal';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

// Tells screen readers to ignore the background when a modal appears.
Modal.setAppElement('#root');
function Quiz(this: any) {
    // Takes the first and last rows from the spreadsheet that should
    // be considered from the URL of the quiz.
    // TO-DO: Would be nice if we could find a way to link this to
    // the shortname so people couldn't just type any numbers up there.
    let params = useParams();
    const shortName = {shortName: params.shortName};

    // Updates the questions upon fetching them
    const [data, setData] = useState(Object);
    const [correct, setCorrect] = useState(Number);
    const [range, setRange] = useState(Object);
    const [title, setTitle] = useState(String);
    const [subtitle, setSub] = useState(String);
    // Updates the individual questions to mark as correct, where true represents a
    // question that was correctly answered.
    let initialMark : boolean[] = new Array(data.length).fill(false);
    const [mark, setMark] = useState(initialMark);
    // Required to use the react-modal library.
    const [modalIsOpen, setIsOpen] = useState(false);

    // Fetch the quiz questions from the Google Sheet, using the
    // parameters from the URL, and updates the page's state.
    useEffect(() => {
        fetch(`/api/question-data`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(shortName)})
            .then((res) => res.json())
            .then(data => {
                setData(data.questions);
                setRange(data.range);
                setTitle(data.title);
                setSub(data.subtitle);
            });
    }, []);

    // Constructs the question components using JSON data and
    // puts components in a list.
    let questions = [];
    for (let i= 0; i < data.length; i++) {
        questions.push(
            <Question
                key={data[i].q}
                question={data[i].q}
                options={[data[i].option1, data[i].option2, data[i].option3, data[i].option4]}
                green={mark[i]}
                questionImg={data[i].questionImg ? data[i].questionImg : null}
                />
        );
    }

    // We store the responses and final markings in separate states, so
    // we can withhold the results if there is a blank answer and show
    // them if the user decides to submit anyway.
    let [responses, setResponses] = useState(Object);

    // Runs upon quiz submission. Creates a FormData object that is
    // then converted to a JSON object which can be parsed by the server
    // and can update the attributes of the individual questions.
    function handleSubmit(event: { preventDefault: () => void; target: any }) {
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
            .then((mark) => {setResponses(mark)})
    }

    // Right after we update the responses array, we should check if it
    // contains any unanswered questions and open the warning dialog if
    // it does so.
    useEffect(() => {
        if (responses.blanks) openModal();
        else if (responses.blanks != null) markAnswers();
    }, [responses]);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
        setResponses([]);
    }

    // Update the CSS so correct questions are marked accordingly,
    // and we get a final count of correct answers.
    function markAnswers() {
        setMark(responses.correct);
        let correct = 0;
        responses.correct.forEach((q: boolean) => {if (q) correct++});
        setCorrect(correct);
        closeModal();
    }

    return (
        <>
            <Header/>
            <Modal isOpen={modalIsOpen}
                   onRequestClose={closeModal}
                   contentLabel="Blank answer warning"
                   className="Modal"
                   overlayClassName="Overlay">
                <h1>Easy, tiger!</h1>
                <div style={{fontSize: '20px'}}>You left at least one question blank. Want to see what you skipped before you submit?</div>
                <form>
                    <button className='modal-option' onClick={closeModal}>Okay</button>
                    <button className='modal-option' onClick={markAnswers}>Submit anyways</button>
                </form>
            </Modal>
            <div id="root">
                <span className='quiz-title'>{title}</span>
                <span className='sub-title'>{subtitle}</span>
                <form className='form' onSubmit={handleSubmit}>
                    {questions}
                    <input type="submit" className='finish-quiz' value="Check answers"/>
                </form>
            </div>
            <p>{correct}</p>
        </>
    );
}

export default Quiz;
