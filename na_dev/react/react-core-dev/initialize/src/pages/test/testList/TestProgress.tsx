function TestProgress() {

  return (
    <div className="container">
			<div className="progress">
				<div className="progress-bar" style={{width:"25%"}}></div>
			</div>
			<br />
			<div className="progress" style={{height:"5px"}}>
				<div className="progress-bar" style={{width:"25%"}}></div>
			</div>
			<br />
			<div className="progress">
				<div className="progress-bar bg-info" style={{width:"25%"}}>25%</div>
			</div>
			<br />
			<div className="progress">
				<div className="progress-bar bg-success progress-bar-striped" style={{width:"55%"}}></div>
			</div>
			<br />
			<div className="progress">
				<div className="progress-bar progress-bar-striped progress-bar-animated" style={{width:"75%"}}></div>
			</div>
		</div>
  );
}

export default TestProgress;