import { useState } from "react";
import uuid from 'react-uuid'
import i18next from "i18next";
import { useTranslation, Trans } from 'react-i18next';

const langOptions = [
	{value:"ko", langName:"한글"},
	{value:"en", langName:"영문"}
]

const I18nExample = () => {
	const { t, i18n } = useTranslation();

	const [textVal, setTextVal] = useState<string>("");
	
	const RenderSelectBox = (props:any) => {
		return (
			<select className="form-select" defaultValue={props.defaultValue} onChange={changeLanguage}>
				{props.langOptions.map((option:any) => (
					<option key={option.value} value={option.value}>{option.langName}</option>
				))}
			</select>
		);
	}

	const changeLanguage = (e:React.ChangeEvent<HTMLSelectElement>) => {
		
		// 언어변경
		i18next.changeLanguage(e.target.value);

	}

  return (
    <div className="content">
      <div className="content">
        <div className="title-item">
          <h2 className="h2-title">다국어 예제</h2>
          <ul className="location">
            <li>예제</li>
            <li>유틸리티</li>
            <li>다국어 예제</li>
          </ul>
        </div>
        <div className="cont-item">
					선택 : 
					<RenderSelectBox langOptions={langOptions} defaultValue={i18n.language} />
					<br/><br/><br/>
					기본적인 메시지 가져오기 : {t('hello')}<br/>
					<br/>
					변수가 있는 메시지 가져오기
					<input type="text" onChange={(e) => {setTextVal(e.target.value)}}/>
					{t('setVal', {value:textVal})}
					<br/><br/>
					UUID : {uuid()}
				</div>
      </div>
    </div>
  );
};

export default I18nExample;
