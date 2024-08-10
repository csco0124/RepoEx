import {ICellRendererParams} from "ag-grid-community";

export const updateBtnRenderer = ({data, context}: ICellRendererParams) => {
  return (<button className="btn btn-s btn-outline-secondary" onClick={() => {context?.updateDummyModalOpen(data)}}>수정</button>);
}

export const deleteBtnRenderer = ({data, context}: ICellRendererParams) => {
  return (<button className="btn btn-s btn-outline-secondary" onClick={() => {context?.deleteDummyFn(data)}}>삭제</button>);
}

export const apiExecuteBtnRenderer = ({data, context}: ICellRendererParams) => {
  return (<button className="btn btn-s btn-primary" onClick={() => {context?.apiExecuteModalOpen(data)}}>Test</button>);
}