/**
 * client page 의 element 정의
 *  @param params
 *  @param setFlag (list 재조회 필요 여부 flag)
 * 
 */
import axios from "axios";
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@mui/material';

// 데이터 형식 처리
const dataFn = (params: any) => {

    if(!params.data) {
        params = params;
    }else {
        params = params.data;
    }

    return params;
}

//수정하기 버튼 렌더링
export const editButtonCellRender = (params: any) => {
    params = dataFn(params);
    
    return (
        
            <Button
                component={RouterLink}
                to="/private/view/admin/management/clientEdit"
                variant="contained" 
                size="small"
                onClick={()=>{editButtonCellClicked(params)}}
                >
                수정하기
            </Button>
    )
}

export function editButtonCellClicked(params: any){

    params = dataFn(params);
    location.href="/private/view/admin/management/clientEdit";    

    // localStorage에 저장할 공간이 없는 경우 
    try {
        window.localStorage.setItem("editClientId", params.id);
    }catch {
        alert("cannot store the item in localStorage.");
    }


}

//삭제하기 버튼 렌더링
export const deleteButtonCellRender = (params: any, refreshData: any , setOpen: any) => {
    params = dataFn(params);

    return (
        <div>
            <Button variant="outlined" size="small" color="error" onClick={()=>{deleteButtonClicked(params, refreshData, setOpen)}}>삭제하기</Button>
        </div>
    )
}

export async function deleteButtonClicked(params: any, refreshData: any, setOpen: any) {

    dataFn(params);

    const id = params.id;
    const clientName = params.row.clientName;

    if(!!confirm(`${clientName}를 삭제하시겠습니까?`)){
        try {
            console.log("delete ajax 타는중...");
            await axios.delete("/private/api/registered-client/delete/" + id)
            refreshData();  
            setOpen(null)
            console.log("complete");
        }catch (err){
            console.log("error! :",err);
        }
    }

}

// 등록하기 버튼
export const registerButtonCellRender = ()=> {
    return (
			<Button component={RouterLink} style={{color:"white"}} to="/private/view/admin/management/clientEdit" variant="contained" onClick={() => {registerButtonClicked()}}>
				등록
			</Button>
    );
}

// 등록하기 버튼 클릭시
function registerButtonClicked() {
    localStorage.removeItem("editClientId");
}
