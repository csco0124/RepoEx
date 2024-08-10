import { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal } from 'react-bootstrap';
import $api from '../../../../../common/CommonAxios';

const OperationModal = forwardRef(
  ({ updateRowData, getData }: any, ref: any) => {
    /**
     * state 정의
     */
    const [dataPathValue, setDataPathValue] = useState(''); // 'dataPath' input 태그 입력값
    const [jsonDataValue, setJsonDataValue] = useState(''); // 'jsonData' input 태그 선택값
    const [dataInfoValue, setDataInfoValue] = useState(''); // 'dataInfo' input 태그 선택값
    const [statusCodeValue, setStatusCodeValue] = useState(''); // 'dataInfo' input 태그 선택값
    const [delayTimeValue, setDelayTimeValue] = useState(''); // 'delayTime' input 태그 선택값
    const [methodTypeValue, setMethodTypeValue] = useState(''); // 'methodType' select 태그 선택값
    const [showModal, setShowModal] = useState(false); // 모달창 show , hide 여부
    const [btnPath, setBtnPath]: any = useState(''); // 추가 or 수정 버튼에 대한 판별 값

    /**
     * '추가' 버튼으로 모달 open
     */
    const openInsertModal = (event: any) => {
      setBtnPath(event.target.id);
      setShowModal(true);
    };

    /**
     * '수정' 버튼으로 모달 open
     * 부모컴포넌트에서 조작 하게끔 'useImperativeHandle' 훅 사용
     * 'setBtnPath' : 어떤 경로의 버튼으로 모달창을 open 하는지 판별 값
     */
    useImperativeHandle(ref, () => ({
      openUpdateModal(event: any) {
        // props로 전달 받은 데이터 셋팅
        setDataPathValue(updateRowData.DATA_PATH);
        setJsonDataValue(updateRowData.JSON_DATA);
        setDataInfoValue(updateRowData.DATA_INFO);
        setStatusCodeValue(updateRowData.STATUS_CODE);
        setDelayTimeValue(updateRowData.DELAY_TIME);
        setMethodTypeValue(updateRowData.METHOD_TYPE);
        setBtnPath(event.target.id);
        setShowModal(true);
      },
    }));

    /**
     * 모달 close 및 데이터 초기화
     */
    const closeModal = () => {
      setDataPathValue('');
      setJsonDataValue('');
      setDataInfoValue('');
      setStatusCodeValue('');
      setDelayTimeValue('');
      setMethodTypeValue('');
      setBtnPath('');
      setShowModal(false);
    };

    /**
     * 태그 값에 데이터 설정
     * 줄바뀜 방지 prettier-ignore 기재
     */
    const dataValueSet = (event: any) => setDataPathValue(event.target.value);
    const jsonDataValSet = (event: any) => setJsonDataValue(event.target.value);
    const dataInfoValSet = (event: any) => setDataInfoValue(event.target.value);
    const statusCodeValSet = (event: any) => setStatusCodeValue(event.target.value); // prettier-ignore
    const delayTimeValSet = (event: any) => setDelayTimeValue(event.target.value); // prettier-ignore
    const methodTypeValSet = (event: any) => setMethodTypeValue(event.target.value); // prettier-ignore

    /**
     * 저장 버튼 누를 시
     */
    const submitBtn = async () => {
      let data: any = {
        dataPath: dataPathValue,
        jsonData: jsonDataValue,
        dataInfo: dataInfoValue,
        statusCode: statusCodeValue,
        delayTime: delayTimeValue,
        methodType: methodTypeValue,
      };
      if (btnPath == 'addBtn') {
        // '추가' 버튼으로 모달 open
        await $api.post('/api/mby/grid/data', data);
      } else if (btnPath == 'updateBtn') {
        // '수정' 버튼으로 모달 open
        data.uid = updateRowData.uid; // 업데이트 할 행의 uid 추가
        await $api.post('/api/mby/grid/row-new-data', data);
      }
      closeModal(); // 모달 close
      getData(); // 'ReactTableGrid' 컴포넌트의 'getData' 함수 실행
    };

    /**
     * 데이터 입력 여부에 따른 '추가' 버튼 disable 처리
     */
    const dataValidation: any = () => {
      return (
        dataPathValue.trim() !== '' &&
        jsonDataValue.trim() !== '' &&
        dataInfoValue.trim() !== '' &&
        statusCodeValue.trim() !== '' &&
        delayTimeValue.trim() !== '' &&
        methodTypeValue.trim() !== ''
      );
    };

    return (
      <div>
        <button
          type="button"
          className="btn-icon"
          id="addBtn"
          onClick={openInsertModal}
        >
          {/* 버튼 중간 및 가장자리에 따른 포인터 인식이 다른 상황에서 동일한 id를 가져오기 위해서 id 같게 설정  */}
          <i
            id="addBtn"
            className="icon-icon20"
            data-bs-toggle="tooltip"
            data-bs-html="true"
            title="등록하기"
          />
        </button>
        <Modal show={showModal} backdrop="static">
          <Modal.Body>
            <h5>DATA_PATH</h5>
            <br />
            <input
              className="form-control"
              type="text"
              value={dataPathValue}
              onChange={dataValueSet}
            />
            <br />
            <h5>DATA_INFO</h5>
            <br />
            <input
              className="form-control"
              type="text"
              value={dataInfoValue}
              onChange={dataInfoValSet}
            />
            <br />
            <h5>STATUS_CODE</h5>
            <br />
            <input
              className="form-control"
              type="text"
              value={statusCodeValue}
              onChange={statusCodeValSet}
            />
            <br />
            <h5>DELAY_TIME</h5>
            <br />
            <input
              className="form-control"
              type="text"
              value={delayTimeValue}
              onChange={delayTimeValSet}
            />
            <br />
            <h5>METHOD_TYPE</h5>
            <br />
            <select
              className="form-select"
              value={methodTypeValue}
              onChange={methodTypeValSet}
            >
              <option value="" disabled>
                --
              </option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
            </select>
            <br />
            <h5>JSON_DATA</h5>
            <br />
            <input
              className="form-control"
              type="text"
              value={jsonDataValue}
              onChange={jsonDataValSet}
              style={{ overflowY: 'auto', height: 100 }}
            />
            <br />
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={submitBtn}
              disabled={!dataValidation()}
            >
              <i className="bi bi-check-lg" />
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={closeModal}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
);

export default OperationModal;
