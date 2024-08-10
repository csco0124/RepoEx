import { useEffect } from "react";

const Popup = () => {
	useEffect(() => {
    console.log('컴포넌트 화면 출력');

    return () => {
      console.log('다른 컴포넌트로 전환');
    };
  }, []);

  return (
    <>
      <div className="modal modal-lg fade" id="exampleModal2" aria-labelledby="exampleModalLabel2" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel2">카드추가</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body pd0">
              <form>
                <div className="popup-cont cont-flex">
                  <div className="flex1 card-sel popup-scroll">
                    <dl>
                      <dt>사용자</dt>
                      <dd>
                        <div className="check-list">
                          <div className="form-check">
                            <input type="checkbox" name="check_user" id="check_user01" />
                            <label htmlFor="check_user01">시/군/구</label>
                          </div>
                          <div className="form-check">
                            <input type="checkbox" name="check_user" id="check_user02" />
                            <label htmlFor="check_user02">기기모델</label>
                          </div>
                          <div className="form-check">
                            <input type="checkbox" name="check_user" id="check_user03" />
                            <label htmlFor="check_user03">플랫폼</label>
                          </div>
                          <div className="form-check">
                            <input type="checkbox" name="check_user" id="check_user04" />
                            <label htmlFor="check_user04">운영체계</label>
                          </div>
                          <div className="form-check">
                            <input type="checkbox" name="check_user" id="check_user05" />
                            <label htmlFor="check_user05">앱 버전</label>
                          </div>
                          <div className="form-check">
                            <input type="checkbox" name="check_user" id="check_user06" />
                            <label htmlFor="check_user06">관심분야</label>
                          </div>
                        </div>
                      </dd>
                    </dl>
                    <dl>
                      <dt>비지니스 목표</dt>
                      <dd>
                        <div className="check-list">
                          <div className="form-check">
                            <input type="checkbox" name="check_business" id="check_business01" />
                            <label htmlFor="check_business01">시/군/구</label>
                          </div>
                          <div className="form-check">
                            <input type="checkbox" name="check_business" id="check_business02" />
                            <label htmlFor="check_business02">기기모델</label>
                          </div>
                          <div className="form-check">
                            <input type="checkbox" name="check_business" id="check_business03" />
                            <label htmlFor="check_business03">플랫폼</label>
                          </div>
                          <div className="form-check">
                            <input type="checkbox" name="check_business" id="check_business04" />
                            <label htmlFor="check_business04">운영체계</label>
                          </div>
                          <div className="form-check">
                            <input type="checkbox" name="check_business" id="check_business05" />
                            <label htmlFor="check_business05">앱 버전</label>
                          </div>
                          <div className="form-check">
                            <input type="checkbox" name="check_business" id="check_business06" />
                            <label htmlFor="check_business06">관심분야</label>
                          </div>
                        </div>
                      </dd>
                    </dl>
                  </div>
                  <div className="flex3 popup-scroll">
                    <p className="text-info fs-6">선택한 데이터에는 전체를 구성하는 서로 다른 부분을 보여줌으로써 적합합니다.</p>

                    <div className="check-list-row col3">
                      <div className="form-check graph">
                        <input type="checkbox" name="check_graph" id="check_graph01" />
                        <label htmlFor="check_graph01">원형차트</label>
                      </div>
                      <div className="form-check graph">
                        <input type="checkbox" name="check_graph" id="check_graph02" />
                        <label htmlFor="check_graph02">막대차트</label>
                      </div>
                      <div className="form-check graph">
                        <input type="checkbox" name="check_graph" id="check_graph03" />
                        <label htmlFor="check_graph03">게이지차트</label>
                      </div>
                      <div className="form-check graph">
                        <input type="checkbox" name="check_graph" id="check_graph04" />
                        <label htmlFor="check_graph04">라인차트</label>
                      </div>
                      <div className="form-check graph">
                        <input type="checkbox" name="check_graph" id="check_graph05" />
                        <label htmlFor="check_graph05">누적차트</label>
                      </div>
                      <div className="form-check graph">
                        <input type="checkbox" name="check_graph" id="check_graph06" />
                        <label htmlFor="check_graph06">영역차트</label>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-sm btn-outline-secondary" data-bs-dismiss="modal">취소</button>
              <button type="button" className="btn btn-sm btn-primary">확인</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Popup