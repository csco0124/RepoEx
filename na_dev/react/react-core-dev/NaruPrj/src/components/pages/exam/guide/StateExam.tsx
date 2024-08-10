import { useEffect } from 'react';
// redux
import { reset } from '../../../../redux/slices/board';
import { RootState, useDispatch, useSelector } from '../../../../redux/store';
// sections
import { PostNewEditForm, Posts } from '../../../sections/exam/guide';


export default function StateExam() {
  const { page } = useSelector((state: RootState) => state.board);

  const { path } = page;

  const dispatch = useDispatch();

  useEffect(
    () => () => {
      dispatch(reset());
      // console.log('board clean up!!');
    },
    [dispatch],
  );

  return (
    <div className="content">
      <div className="title-item">
        <h2 className="h2-title">상태관리</h2>
        <ul className="location">
          <li>
            예제
          </li>
          <li>
            디자인패턴
          </li>
          <li>
            상태관리
          </li>
        </ul>
      </div>
      {path === 'list' && <Posts />}
      {path === 'new' && <PostNewEditForm />}
      {path === 'edit' && <PostNewEditForm isEdit />}
    </div>
  );
}