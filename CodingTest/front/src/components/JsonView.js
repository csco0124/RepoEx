import { Tab, Table, Tabs } from "react-bootstrap";
import JsonFormatter from "react-json-formatter";

function JsonView(props) {
    const jsonStyle = {
        propertyStyle: { color: 'teal' },
        stringStyle: { color: 'gray' },
        numberStyle: { color: 'darkorange' }
    }

    return (
        <>
        <Tabs
        defaultActiveKey={"table"}
        id="jsonview"
        className="mb-3"
        >
            <Tab eventKey="table" title="table">
                {props.table}
            </Tab>
            <Tab eventKey="json" title="json">
                <JsonFormatter json={props.json} tabWith={4} jsonStyle={jsonStyle} />
            </Tab>
        </Tabs>
        </>

        
    )
}

export default JsonView;

