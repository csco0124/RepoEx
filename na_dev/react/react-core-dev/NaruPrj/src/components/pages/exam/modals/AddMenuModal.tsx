import React, {useState, ChangeEventHandler, MouseEventHandler, useContext} from 'react';
import {TreeItem, TreeItemIndex} from 'react-complex-tree';
import toastContext from "../../../../store/toast-context";
import alertContext from "../../../../store/alert-context";

interface Props {
  treeItems: { [key: string]: TreeItem };
  onClose: () => void;
  addMenuFn: (title: string, parentIndex: TreeItemIndex, isFolder: boolean) => void;
}

const addMenuModal: React.FC<Props> = (
  {
    treeItems
    , onClose
    , addMenuFn
  }: Props) => {

  const [menuTitle, setMenuTitle] = useState<string>('');
  const [parentIndex, setParentIndex] = useState<TreeItemIndex>('root');
  const [isFolder, setIsFolder] = useState<boolean>(false);

  const commToast = useContext(toastContext);
  const commAlert = useContext(alertContext);

  const addMenuBtnFn = (): void => {
    if (menuTitle === '') {
      commAlert.call('메뉴 이름을 입력해주세요');
      return;
    }

    addMenuFn(menuTitle.trim(), parentIndex, isFolder);
    commToast.call('메뉴가 추가되었습니다.');
    onClose();
  }

  const menuTitleChange = (value : string): void => {
    setMenuTitle(value);
  }

  const isFolderChange: MouseEventHandler<HTMLInputElement> = (e): void => {
    setIsFolder((e.target as HTMLInputElement).checked);
  };

  const parentMenuChange : ChangeEventHandler<HTMLSelectElement> = (e ): void => {
    setParentIndex(e.target.value);
  }
  /**
   * 상위 메뉴 옵션
   * @returns {React.ReactNode}
   */
  const parentMenuOptions = (): React.ReactNode => {
    return Object.values(treeItems)
                 .filter(v => Array.isArray(v.children) && v.children.length > 0)
                 .sort((a,b) => a.data.title > b.data.title ? 1 : -1)
                 .map(item => <option key={item.index}
                                      value={item.index}
                                      defaultValue={'root'}>
                                {item.data.title}
                              </option>);
  }

  return (
    <>
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="addMenuModalTitle">
          메뉴 추가
        </h1>
        <button type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}>
        </button>
      </div>
      <div className="modal-body">
        <form>
          <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">
              메뉴 이름
            </label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="메뉴명을 입력해 주세요."
                maxLength={20}
                value={menuTitle}
                onChange={(e) => menuTitleChange(e.target.value)}
                aria-label="menu-title"
                aria-describedby={`button-menu-title`}
                id={`input-menu-title`}
              />
              <label htmlFor={`input-menu-title`}></label>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="message-text" className="col-form-label">
              상위 메뉴
            </label>
            <select className="form-select"
                    aria-label="상위메뉴"
                    id="message-text"
                    value={parentIndex}
                    onChange={parentMenuChange}
            >
              {parentMenuOptions()}
            </select>
          </div>
          <div className="">{/*<div className="form-check">*/}
            <label className="form-check-label" htmlFor="flexCheckChecked">
              폴더 여부
            </label>
            <input className="form-check-input"
                   type="checkbox"
                   value=""
                   id="flexCheckChecked"
                   onClick={isFolderChange}/>
          </div>

        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={addMenuBtnFn}>
          추가
        </button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          닫기
        </button>
      </div>
    </>
  );
};

export default addMenuModal;