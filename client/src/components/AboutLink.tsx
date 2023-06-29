import {useNavigate} from "react-router-dom";

function AboutLink() {
    const navigate = useNavigate();
    function handleClick() {
        navigate('/about');
    }

    return (
        <div onClick={handleClick} style={{textAlign: "center", fontWeight: "bold", cursor: "pointer", color:"gray"}}>
            <p>About this app</p>
        </div>
    )
}

export default AboutLink;