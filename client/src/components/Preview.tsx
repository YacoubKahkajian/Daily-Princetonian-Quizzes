import {useNavigate} from "react-router-dom";

interface props {
    name: string;
    date: string;
    first: number;
    last: number;
    image: string;
    route: string;
}

function Preview(comp: props) {
    const navigate = useNavigate();
    function handleClick() {
        navigate(`${comp.route}`);
    }

    return (
        <div className="big-block" onClick={handleClick}>
            <img src={comp.image} alt=""></img>
            <span className="name">{comp.name}</span><br></br>
            <span className="date">Created: {comp.date}</span>
        </div>
    )
}

export default Preview;