/**
 * React 초급 
 * 성명 : 
 */

function App() {
    const [data,setData] = React.useState(Array());

    const onclick = (event=> {
        // TODO : load data
        // api 주소 : http://localhost:8080/getMemberList.do
        // method : get 
        // axios 사용가능합니다.
    }) 

    return (
        <div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
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
                        <button onClick={onclick} type="button" class="btn btn-secondary" id="fetch">조회</button>
                        </th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

ReactDOM.render(<App />, document.querySelector("#reactApp"));