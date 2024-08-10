import React, {useState, useRef, useContext} from "react";
import {DummyData, METHOD_TYPES} from "../grid/lhj/agGridTypes";
import {insertDummyData, updateDummyData} from "../grid/lhj/agGridService";
import {HttpStatusCode} from "axios";
import {getBytes, isHttpStatus, isNumber, isPathName} from "../../../../common/commonUtil";
import toastContext from "../../../../store/toast-context";
import InputText from "../../../common/InputText";

interface AgGridModalProps {
  data: DummyData;
  initDummyData: () => void;
  onClose: () => void;
  flag: string; //추가 or 수정
}

const AgGridModal = ({onClose, initDummyData, flag, data}: AgGridModalProps) => {
  const commToast = useContext(toastContext);

  const IS_UPDATE = flag === 'update';
  const flagLabel = IS_UPDATE ? '수정' : '추가';

  const { dataPath = '', jsonData = '', dataInfo = '', statusCode = '', delayTime = '0', methodType = METHOD_TYPES[0].value, uid = ''} = data || {};
  //수정의 경우 경로와 호출 방식은 수정할 수 없다.
  const [inputs, setInputs] = useState<DummyData>({dataPath, jsonData, dataInfo, statusCode, delayTime, methodType, uid});

  const [isDataPathError, setIsDataPathError] = useState<boolean>(false);
  const [isStatusCodeError, setIsStatusCodeError] = useState<boolean>(false);
  const [isDelayTimeError, setIsDelayTimeError] = useState<boolean>(false);

  const dataPathRef = useRef<HTMLInputElement>(null);
  const statusCodeRef = useRef<HTMLInputElement>(null);
  const delayTimeRef = useRef<HTMLInputElement>(null);

  const dataPathHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputsHandle(e.target.name, e.target.value.trim());
    setIsDataPathError(!validate.dataPathValid(e.target.value));
  }

  const dataInfoHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputsHandle(e.target.name, e.target.value);
  }

  const statusCodeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputsHandle(e.target.name, e.target.value);
    setIsStatusCodeError(!validate.statusCodeValid(e.target.value));
  }

  const delayTimeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = isNumber(e.target.value) ? String(Number(e.target.value)) : e.target.value;
    setInputsHandle(e.target.name, inputValue);
    setIsDelayTimeError(!validate.delayTimeValid(inputValue));
  }

  const methodTypeHandle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputsHandle(e.target.name, e.target.value);
  }

  const jsonDataHandle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputsHandle(e.target.name, e.target.value);
  }

  const onSubmitHandle = async (e: any) => {
    e.preventDefault();
    if (!!!validate.allValid()) return;

    const res = IS_UPDATE ? await updateDummyData(inputs) : await insertDummyData(inputs);
    if (res.status === HttpStatusCode.Ok) {
      initDummyData();
      commToast.call(`${flagLabel} 되었습니다.`)
      onClose();
    }
  }

  const setInputsHandle = (name: string, value: string) => {
    setInputs({ ...inputs, [name]: value });
  }

  const validate = {
    dataPathValid: (path: string) => isPathName(path) && getBytes(path) <= 100, //100자가 넘으면 안됨.
    statusCodeValid: (code: string) => isHttpStatus(code),
    delayTimeValid: (time: string) => isNumber(time) && Number(time) < 1000, //999까지만 됨.

    allValid: () => {
      if (!validate.dataPathValid(inputs.dataPath)) {
        setIsDataPathError(true);
        dataPathRef.current?.focus();
        return false;
      }

      if (!validate.statusCodeValid(inputs.statusCode)) {
        setIsStatusCodeError(true);
        statusCodeRef.current?.focus();
        return false;
      }

      if (!validate.delayTimeValid(inputs.delayTime)) {
        setIsDelayTimeError(true);
        delayTimeRef.current?.focus();
        return false;
      }

      return true;
    }
  };

  const methodTypeOptionTSX = () => {
    return (
      <>
        {
          METHOD_TYPES.map((item: {value: string, label: string}, index: number) =>
          <option key={index} value={item.value}>
            {item.label}
          </option>)
        };
      </>
    )
  }

  return (
    <form onSubmit={onSubmitHandle}>
      <div className="modal-body">
        <h5>경로</h5><br/>{/* style={'max-height': calc(100vh - 350px); overflow-y: auto;"}*/}
        <InputText name={'dataPath'}
                   placeholder="ex) /narui/insurance/health 최대 100자"
                   message={'ex) /narui/insurance/health 최대 100자까지 입력 가능합니다.'}
                   disabled={IS_UPDATE}
                   value={inputs.dataPath}
                   ref={dataPathRef}
                   onChange={dataPathHandle}
                   isError={isDataPathError}
                   isSuccess={validate.dataPathValid(inputs.dataPath)}
        />
        <br/>
        <h5>설명</h5>
        <br/>
        <InputText name={'dataInfo'} value={inputs.dataInfo} onChange={dataInfoHandle}/>
        <br/>
        <h5>상태 코드</h5>
        <br/>
        <InputText name={'statusCode'}
                   placeholder="ex) 200"
                   value={inputs.statusCode}
                   ref={statusCodeRef}
                   onChange={statusCodeHandle}
                   isError={isStatusCodeError}
                   isSuccess={isHttpStatus(inputs.statusCode)}
                   message={'HttpStatus 에 없는 코드 입니다. ex) 200'}
        />
        <br/>
        <br/>
        <h5>호출 방식</h5>
        <br/>
        <select className="form-select"
                name={'methodType'}
                value={inputs.methodType}
                onChange={methodTypeHandle}
                defaultValue={METHOD_TYPES[0].value}
                disabled={IS_UPDATE}
        >
          {methodTypeOptionTSX()};
        </select>
        <br/>
        <h5>지연시간</h5>
        <br/>
        <InputText name={'delayTime'}
                   value={inputs.delayTime}
                   ref={delayTimeRef}
                   message={'최소 0 부터 최대 999 까지 됩니다.'}
                   onChange={delayTimeHandle}
                   isError={isDelayTimeError}
                   isSuccess={validate.delayTimeValid(inputs.delayTime)}
        />
        <br/>
        <br/>
        <h5>데이터</h5>
        <br/>
          <textarea className="form-control"
                    name={'jsonData'}
                    value={inputs.jsonData}
                    onChange={jsonDataHandle}
          />

          <br/>
        </div>
      <div className="modal-footer">
        <div className="btn-area right">
          <button className="btn btn-sm btn-primary" onClick={onSubmitHandle}>{flagLabel}</button>
          <button className="btn btn-sm btn-outline-secondary" onClick={onClose}>취소</button>
        </div>
      </div>
    </form>
  );
}

export default AgGridModal;