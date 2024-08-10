import { Link } from "react-router-dom";
import SGAME_TurtleRun_root from "./canvas6/SGAME_TurtleRun_root";

const ExamCanvas6 = () => {        
    return (
        <div className="content">
            <div className="title-item">
                <h2 className="h2-title">Turtle Run</h2>
                <ul className="location">
                    <li>예제</li><li><Link to = "/examCanvas">Canvas</Link></li><li>6</li>
                </ul>
            </div>      
            <SGAME_TurtleRun_root />


        </div>
    )
}

export default ExamCanvas6;
