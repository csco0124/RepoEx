import KCanvasView from './components/KCanvasView';
import { Link } from "react-router-dom";

const ExamCanvas1 = () => {
    return (
        <div className="content">
        <div className="title-item">
            <h2 className="h2-title">Canvas Animation</h2>
            <ul className="location">
                <li>예제</li><li><Link to = "/examCanvas">Canvas</Link></li><li>1</li>
            </ul>
        </div>
        <KCanvasView width={300} height={300} canvasid = "canvas1" recordlimit = {200}/>

    </div>
    )
}
export default ExamCanvas1;