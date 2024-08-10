import { useState } from "react";
import date from "date-and-time";

const DateAndTimeExam = () => {
	const regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);	// yyyy-mm-dd 형식 
	let [baseDate, setBaseDate] = useState<string>("");
	let [targetDate, setTargetDate] = useState<Date>();
	let [resultYear, setResultYear] = useState<string>("");
	let [resultMonth, setResultMonth] = useState<string>("");
	let [resultDay, setResultDay] = useState<string>("");
	let [resultHour, setResultHour] = useState<string>("");
	
	const dateCalc = () => {
		if(regex.test(baseDate)){
			let dateObj = date.parse(baseDate, 'YYYY-MM-DD', true);
			setTargetDate(dateObj);
			setResultYear(date.format(date.addYears(dateObj, 1), 'YYYY-MM-DD'));
			setResultMonth(date.format(date.addMonths(dateObj, 1), 'YYYY-MM-DD'));
			setResultDay(date.format(date.addDays(dateObj, 1), 'YYYY-MM-DD'));
			setResultHour(date.format(date.addHours(dateObj, 4), 'YYYY-MM-DD HH:mm:ss'));
			
			console.log('dateObj', date.format(dateObj, 'YYYY-MM-DD'));
		} else {
			alert('날짜형식 확인(YYYY-MM-DD)');
		}
	}

  return (
    <div className="content">
		<div className="title-item">
			<h2 className="h2-title">날짜 유틸 date-and-time</h2>
			<ul className="location">
				<li>예제</li>
				<li>유틸리티</li>
				<li>날짜 유틸 date-and-time</li>
			</ul>
		</div>
      	<div className="cont-item">
			<div className="title-item">
          	<h3 className="h3-title">
				date-and-time 라이브러리 사용 예제<br/>
				API Link : <a href="https://www.npmjs.com/package/date-and-time" className="link-primary" target="_blank">보기</a>
			</h3>
        </div>
		<div className="form-itme">
			<dl>
				<dt><label htmlFor="dateStandard">기준 날짜</label></dt>
				<dd className="cont-flex">
					<div className="flex2">
          				<input type="date" id="dateStandard" onChange={(e) => {setBaseDate(e.target.value)}} value={baseDate} />
					</div>
					<div>
						<button type="button" onClick={dateCalc} className="btn btn-primary" >날짜계산 결과보기</button>
					</div>
				</dd>
			</dl>
		</div>
		<div className="form-itme mt-5">
			<dl>
				<dt><label htmlFor="dateResult">결과 Date 정보</label></dt>
				<dd>
					<input type="text" id="dateResult" size={50} value={""+(targetDate?targetDate:"")} readOnly disabled />
				</dd>
			</dl>
		</div>
		<div className="form-itme mt8 cont-flex">
			<dl className="flex1">
				<dt><label htmlFor="dateYear">년 + 1</label></dt>
				<dd>
					<input type="text" id="dateYear" value={resultYear} readOnly disabled />
				</dd>
			</dl>
			<dl className="flex1">
				<dt><label htmlFor="dateMonth">월 + 1</label></dt>
				<dd>
					<input type="text" id="dateMonth" value={resultMonth} readOnly disabled />
				</dd>
			</dl>
			<dl className="flex1">
				<dt><label htmlFor="dateDay">일 + 1</label></dt>
				<dd>
					<input type="text" id="dateDay" value={resultDay} readOnly disabled />
				</dd>
			</dl>
		</div>
		<div className="form-itme mt8">
			<dl>
				<dt><label htmlFor="dateResult">시간(기본값 9시) + 4</label></dt>
				<dd>
					<input type="text" value={resultHour} readOnly disabled />
				</dd>
			</dl>
		</div>
				
      </div>
    </div>
  );
};

export default DateAndTimeExam;
