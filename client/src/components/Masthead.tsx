import './Masthead.css';

function Masthead(props: {title: string, subtitle: string, author: string, date: string}) {
    function shareSheet() {
        const shareData = {
            title: `${props.title}`,
            text: `Check out this ${props.title} news quiz from The Daily Princetonian!`,
            url: `${window.location.href}`
        }
        navigator.share(shareData);
    }

    return (
        <div className='masthead'>
            <div className='quiz-title'>{props.title}</div>
            <div className='sub-title'>{props.subtitle}</div>
            <div className='metadata'>
                <div className='credits'>
                    <div className='author'>{props.author}</div>
                    <div className='quizDate'>&nbsp;| {props.date}</div>
                </div>
                <button onClick={shareSheet} className={'socials' + (!navigator.canShare ? " hidden" : "")}>SHARE</button>
            </div>
        </div>
    )
}

export default Masthead;