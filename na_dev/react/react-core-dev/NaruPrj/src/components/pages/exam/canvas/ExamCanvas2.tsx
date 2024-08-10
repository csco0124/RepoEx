import { Link } from "react-router-dom";
import DoteDraw from "./canvas2/DoteDraw";

const ExamCanvas2 = () => {
    return (
        <div className="content">
        <div className="title-item">
            <h2 className="h2-title">Dote Drawing</h2>
            <ul className="location">
                <li>예제</li><li><Link to = "/examCanvas">Canvas</Link></li><li>2</li>
            </ul>
        </div>
        <DoteDraw />
    </div>
    )
}
export default ExamCanvas2;