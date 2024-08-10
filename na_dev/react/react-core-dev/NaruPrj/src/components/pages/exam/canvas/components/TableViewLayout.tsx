/**
 * 테이블 레이아웃 출력 
 * @param { className, datas } props 
 * className 
 * datas = {
 * title : "" // 타이틀 th 안에 들어감
 * component : "" // td 안에 들어갈 컴포넌트 
 * }
 * @returns 
 */

interface TableRowData {
    title:string;
    component:JSX.Element;
}

interface TabelViewLayoutProps {
    datas:Array<TableRowData>;
}

const TableViewLayout = (props:TabelViewLayoutProps) => {
    function makeRow(data:TableRowData,id:number) {
        if(data.title==="") {
            return (
                <tr key={id}>
                    <td colSpan={2}>{data.component}</td>
                </tr>
            )
        } else {
            return (
                <tr key={id}>
                    <th>{data.title}</th>
                    <td>{data.component}</td>
                </tr>
            )
        }
    }
    return (
        <table className="table-primary table-striped-columns"> 
            <tbody>
            { 
                props.datas.map(data => {
                    const id = props.datas.indexOf(data);
                    return makeRow(data,id)
                })
            }
            </tbody>
        </table>
    )
} 
export default TableViewLayout;