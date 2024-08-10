import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTreeType } from '../../store/LeftTreeReducer';
import { RootState } from '../../store';
const AdminInfoMgt = () => {
	const leftTreeState = useSelector((state: RootState) => state.leftTree);
  const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setTreeType({treeType:5}));
	}, []);

    return (
        <div className="content">
            <div className="title-item">
                <h2 className="h2-title">인터페이스 관리</h2>
                <ul className="location">
                    <li>
                        시스템 관리
                    </li>
                    <li>
                        인터페이스 관리
                    </li>
                    <li>
                        인터페이스 정보관리
                    </li>
                </ul>
            </div>
            <div className="cont-item">
                <div className="title-item">
                    <h3 className="h3-title">인터페이스 정보관리</h3>
                </div>
            </div>
        </div>
    )
}

export default AdminInfoMgt