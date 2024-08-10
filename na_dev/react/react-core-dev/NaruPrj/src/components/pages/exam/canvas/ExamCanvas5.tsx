import { Link } from "react-router-dom";
import Chart_Example from "./canvas5/Chart_Example";

const ExamCanvas5 = () => {        
    return (
        <div className="content">
            <div className="title-item">
                <h2 className="h2-title">Chart</h2>
                <ul className="location">
                    <li>예제</li><li><Link to = "/examCanvas">Canvas</Link></li><li>5</li>
                </ul>
            </div>      
            <Chart_Example/>
        </div>
    )
}

export default ExamCanvas5;
