import './Header.css'
import {useNavigate} from "react-router-dom"

function Header(){
    const navigate = useNavigate();

    return(
        <div className="header">
            <div className="left">
                <a href="https://dailyprincetonian.com">
                    <span className="wordmark">THE DAILY PRINCETONIAN&nbsp;&nbsp;&nbsp;|</span>
                </a>
                <span className="links" onClick={()=>navigate("/")}>QUIZZES</span>
            </div>
        </div>
    )
}

export default Header;