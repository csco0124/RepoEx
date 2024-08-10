import { Link } from "react-router-dom";
import SGAME_Tetris_Root from "./canvas4/SGAME_Tetris_Root";

const ExamCanvas4 = () => {        
    return (
        <div className="content">
            <div className="title-item">
                <h2 className="h2-title">game</h2>
                <ul className="location">
                    <li>예제</li><li><Link to = "/examCanvas">Canvas</Link></li><li>4</li>
                </ul>
            </div>      
            <SGAME_Tetris_Root />
        </div>
    )
}

export default ExamCanvas4;
