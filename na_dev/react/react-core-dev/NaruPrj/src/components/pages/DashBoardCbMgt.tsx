import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setTreeType } from '../../store/LeftTreeReducer';
const Page02 = () => {
	const leftTreeState = useSelector((state: RootState) => state.leftTree);
  const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setTreeType({treeType:6}));
	}, []);


    return (
        <div className="content">
            <div className="title-item">
                <h2 className="h2-title">대시보드 캔버스 관리</h2>
                <ul className="location">
                    <li>
                        운영 관리
                    </li>
                    <li>
                        대시보드 구성
                    </li>
                    <li>
                        대시보드 캔버스 관리
                    </li>
                </ul>
            </div>
            <div className="btn-area right">
                <button type="button" className="btn-sm primary">
                    <span>등록하기</span>
                </button>
            </div>
            <div className="cont-flex">
                <div className="cont-item flex2">
                     
                </div>
                <div className="cont-item flex1">
                    
                </div>
            </div>
            <div className="cont-flex">
                <div className="cont-item flex2">
                    
                </div>
                <div className="cont-item flex1">
                    
                </div>
                <div className="cont-item flex1">
                    
                </div>
            </div>
        </div>
        
    )
}

export default Page02