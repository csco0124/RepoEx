import React, { useState, useEffect, useContext} from 'react';
import { TreeItem } from 'react-complex-tree';
import alertContext from "../../../../store/alert-context";
import ConfirmContext from "../../../../store/confirm-context";
import toastContext from "../../../../store/toast-context";
import {isEmpty} from "../../../../common/commonUtil";

interface Props {
  treeItem: TreeItem;
  onDescChangeFn: (itemId: any, newDesc: string, index: number) => void;
  onDescAddFn: (itemId: any, newDesc: string) => void;
  onDescRemoveFn: (itemId: any, index: number) => void;
  onClose: () => void;
  onSubmit: () => void;
}

const DescModal: React.FC<Props> = ({
    treeItem,
    onDescChangeFn,
    onDescRemoveFn,
    onDescAddFn,
    onClose
  }: Props) => {
  const [descAdd, setDescAdd] = useState<string>('');
  const [descs, setDescs] = useState<string[]>([]);
  const [modifiedIndexes, setModifiedIndexes] = useState<number[]>([]);

  const commConfirm = useContext(ConfirmContext);
  const commAlert = useContext(alertContext);
  const commToast = useContext(toastContext);

  useEffect(() => {
    if (isEmpty(treeItem.data.descriptions)) {
      treeItem.data.descriptions = [];
    }
  },[]);

  useEffect(() => {
    setDescs(treeItem.data.descriptions || []);
  }, [treeItem.data.descriptions]);

  const descChange = (index: number, value: string) => {
    setModifiedIndexes((prevIndexes) => {
      if (!prevIndexes.includes(index)) {
        return [...prevIndexes, index];
      }
      return prevIndexes;
    });

    setDescs((prevDescs) => {
      const newDescs = [...prevDescs];
      newDescs[index] = value;
      return newDescs;
    });
  };

  const descRemove = (item: TreeItem, index: number) => {
    commConfirm.call({
      message: '설명을 삭제 하시겠습니까?',
      onConfirm: () => {
        onDescRemoveFn(item.index, index);
      }
    });
  };

  const handelDescAdd = () => {
    if (descAdd === '') {
      commAlert.call('설명을 입력해주세요');
      return;
    }

    onDescAddFn(treeItem.index, descAdd);

    setDescAdd('');
  };

  const descChangeHandler = (index: number) => {
    if (!modifiedIndexes.includes(index)) {
      commToast.warn('변경된 내용이 없습니다.');
      return;
    }

    onDescChangeFn(treeItem.index, descs[index], index);
  };

  return (
    <>
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">
          {treeItem.data.title}
        </h1>
        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
      </div>
      <div className="modal-body">
        <form>
          {treeItem.data.descriptions?.length > 0 && (
            <div className="mb-3">
              <label htmlFor="recipient-name" className="col-form-label">
                descriptions
              </label>
              {treeItem.data.descriptions?.map((description: string, index: number) => (
                <div className="input-group mb-3" key={index}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="description"
                    value={descs[index] || ''}
                    onChange={(e) => descChange(index, e.target.value)}
                    aria-label="descriptions"
                    aria-describedby={`button-des-${index}`}
                    id={`input-${index}`}
                  />
                  <label htmlFor={`input-${index}`}></label>
                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={() => descChangeHandler(index)}
                  >
                    수정
                  </button>
                  <button className="btn btn-outline-secondary" type="button" onClick={() => descRemove(treeItem, index)}>
                    삭제
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="message-text" className="col-form-label">
              Description Add
            </label>
            <textarea className="form-control"
                      id="message-text"
                      value={descAdd}
                      onChange={(e) => setDescAdd(e.target.value)}
                      aria-describedby="message-text-label">
            </textarea>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={handelDescAdd}>
          추가
        </button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          닫기
        </button>
      </div>
    </>
  );
};

export default DescModal;