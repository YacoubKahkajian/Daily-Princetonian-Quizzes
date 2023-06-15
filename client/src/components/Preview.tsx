import {useNavigate} from "react-router-dom";
import './Preview.css';

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
            <div className="details">
                <span className="name">{comp.name}</span><br></br>
                <span className="date">{comp.date}</span>
            </div>
            <img src={comp.image} alt=""></img>
        </div>
    )
}

export default Preview;