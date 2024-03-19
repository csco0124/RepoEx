/**
 * React 고급 
 * 성명 : 
 */

function App() {
    const [data,setData] = React.useState(Array());
    const [searchText,setSearchText] = React.useState("");
    const [sortType,setSortType] = React.useState("asc");
    
    const handleSearchText = (event) => {
        setSearchText(event.target.value);
    }

    const onclickLoadData = (event=> {
        // TODO : load data
        // api 주소 : http://localhost:8080/getMemberList.do
        // method : get 
        // axios 사용가능합니다.
        console.log("onClickLoadData");
    }) 

    const search = () => {
        // TODO : 이름으로 검색 구현
        console.log("검색 : " + searchText)
    }

    const toggleSort = () => {
        const newType = sortType === "asc" ? "desc" : "asc";
        setSortType(newType);
        console.log("sort : " + newType);
        // TODO : Sort 구현 
    }

    return (
        <div>
            <div class="input-group mb-3">               
                <label for="searchName" className="form-label">이름</label>
                <input type="text" id="searchName" name="search" class="form-control" value={searchText} onChange={handleSearchText} />
                <button type="button" class="btn btn-secondary" id="search" onClick={search}>검색</button>
            </div>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th className={sortType} onClick={toggleSort}>ID</th>
                        <th>이름</th>
                        <th>나이</th>
                        <th>주소</th>
                        <th>전화번호</th>
                    </tr>
                </thead>
                <tbody id="allMemberList">
                    {
                    /**
                     * TODO:table 안에 데이터 출력하기 
                     */
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan="5">
                        <button onClick={onclickLoadData} type="button" class="btn btn-secondary">조회</button>
                        </th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

ReactDOM.render(<App />, document.querySelector("#reactApp"));