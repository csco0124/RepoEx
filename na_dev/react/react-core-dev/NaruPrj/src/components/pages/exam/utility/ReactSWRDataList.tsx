const ReactSWRDataList = ({data}:any) => {
  return (
    <>
      {data && data.map((dataObj:any) => <p className='text-success text-truncate'>{dataObj.NUMBER} | {dataObj.UID}</p> )}
		</>
  );
};

export default ReactSWRDataList;
