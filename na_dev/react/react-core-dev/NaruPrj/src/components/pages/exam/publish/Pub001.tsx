// @ts-ignore
const Pub001 = () => {
	  return (
        <div className="content">
            <div className="title-item">
                <h2 className="h2-title">Pub001</h2>
                <ul className="location">
                    <li>
										Pub001
                    </li>
                </ul>
            </div>
            <div className="cont-item">
                <h3 className="h3-title">input</h3>
                
                <div className="form-itme">
                    <dl>
                        <dt>
                        input-radio-col
                        </dt>
                        <dd>
                            <div className="check-list">
                                <div className="form-check">
                                    <input type="radio" name="input-radio" id="input-radio01" className="form-check-input" />
                                    <label htmlFor="input-radio01">input-radio01</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="input-radio" id="input-radio02" className="form-check-input" checked />
                                    <label htmlFor="input-radio02">input-radio02</label>
                                </div>
                            </div>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                        input-radio-row
                        </dt>
                        <dd>
                            <div className="check-list-row">
                                <div className="form-check">
                                    <input type="radio" name="input-radio1" id="input-radio11" className="form-check-input" />
                                    <label htmlFor="input-radio11">input-radio01</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="input-radio1" id="input-radio12" className="form-check-input" />
                                    <label htmlFor="input-radio12">input-radio02</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="input-radio1" id="input-radio13" className="form-check-input" disabled />
                                    <label htmlFor="input-radio13">input-radio02</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="input-radio1" id="input-radio14" className="form-check-input" checked disabled />
                                    <label htmlFor="input-radio14">input-radio02</label>
                                </div>
                            </div>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                        input-checkbox-col
                        </dt>
                        <dd>
                            <div className="check-list">
                                <div className="form-check">
                                    <input type="checkbox" name="input-checkbox" id="input-checkbox01" className="form-check-input" />
                                    <label htmlFor="input-checkbox01">input-checkbox01</label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" name="input-checkbox" id="input-checkbox02" className="form-check-input" checked />
                                    <label htmlFor="input-checkbox02">input-checkbox02</label>
                                </div>
                            </div>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                        input-checkbox-row
                        </dt>
                        <dd>
                            <div className="check-list-row">
                                <div className="form-check">
                                    <input type="checkbox" name="input-checkbox1" id="input-checkbox11" className="form-check-input" />
                                    <label htmlFor="input-checkbox11">input-checkbox01</label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" name="input-checkbox1" id="input-checkbox12" className="form-check-input" />
                                    <label htmlFor="input-checkbox12">input-checkbox02</label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" name="input-checkbox1" id="input-checkbox13" className="form-check-input" disabled />
                                    <label htmlFor="input-checkbox13">input-checkbox02</label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" name="input-checkbox1" id="input-checkbox14" className="form-check-input" checked disabled />
                                    <label htmlFor="input-checkbox14">input-checkbox02</label>
                                </div>
                            </div>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            <label htmlFor="input-text">input-text</label>
                        </dt>
                        <dd>
                            <div className="cont-flex flex1">
                                <div className="form-input">
                                    <input type="text" id="input-text" placeholder="Default"/>
                                    <p className="message">
                                        Password is a required field
                                    </p>
                                </div>
                                <div className="form-input">
                                    <input type="text" id="input-text" placeholder="disabled" disabled />
                                    <p className="message">
                                        Password is a required field
                                    </p>
                                </div>
                            </div>
                            <div className="cont-flex flex1">
                                <div className="form-input info">
                                    <input type="text" id="input-text" placeholder="textInfo"/>
                                    <p className="message">
                                        Password is a required field
                                    </p>
                                </div>
                                <div className="form-input error">
                                    <input type="text" id="input-text" placeholder="Error"/>
                                    <p className="message">
                                        Password is a required field
                                    </p>
                                </div>
                                <div className="form-input success">
                                    <input type="text" id="input-text" placeholder="Success"/>
                                    <p className="message">
                                        Password is a required field
                                    </p>
                                </div>
                            </div>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            <label htmlFor="input-number">input-number</label>
                        </dt>
                        <dd>
                            <div className="cont-flex justify-content-start">
                                <div className="form-input">
                                    <input type="number" id="input-number" />
                                </div>
                                <div className="form-input">
                                    <input type="number" id="input-number" disabled />
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
                                    <input type="date" id="input-date" />
                                </div>
                                <div className="form-input">
                                    <input type="date" id="input-date" disabled />
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
                                    <input type="time" id="input-time" />
                                </div>
                                <div className="form-input">
                                    <input type="time" id="input-time" disabled />
                                </div>
                            </div>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            <label htmlFor="input-tel">input-tel</label>
                        </dt>
                        <dd>
                            <div className="cont-flex justify-content-start">
                                <div className="form-input">
                                    <input type="tel" id="input-tel" />
                                </div>
                                <div className="form-input">
                                    <input type="tel" id="input-tel" disabled />
                                </div>
                            </div>
                        </dd>
                    </dl>
                </div>
                    
                <h3 className="h3-title mt-3">select</h3>
                
                <div className="form-itme">
                    <dl>
                        <dt>
                            select
                        </dt>
                        <dd>
                            <div className="cont-flex flex1">
                                <div className="form-input">
                                    <select className="form-select" name="" id="" title="선택">
                                        <option value="">Default</option>
                                        <option value="">선택2</option>
                                    </select>
                                </div>
                                <div className="form-input">
                                    <select className="form-select" name="" id="" title="선택" disabled>
                                        <option value="">disabled</option>
                                        <option value="">선택2</option>
                                    </select>
                                </div>
                                <div className="form-input info">
                                    <select className="form-select" name="" id="" title="선택">
                                        <option value="">textInfo</option>
                                        <option value="">선택2</option>
                                    </select>
                                    <p className="message">
                                        Password is a required field
                                    </p>
                                </div>
                            </div>
                        </dd>
                    </dl>
                </div>
                <h3 className="h3-title mt-5">search + button</h3>
                <div className="searchItem">
                    <div>
                        <input type="text" className="form-control"/>
                    </div>
                    <div>
                        <button type="button" className="btn-icon">
                            <i className="icon-icon18" data-bs-toggle="tooltip" data-bs-html="true" title="모두열기"></i>
                            <span>모두열기</span>
                        </button>         
                    </div>
                    <div>
                        <button type="button" className="btn-icon">
                            <i className="icon-icon17" data-bs-toggle="tooltip" data-bs-html="true" title="모두닫기"></i>
                            <span>모두닫기</span>
                        </button>
                    </div>
                    <div>
                        <button type="button" className="btn-icon">
                            <i className="icon-icon19" data-bs-toggle="tooltip" data-bs-html="true" title="리셋"></i>
                            <span>리셋</span>
                        </button>
                    </div>
                    <div>
                        <button type="button" className="btn-icon">
                            <i className="icon-icon20" data-bs-toggle="tooltip" data-bs-html="true" title="등록"></i>
                            <span>등록</span>
                        </button>
                    </div>
                    <div>
                        <button type="button" className="btn-icon">
                            <i className="icon-icon21" data-bs-toggle="tooltip" data-bs-html="true" title="수정"></i>
                            <span>수정</span>
                        </button>
                    </div>
                    <div>
                        <button type="button" className="btn-icon">
                            <i className="icon-icon22" data-bs-toggle="tooltip" data-bs-html="true" title="삭제" />
                            <span>삭제</span>
                        </button>
                    </div>
                </div>
                
                <div className="searchItem justify-content-between mt-3">
                    <div className="btn-area">
                        <select name="" id="" className="form-select">
                            <option value="">1</option>
                        </select>
                        <input type="text" className="form-control"/>
                    </div>
                    <div className="btn-area">
                        <div>
                            <button type="button" className="btn-icon">
                                <i className="icon-icon18" data-bs-toggle="tooltip" data-bs-html="true" title="모두열기"></i>
                                <span>모두열기</span>
                            </button>         
                        </div>
                        <div>
                            <button type="button" className="btn-icon">
                                <i className="icon-icon17" data-bs-toggle="tooltip" data-bs-html="true" title="모두닫기"></i>
                                <span>모두닫기</span>
                            </button>
                        </div>
                        <div>
                            <button type="button" className="btn-icon">
                                <i className="icon-icon19" data-bs-toggle="tooltip" data-bs-html="true" title="리셋"></i>
                                <span>리셋</span>
                            </button>
                        </div>
                        <div>
                            <button type="button" className="btn-icon">
                                <i className="icon-icon20" data-bs-toggle="tooltip" data-bs-html="true" title="등록"></i>
                                <span>등록</span>
                            </button>
                        </div>
                        <div>
                            <button type="button" className="btn-icon">
                                <i className="icon-icon21" data-bs-toggle="tooltip" data-bs-html="true" title="수정"></i>
                                <span>수정</span>
                            </button>
                        </div>
                        <div>
                            <button type="button" className="btn-icon">
                                <i className="icon-icon22" data-bs-toggle="tooltip" data-bs-html="true" title="삭제" />
                                <span>삭제</span>
                            </button>
                        </div>
                    </div>
                </div>
                <h3 className="h3-title mt-5">table</h3>
                <table className="table">
                    <caption>테이블</caption>
                    <colgroup>
                        <col width="5%"/>
                        <col width="15%"/>
                        <col width="20%"/>
                        <col width="20%"/>
                        <col width="20%"/>
                        <col width="20%"/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col">
                                <div className="form-check">
                                    <input type="checkbox" name="" id="allCehck" className="form-check-input" />
                                    <label htmlFor="allCehck"><span>전체 선택</span></label>
                                </div>
                            </th>
                            <th scope="col">행2</th>
                            <th scope="col">행3</th>
                            <th scope="col">행4</th>
                            <th scope="col">행5</th>
                            <th scope="col">행6</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">열1</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>
                                <div className="form-check">
                                    <input type="checkbox" name="" id="check01" className="form-check-input" />
                                    <label htmlFor="check01"><span>선택1</span></label>
                                </div>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
    )
}

export default Pub001