import {useContext} from "react";
import {DummyData, METHOD_TYPES} from "../grid/lhj/agGridTypes";
import alertContext from "../../../../store/alert-context";
import toastContext from "../../../../store/toast-context";
import $api from "../../../../common/CommonAxios";

interface ApiExecuteModalProps {
  onClose: () => void;
  data: DummyData;
}

const ApiExecuteModal = ({onClose, data} : ApiExecuteModalProps) => {
  const {uid, dataPath, jsonData, statusCode, methodType} = data || {};

  const dataFullPath = `${import.meta.env.VITE_APP_BACKEND_CALL_URL}/dummy${dataPath}`;

  const commAlert = useContext(alertContext);
  const commToast = useContext(toastContext);

  const apiExecute = async () => {
    if (METHOD_TYPES.every(v => v.value !== methodType)) {
      commAlert.call('호출 방식이 올바르지 않습니다.');
      return;
    }

    $api({ method: methodType, url: dataFullPath })
      .then(result => {
        commAlert.call(resultMsg(result));
      })
      .catch(error => {
        commAlert.call(resultMsg(error));
      });
  }

  const resultMsg = (result: any) => {
    return Object.keys(result).map(v => `${v} : ${typeof result[v] === 'object' ? JSON.stringify(result[v]).replace(/,/g, '\n') : result[v]}`).join('\n');
  }

  const copyPath = async () => {
    await navigator.clipboard.writeText(dataFullPath);
    commToast.call('경로가 복사되었습니다.');
  }

  return (
    <div className={'modal-body'}>
      <h5>경로</h5>
      <br />
      <div className='btn-area'>
        <button type='button' className='btn btn-sm btn-primary' onClick={copyPath}>COPY</button>
        <input
          className="form-control"
          type="text"
          disabled
          readOnly
          value={dataFullPath}
        />
      </div>

      <br />
      <h5>호출 방식</h5>
      <br />
      <input
        className="form-control"
        type="text"
        disabled
        readOnly
        value={methodType}
      />

      <br />
      <h5>상태 코드</h5>
      <br />
      <input
        className="form-control"
        type="text"
        disabled
        readOnly
        value={statusCode}
      />

      <br />
      <h5>데이터</h5>
      <br />
      <textarea
        className="form-control"
        disabled
        readOnly
        value={jsonData}
      />
      <br />
      <div className={'modal-footer'}>
        <div className="btn-area right">
          <button className="btn btn-sm btn-primary" onClick={apiExecute}>실행</button>
          <button className="btn btn-sm btn-outline-secondary" onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
}

export default ApiExecuteModal;