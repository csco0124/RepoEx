import React, { useState, useEffect } from 'react';
import { TreeItem } from 'react-complex-tree';

interface Props {
  treeItem: TreeItem;
  closeModal: () => void;
  onDescChangeFn: (itemId: any, newDesc: string, index: number) => void;
  onDescAddFn: (itemId: any, newDesc: string) => void;
  onDescRemoveFn: (itemId: any, index: number) => void;
}

const DescModal: React.FC<Props> = (
  {
    closeModal
    , treeItem
    , onDescChangeFn
    , onDescRemoveFn
    , onDescAddFn
  }: Props) => {
  const [descriptions, setDescriptions] = useState<string[]>(treeItem.data.descriptions || []);
  const [descAdd, setDescAdd] = useState<string>('');

  useEffect(() => {
    setDescriptions([...treeItem.data.descriptions]);
  }, [treeItem.data.descriptions]);

  const descChange = (index: number, value: string) => {
    setDescriptions((prevDescriptions) => {
      const newDescriptions = [...prevDescriptions];
      newDescriptions[index] = value;
      return newDescriptions;
    });
  };

  const descRemove = (treeItem: TreeItem, index: number) => {
    setDescriptions((prevDescriptions) => {
      const newDescriptions = [...prevDescriptions];
      newDescriptions.splice(index, 1);
      return newDescriptions;
    });
    onDescRemoveFn(treeItem.index, index);
  };

  const handelDescAdd = () => {
    if (descAdd === '') {
      alert('설명을 입력해주세요');
      return;
    }
    setDescriptions((prevDescriptions) => {
      const newDescriptions = [...prevDescriptions];
      newDescriptions.push(descAdd);
      return newDescriptions;
    });
    onDescAddFn(treeItem.index, descAdd);

    setDescAdd('');
  }


  return (
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">
          {treeItem.data.title}
        </h1>
        <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
      </div>
      <div className="modal-body">
        <form>
          {treeItem.data.descriptions.length > 0 && (
            <div className="mb-3">
              <label htmlFor="recipient-name" className="col-form-label">
                descriptions
              </label>
              {descriptions.map((description: string, index: number) => (
                <div className="input-group mb-3" key={index}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="description"
                    value={description}
                    onChange={(e) => descChange(index, e.target.value)}
                    aria-label="descriptions"
                    aria-describedby={`button-des-${index}`}
                    id={`input-${index}`}
                  />
                  <label htmlFor={`input-${index}`}></label>
                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={() => onDescChangeFn(treeItem.index, description, index)}
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
        <button type="button" className="btn btn-secondary" onClick={closeModal}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default DescModal;