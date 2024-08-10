
const ChartModal = (props:any) => {
	
	const modalAction = () => {
		alert('JS 코드로 닫기');
		props.modelObj.hide();
	}

	return (
		<>
		<div className="modal modal-lg fade" id="chartModal1" aria-labelledby="chartModal1" aria-hidden="true" >
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="chartModalLabel1">Props 텍스트 : {props.data}</h1>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body pd0">
						<form>
							<div className="popup-cont cont-flex">
								<div className="flex3 popup-scroll">
									<p className="text-info fs-6"></p>

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
						<button type="button" className="btn btn-sm btn-outline-secondary" onClick={modalAction}>취소</button>
						<button type="button" className="btn btn-sm btn-primary" onClick={modalAction}>확인</button>
					</div>
				</div>
			</div>
		</div>
	</>
	)
}

export default ChartModal