import {useState} from "react";
import {isDate, isEmail, isNotEmpty} from "../../../common/commonUtil";

const FormValidExam = () => {
  const [inputs, setInputs] = useState({
    radios: '' as string,
    checkboxes: [] as string[],
    inputText: '' as string,
    inputDate: '' as string,
    inputTime: '' as string,
    select: '' as string,
  });

  const [inputTextStatus, setInputTextStatus] = useState('');
  const [selectBoxStatus, setSelectBoxStatus] = useState('');

  const [dateStatus, setDateStatus] = useState('');
  const [timeStatus, setTimeStatus] = useState('');

  const radioHandle = (e: any) => {
    setInputs({
      ...inputs,
      radios: e.target.value
    });
  }

  const checkBoxHandle = (e: any) => {
    const { checked, value } = e.target;
    if (checked) {
      setInputs({
        ...inputs,
        checkboxes: [...inputs.checkboxes, value]
      });
    } else {
      setInputs({
        ...inputs,
        checkboxes: inputs.checkboxes.filter(item => item !== value)
      });
    }
  }

  const inputTextHandle = (e: any) => {
    setInputs({
      ...inputs,
      inputText: e.target.value
    });
  }

  const dateHandle = (e: any) => {
    setInputs({
      ...inputs,
      inputDate: e.target.value
    });
  }

  const timeHandle = (e: any) => {
    setInputs({
      ...inputs,
      inputTime: e.target.value
    });
  }

  const selectBoxHandle = (e: any) => {
    setInputs({
      ...inputs,
      select: e.target.value
    });
  }
  const onSubmitHandle = (e: any) => {
    e.preventDefault();
    console.log(e);
  }
  const validate = {
    inputTextValid: (text: string) => isEmail(text),
    selectBoxValid: (value: string) => ![0, 1, 2].includes(Number(value)),
    checkBoxValid: (boxes: []) => isNotEmpty(boxes) && boxes.every(v => v !== 3 && v !==  4),
    dateValid: (date: string) => isDate(date),
    allValid: () => {

    }
  }
  return (
    <div>
      <div className="content">
        <div className="title-item">
          <h2 className="h2-title">FormValidation Exam</h2>
        </div>
        <form onSubmit={onSubmitHandle}>
          <div className="cont-item">
            <div className="form-itme">
              <dl>
                <dt>
                  radio Row : <b>3,4 는 입력 받지 않음.</b>
                </dt>
                <dd>
                  <div className="check-list-row">
                    {
                      [1,2,3,4].map(item => (
                      <div className="form-check" key={item}>
                        <input type="radio"
                               name="input-radio1"
                               id={`input-radio${item}`}
                               value={String(item)}
                               className="form-check-input"
                               onChange={radioHandle}
                        />
                        <label htmlFor={`input-radio${item}`}>input-radio0{item}</label>
                      </div>
                      ))
                    }
                  </div>
                </dd>
              </dl>
              <dl>
                <dt>
                  input-checkbox-row
                </dt>
                <dd>
                  <div className="check-list-row">
                    {
                      [1,2,3,4].map(item => (
                      <div className="form-check" key={item}>
                        <input type="checkbox"
                               name="input-checkbox1"
                               id={`input-checkbox${item}`}
                               value={String(item)}
                               className="form-check-input"
                               onChange={checkBoxHandle}
                        />
                        <label htmlFor={`input-checkbox${item}`}>input-checkbox0{item}</label>
                      </div>
                      ))
                    }
                  </div>
                </dd>
              </dl>
              <dl>
                <dt>
                  <label htmlFor="input-text">input-text</label>
                </dt>
                <dd>
                  <div className="cont-flex flex1">
                    <div className={`form-input ${inputTextStatus}`}>
                      <input type="text" id="input-text" placeholder="이메일 형식에 맞게 입력"/>
                      <p className="message">
                        이메일 형식에 맞지 않는 값입니다.
                      </p>
                    </div>
                  </div>
                </dd>
              </dl>
              <dl>
                <dt>
                  <label htmlFor="input-date">input-date</label>
                </dt>
                <dd>
                  <div className="cont-flex justify-content-start">
                    <div className="form-input">
                      <input type="date" id="input-date" value={inputs.inputDate} onChange={dateHandle}/>
                    </div>
                  </div>
                </dd>
              </dl>
              <dl>
                <dt>
                  <label htmlFor="input-time">input-time</label>
                </dt>
                <dd>
                  <div className="cont-flex justify-content-start">
                    <div className="form-input">
                      <input type="time" id="input-time" value={inputs.inputTime} onChange={timeHandle}/>
                    </div>
                  </div>
                </dd>
              </dl>
            </div>
            <div className="form-itme">
              <dl>
                <dt>
                  select
                </dt>
                <dd>
                  <div className="cont-flex flex1">
                    <div className={`form-input ${selectBoxStatus}`}>
                      <select className="form-select" title="선택" onChange={selectBoxHandle}>
                        {
                          [0, 1, 2, 3, 4, 5].map(item => <option value={item} key={item}>선택{item}</option>)
                        }
                      </select>
                      <p className="message">
                        0, 1, 2 는 입력 받지 않습니다.(예제)
                      </p>
                    </div>
                  </div>
                </dd>
              </dl>
              <button type="button" className="btn btn-primary" onClick={onSubmitHandle}>submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormValidExam;