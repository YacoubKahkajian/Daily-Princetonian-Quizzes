import './Header.css'
import {useNavigate} from "react-router-dom"

function Header(){
    const navigate = useNavigate();

    return(
        <div className="header">
            <img className="logo" src="https://dirgyzwl2hnqq.cloudfront.net/ff9419fb986f760c1b0b24d4b9046051/dist/img/favicons/apple-icon-57x57.png"></img>
            <span onClick={()=>navigate("/")}>Home</span>
        </div>
    )
}

export default Header;