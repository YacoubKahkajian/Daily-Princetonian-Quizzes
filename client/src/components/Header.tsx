import './Header.css'
import {useNavigate} from "react-router-dom"

function Header(){
    const navigate = useNavigate();

    return(
        <div className="header">
            <div className="left">
                <a href="https://dailyprincetonian.com">
                    <img className="logo" src="https://prince-web-assets.s3.amazonaws.com/projects.dailyprincetonian.com/quiz-app/tiger-head.png" alt="The Daily Princetonian"></img>
                </a>
                <span className="links" onClick={()=>navigate("/")}>HOME</span>
                <span className="links" onClick={()=>navigate("/")}>CATEGORIES</span>
            </div>
        </div>
    )
}

export default Header;