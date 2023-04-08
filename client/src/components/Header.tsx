import './Header.css'
import {useNavigate} from "react-router-dom"

function Header(){
    const navigate = useNavigate();

    return(
        <div className="header">
            <div className="left">
                <img className="logo" src="https://dirgyzwl2hnqq.cloudfront.net/ff9419fb986f760c1b0b24d4b9046051/dist/img/favicons/apple-icon-57x57.png"></img>
                <span className="links"onClick={()=>navigate("/")}>HOME</span>
                <span className="links"onClick={()=>navigate("/")}>CATEGORIES</span>
            </div>
            <div className="right">
                <span className="links"onClick={()=>navigate("/")}>Sign in</span>
                <span className="register"onClick={()=>navigate("/")}>Create free account</span>
            </div>
        </div>
    )
}

export default Header;