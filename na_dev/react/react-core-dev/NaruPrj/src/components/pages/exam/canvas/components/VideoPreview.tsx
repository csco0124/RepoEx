import { ChangeEvent, useEffect, useState } from "react";
import TableViewLayout from "./TableViewLayout";

interface VidoePreviewProps {
    data:Array<string>;
    fps:number;
    width:number;
    height:number;
}

const VidoePreview = (props:VidoePreviewProps) =>  {
    const [idx, setIdx] = useState(0);
    const [fileName, setFileName] = useState("capture.zip");

    useEffect(()=> {
        const interval = setInterval(()=> {
            let newIdx = idx + 1;
            if(newIdx >= props.data.length) {
                newIdx = 0;
            }
            setIdx(newIdx);
            
        }, 1000 / props.fps);
        return(()=> {
            clearInterval(interval)
        })
    })

    
    const makeMp4 = () => {             

        // const zip = new JSZip(); // JSZip 인스턴스 생성
        // for (let i = 0; i < props.data.length; i++) {
        //     const fileName = "captureImage" + String(i).padStart(5, '0');;
        //     const dataURL = props.data[i]; // 이미지 얻기
        //     const blob = dataURItoBlob(dataURL); // blob 만들기
        //     zip.file(`${fileName}.png`, blob, { binary: true }); // zip 파일에 추가
        // }
        
        // // zip 파일을 Blob으로 만들기
        // zip.generateAsync({ type: "blob" }).then(zipFile => {           
        //     saveAs(zipFile, fileName); // zip 파일 다운로드 실행
        // });
    }

    const onChangeFileName = (event:ChangeEvent<HTMLInputElement>) => {
        setFileName(event.target.value);
    }

    return (
        <div className="videopreview">       
        <img src={props.data.length == 0 ? 'https://via.placeholder.com/'+props.width+'/FFFF00/000000' : props.data[idx]} alt="preview" width={props.width} height={props.height} />             
        <TableViewLayout datas = {
        [{
            title : "fileName",
            component : <span>
                <input type="text" value={fileName} name="fileName" onChange={onChangeFileName}/>
                <button onClick={makeMp4} hidden={props.data.length == 0}>download</button>             
            </span>
        }]
        } />
        </div>
    )
}

export default VidoePreview