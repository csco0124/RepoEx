import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setTreeType } from '../../store/LeftTreeReducer';
const DemoMgt = () => {
	const leftTreeState = useSelector((state: RootState) => state.leftTree);
  const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setTreeType({treeType:7}));
	}, []);


    return (
        <div className="content">
            <div className="title-item">
                <h2 className="h2-title">DEMO</h2>
                <ul className="location">
                    <li>
                        DEMO
                    </li>
                    
                </ul>
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

export default DemoMgt