// the "?" after id means it's an optional argument, so when you create a <Question> it must have a name argument, but can or cannot have an id
function Question(props: {name: String, id?: number}) {
  return (
    <div className="App">
      {/* the different inputs are stored in the props argument object, so to access them do "props.{add in your attribute you want}" */}
      <p>{props.name} {props.id}</p>
    </div>
  );
}

export default Question;
