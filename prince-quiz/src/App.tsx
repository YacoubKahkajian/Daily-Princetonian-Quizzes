import { useState, useEffect } from 'react';
// to use the new component, you need to import it, "." means current folder, so the question component is in currentfolder(which is src)/components/question
import Question from './components/Question';
import './App.css';

function App() {
  // start with state equal to false (it could also be a string or int depending on what you want) -> every time the state is changed using setIsCorrect(),
  // everything which is dependent on isCorrect is updated
  const [isCorrect, setIsCorrect] = useState(false)

  // useEffect works such that whenever the thing in the square brackets changes, the function on the left is run
  // if the square bracket space is empty, the function runs on page load.
  // for instance if "i" was in the square brackets, whenever i was altered, the function would run
  useEffect(() => {
    // console.log will be really helpful in debugging, if you double click on the page in the broswer and go to "inspect", then at the top of the pop-up if you click "Console", you'll see the logged stuff come up (everytime the page loads, the below text will show up due to the useEffect) 
    console.log("hey, I've loaded")
  }, [])

  // example of making an array of objects that can be generated on line 24. "push()" adds an item to the end of the array
  let i = []
  i.push(<Question name={"q1"} id={30}/>)
  i.push(<Question name={"q2"} id={40}/>)
  i.push(<Question name={"q3"} id={50}/>)
  i.push(<Question name={"q4"} id={60}/>)
  i.push(<Question name={"q5"} id={70}/>)

  return (
    <div className="App">
      <p>Ex Paragraph</p>
      {/* use curly brackets to input placeholders */}
      {/* render whole array created above */}
      {i}

      {/* short if statement syntax. The way this is read is, "if isCorrect == true, return question name="correct" etc., else return question name="incorrect" etc */}
      {/* note that isCorrect is a state variable so if we change it with the onclick button attribute, this condition will be rerun */}
      {isCorrect ? (
        <Question name={"Correct!"} id={30}/>
      ) : (
        <Question name={"Incorrect"} id={30}/>
      )}
      
      {/* change state on click */}
      <button onClick={() => {setIsCorrect(true)}}>Click me to change to correct!</button>
    </div>
  );
}

export default App;
