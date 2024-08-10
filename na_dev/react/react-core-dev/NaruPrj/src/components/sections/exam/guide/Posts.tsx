import { useCallback, useEffect, useState } from 'react';
// redux
import { getPosts, getPost, setFilter, onMoveNew } from '../../../../redux/slices/board';
import { useDispatch, useSelector, RootState } from '../../../../redux/store';
// hooks
import useIsMountedRef from '../../../../hooks/useIsMountedRef';

// ----------------------------------------------------------------------

interface IPost {
  userId: string;
  id: number;
  title: string;
  body: string;
}

// ----------------------------------------------------------------------

export default function Posts() {
  const { posts, filter, init, isLoading } = useSelector((state: RootState) => state.board);

  const dispatch = useDispatch();

  const [tableData, setTableData] = useState<IPost[]>([]);

  const [filterUserId, setFilterUserId] = useState<IPost["userId"]>(filter?.userId ?? '');

  const [filterName, setFilterName] = useState(filter?.name ?? '');

  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    if (isMountedRef.current && !init) handleSearch();
  }, [isMountedRef, init]);

  useEffect(() => {
    setTableData(posts);
  }, [posts]);

  const handleSearch = useCallback(() => {
    dispatch(setFilter({
      userId: filterUserId,
      name: filterName,
    }));
    dispatch(getPosts(filterUserId, filterName));
  }, [filterUserId, filterName]);

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
  };

  const handleFilterUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterUserId(event.target.value);
    // setFilterUserId(+value);  // string to number
  };

  const handleViewRow = (id: IPost["id"]) => {
    const post = posts.filter((post: IPost) => post.id === id)[0];
    if(post) dispatch(getPost(post));
  }

  return (
    <div className="cont-item">
      <div className="title-item">
        <h3 className="h3-title">Fake Rest API Data</h3>
      </div>
      <div className="d-flex justify-content-between mb-3">
        <div className='btn-area left'>
          <select className='form-select' onChange={handleFilterUser} value={filterUserId}>
            <option key={0}>
              전체 사용자
            </option>
            {[...Array(9)].map((_, i) => i+1).map((userId, i) => (
              <option key={userId} value={userId}>
                사용자 {userId}
              </option>
            ))}
          </select>
        </div>
        <div className='btn-area right'>
          <input type="text" name="filterName" onChange={(event) => handleFilterName(event.target.value)} value={filterName ?? ''} />
          <button className='btn btn-sm btn-primary' onClick={handleSearch}>검색</button>
        </div>              
      </div>
      <table className="table">
        <caption>fake data</caption>
        <colgroup>
          <col width="10%"/>
          <col width="10%"/>
          <col width="30%"/>
          <col width="50%"/>
        </colgroup>
        <thead>
          <tr>
            <th scope="col">userId</th>
            <th scope="col">id</th>
            <th scope="col">title</th>
            <th scope="col">body</th>
          </tr>  
        </thead>
        <tbody>
          {tableData.map((row, index) => 
            row ? (
              <tr key={index}>
                <td>{row.userId}</td>
                <td>{row.id}</td>
                <td style={{ color: 'blue', cursor: 'pointer'  }} onClick={() => handleViewRow(row.id)}>{row.title}</td>
                <td>{row.body}</td>
              </tr>
            ) : (
              <></>
            ),
          )}
        </tbody>                            
      </table>
    </div>
  );
}