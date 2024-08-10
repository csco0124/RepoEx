import { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import $api from '../../../../../common/CommonAxios';
import alertContext from '../../../../../store/alert-context';

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
  const methodTypes = [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'PATCH',
    'HEAD',
    'OPTIONS',
    'TRACE',
    'CONNECT',
  ];

  const handleDataPathChange = (event: any) => setDataPath(event.target.value);
  const handleJsonDataChange = (event: any) => setJsonData(event.target.value);
  const handleDataInfoChange = (event: any) => setDataInfo(event.target.value);
  const handleStatusCodeChange = (event: any) =>
    setStatusCode(event.target.value);
  const handleDelayTimeChange = (event: any) =>
    setDelayTime(event.target.value);
  const handleMethodTypeChange = (event: any) =>
    setMethodType(event.target.value);

  const commAlert = useContext(alertContext);

  const handleAddButtonClick = async (event: any) => {
    event.preventDefault();

    const numberPattern: RegExp = /^([0-9]{1,3})$/;
    const dataPathPattern: RegExp =
      /^([a-zA-Z0-9]{1})([a-zA-Z0-9\-_]*?([a-zA-Z0-9]{1}))?$/;

    let reqDataPath: string = dataPath;
    let pathCheck: boolean =
      reqDataPath.charAt(0) === '/' && reqDataPath.length > 1 && !!reqDataPath;
    const splitPath = reqDataPath.split('/');

    if (!pathCheck) {
      commAlert.call('경로를 정확히 적어주세요');
      return pathCheck;
    }

    for (let i = 1; i < splitPath.length; i++) {
      if (pathCheck && !dataPathPattern.test(splitPath[i])) {
        commAlert.call('경로를 정확히 적어주세요');
        return false;
      }
    }
    if (!!!jsonData || jsonData !== jsonData.trim()) {
      commAlert.call('데이터를 적어주세요');
      return false;
    }

    if (!!!dataInfo || dataInfo !== dataInfo.trim()) {
      commAlert.call('데이터 정보를 적어주세요');
      return false;
    }

    if (!numberPattern.test(statusCode)) {
      commAlert.call('상태 코드를 적어주세요');
      return false;
    }

    if (!numberPattern.test(delayTime)) {
      commAlert.call('지연 시간을 적어주세요');
      return false;
    }

    // 새로운 데이터를 객체 형태로 생성
    const newData = {
      dataPath,
      jsonData,
      dataInfo,
      statusCode,
      delayTime,
      methodType,
    };

    await $api.post('/api/dummy/setData', newData);
    handleAddData(newData);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    // 입력 필드 초기화
    setDataPath('');
    setJsonData('');
    setDataInfo('');
    setStatusCode('');
    setDelayTime('');
    setMethodType('');

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} style={{ zIndex: 1050 }}>
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
              placeholder="경로를 입력해 주세요."
              onChange={handleDataPathChange}
            />
          </Form.Group>
          <Form.Group controlId="jsonData">
            <Form.Label>JSON 데이터</Form.Label>
            <Form.Control
              type="text"
              value={jsonData}
              placeholder="JSON 데이터를 입력해 주세요."
              onChange={handleJsonDataChange}
            />
          </Form.Group>
          <Form.Group controlId="dataInfo">
            <Form.Label>데이터 정보</Form.Label>
            <Form.Control
              type="text"
              value={dataInfo}
              placeholder="데이터 정보를 입력해 주세요."
              onChange={handleDataInfoChange}
            />
          </Form.Group>
          <Form.Group controlId="statusCode">
            <Form.Label>상태 코드</Form.Label>
            <Form.Control
              type="text"
              value={statusCode}
              placeholder="상태코드를 입력해 주세요."
              onChange={handleStatusCodeChange}
            />
          </Form.Group>
          <Form.Group controlId="delayTime">
            <Form.Label>지연시간</Form.Label>
            <Form.Control
              type="text"
              value={delayTime}
              placeholder="지연시간을 입력해 주세요."
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
              {methodTypes.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn btn-sm"
          variant="outline-secondary"
          onClick={handleCloseModal}
        >
          취소
        </Button>
        <Button
          className="btn btn-sm"
          variant="primary"
          onClick={handleAddButtonClick}
        >
          추가
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddDataModal;
