import Header from "./Header";
import Feedback from "./Feedback";
import AboutLink from "./AboutLink";

function About() {

    return (
        <div className='about' style={{paddingTop: '100px', margin: '0 10vw'}}>
            <Header></Header>
            <div className='content'>
                <h1>Credits</h1>
                <p>The Daily Princetonian Quizzes was made with 🧡 under the 147th Board of The Daily Princetonian. Software engineering by:</p>
                <ul>
                    <li style={{listStyle: 'revert'}}><strong>Yacoub Kahkajian '26</strong>: Lead Full Stack Developer</li>
                    <li style={{listStyle: 'revert'}}><strong>Brett Zeligson '24</strong>: Full Stack Developer</li>
                    <li style={{listStyle: 'revert'}}><strong>Anhkien Nguyen '25</strong>: Conceptualization & Frontend Developer</li>
                    <li style={{listStyle: 'revert'}}><strong>Javier Linero-Quintana '25</strong>: Conceptualization & Frontend Developer</li>
                </ul>
                <h1>Thank you!</h1>
                <p>We hope you had fun trying some news quizzes by The Daily Princetonian! If you have any suggestions, feature requests, or bug reports, feel free to fill out the feedback form linked at the little orange tab on the right of your screen.</p>
            </div>
            <Feedback></Feedback>
            <AboutLink></AboutLink>
        </div>
    )
}

export default About;