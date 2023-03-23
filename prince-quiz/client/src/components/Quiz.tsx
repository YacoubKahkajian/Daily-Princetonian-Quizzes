function Quiz(props: {name: String, date: String, first: number, last: number}) {

    function handleClick(){
        console.log(props.first);
        console.log(props.last);
    }

  return (
    <div className="App">
        <button onClick={handleClick}>{props.name}</button>
        <p>{props.date}</p>
    </div>
  );
}

export default Quiz;
