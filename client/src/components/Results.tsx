import './Results.css';
import {useState} from "react";

function Results(props: {correct: number, total: boolean[], visible: boolean, name: string}) {
    let shareString = "";
    const [copyButtonText, setCopyButtonText] = useState("Copy to clipboard")
    function generateShare() {
        if (!shareString) {
            shareString += `${props.name}: ${props.correct}/${props.total.length}\n`
            props.total.forEach((q: boolean) => {
                if (q) shareString += '✅'
                else shareString += '🟥'
            })
            shareString += `\n${window.location.href}`
        }
    }
    function copyToClipboard() {
        generateShare();
        navigator.clipboard.writeText(shareString);
        setCopyButtonText("Copied!");
    }

    function shareSheet() {
        generateShare();
        const shareData = {
            title: `${props.name}`,
            text: `${shareString}`,
            url: `${window.location.href}`
        }
        navigator.share(shareData);
    }

    return (
        <div className={"results-window" +  (!props.visible ? " hidden" : "")}>
            <div className="score"><span className="bold">{props.correct}/{props.total.length}</span> correct</div>
            <div className="buttons">
                <button onClick={shareSheet} className={(!navigator.canShare ? "hidden" : "")}>Share</button>
                <button onClick={copyToClipboard}>{copyButtonText}</button>
            </div>
        </div>
    )
}

export default Results;