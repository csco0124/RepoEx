import { Link } from "react-router-dom";

const ExamCanvasList = () => {
    return (
        <div className="content">
        <div className="title-item">
            <h2 className="h2-title">Canvas</h2>
            <ul className="location">
                <li>예제</li><li>Canvas</li>
            </ul>            
        </div>
        Canvas 
        <nav>
        <ul>
            <li key={0}><Link to = "./1"> 01 : Canvas Animation </Link></li>
            <li key={1}><Link to = "./2"> 02 : Dote Draw</Link></li>
            <li key={2}><Link to = "./3"> 03 : game : Shooting</Link></li>
            <li key={3}><Link to = "./4"> 04 : game : Tetris</Link></li>
            <li key={3}><Link to = "./5"> 05 : Chart</Link></li>
            <li key={3}><Link to = "./6"> 06 : game : Turtle Run</Link></li>
        </ul>

        </nav>

    </div>
    )
}
export default ExamCanvasList;