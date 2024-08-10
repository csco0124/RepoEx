import { Link } from "react-router-dom";
import SGAME_Root from "./canvas3/SGAME_Root";

const ExamCanvas3 = () => {        
    return (
        <div className="content">
            <div className="title-item">
                <h2 className="h2-title">game</h2>
                <ul className="location">
                    <li>예제</li><li><Link to = "/examCanvas">Canvas</Link></li><li>3</li>
                </ul>
            </div>      
            <SGAME_Root />  
        </div>
    )
}

export default ExamCanvas3;

