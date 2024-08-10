import Button from "../components/Button";
import SGAME_TurtleRun from "./SGAME_TurtleRun"

const SGAME_TurtleRun_root = () => {
    return (        
        <article>
        <SGAME_TurtleRun canvasId="game_turtleruen" width={600} height={300} fps={60} />        
        </article>
    )
}
export default SGAME_TurtleRun_root;