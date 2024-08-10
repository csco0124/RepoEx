import { useEffect, useState } from "react";
import { SGAME_Tetris } from "./instance/SGAME_Tetris";
import Button from "../components/Button";
import SGAME_Tetris_Game from "./components/SGAME_Tetris_Game";
import RangeInput from "../components/RangeInput";


const SGAME_Tetris_Root = () => {    
    return(
        <article>
            <SGAME_Tetris_Game 
            canvasId="tetris"
            previewLength={6}
            fps={60}
            col={10}
            row={15}
            width={300}
            height={450}
            />
        </article>
    )
}
export default SGAME_Tetris_Root;