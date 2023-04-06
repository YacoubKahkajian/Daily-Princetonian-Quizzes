import './Preview.css'
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
        navigate(`${comp.route}/${comp.first}/${comp.last}`);
    }

    return (
        <div className="big-block" onClick={handleClick}>
            <img src={comp.image} alt=""></img>
            <span>{comp.name}</span>
        </div>
    )
}

export default Preview