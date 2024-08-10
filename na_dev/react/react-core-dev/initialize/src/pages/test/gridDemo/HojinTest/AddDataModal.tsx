import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import $api from '../../../../common/CommonAxios';

interface AddDataModalProps {
  show: boolean;
  handleClose: () => void;
  handleAddData: (newData: any) => string;
}

function AddDataModal({ show, handleClose, handleAddData }: AddDataModalProps) {
  const [dataPath, setDataPath] = useState('');
  const [jsonData, setJsonData] = useState('');
  const [dataInfo, setDataInfo] = useState('');
  const [statusCode, setStatusCode] = useState('');
  const [delayTime, setDelayTime] = useState('');
  const [methodType, setMethodType] = useState('');

  const handleDataPathChange = (event: any) => setDataPath(event.target.value);
  const handleJsonDataChange = (event: any) => setJsonData(event.target.value);
  const handleDataInfoChange = (event: any) => setDataInfo(event.target.value);
  const handleStatusCodeChange = (event: any) =>
    setStatusCode(event.target.value);
  const handleDelayTimeChange = (event: any) =>
    setDelayTime(event.target.value);
  const handleMethodTypeChange = (event: any) =>
    setMethodType(event.target.value);

  const handleAddButtonClick = async (event: any) => {
    // 새로운 데이터를 객체 형태로 생성
    const newData = {
      dataPath: dataPath,
      jsonData: jsonData,
      dataInfo: dataInfo,
      statusCode: statusCode,
      delayTime: delayTime,
      methodType: methodType,
    };
    await $api.post('/api/dummy/setData', newData);
    // 입력된 데이터를 부모 컴포넌트로 전달
    handleAddData(newData);

    // 입력 필드 초기화
    setDataPath('');
    setJsonData('');
    setDataInfo('');
    setStatusCode('');
    setDelayTime('');
    setMethodType('');
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>데이터 추가</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="dataPath">
            <Form.Label>데이터 경로</Form.Label>
            <Form.Control
              type="text"
              value={dataPath}
              onChange={handleDataPathChange}
            />
          </Form.Group>
          <Form.Group controlId="jsonData">
            <Form.Label>JSON 데이터</Form.Label>
            <Form.Control
              type="text"
              value={jsonData}
              onChange={handleJsonDataChange}
            />
          </Form.Group>
          <Form.Group controlId="dataInfo">
            <Form.Label>데이터 정보</Form.Label>
            <Form.Control
              type="text"
              value={dataInfo}
              onChange={handleDataInfoChange}
            />
          </Form.Group>
          <Form.Group controlId="statusCode">
            <Form.Label>상태 코드</Form.Label>
            <Form.Control
              type="text"
              value={statusCode}
              onChange={handleStatusCodeChange}
            />
          </Form.Group>
          <Form.Group controlId="delayTime">
            <Form.Label>지연시간</Form.Label>
            <Form.Control
              type="text"
              value={delayTime}
              onChange={handleDelayTimeChange}
            />
          </Form.Group>
          <Form.Group controlId="methodType">
            <Form.Label>메소드Type</Form.Label>
            <Form.Control
              as="select"
              value={methodType}
              onChange={handleMethodTypeChange}
            >
              <option value="" disabled>
                --
              </option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          취소
        </Button>
        <Button variant="primary" onClick={handleAddButtonClick}>
          추가
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddDataModal;
