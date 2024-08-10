import 'react-complex-tree/lib/style-modern.css';
import $api from '../../../../common/CommonAxios';
import React, {useEffect, useState, useContext} from "react";
import toastContext from "../../../../store/toast-context";
import alertContext from "../../../../store/alert-context";
import Modal from "../../Modal";
import DescModal from "../complex-tree/DescModal";
import AddMenuModal from "./AddMenuModal";
import reactStringReplace from 'react-string-replace';

import {
  ControlledTreeEnvironment,
  DraggingPosition,
  InteractionMode,
  Tree,
  TreeItem,
  TreeItemIndex
} from "react-complex-tree";


interface CommDto {
  regDt : Date | string;
  registrar : string;
  mdfDt : Date | string;
  modifier : string;
  delYn : string;
}

interface TreeItemRequest extends CommDto {
  uid : string;
  treeJson : string;
  treeType : string;
}

export default function ComplexTree(): React.ReactElement {

  const [treeItems, setTreeItems] = useState<{ [key: string]: TreeItem }>({});
  const [targetItem, setTargetItem] = useState<TreeItem>({} as TreeItem);
  const [searchValue, setSearchValue] = useState('');
  const [index, setIndex] = useState(111);
  const [domainType, setDomainType] = useState<string>('2');

  const [focusedItem, setFocusedItem] = useState<TreeItemIndex>();
  const [expandedItems, setExpandedItems] = useState<TreeItemIndex[]>([]);
  const [selectedItems, setSelectedItems] = useState<TreeItemIndex[]>([]);

  const [descOpen, setDescOpen] = useState(false);
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const toast = useContext(toastContext);
  const alert = useContext(alertContext);

  const DOMAIN_TYPE_TITLE : {[key: string]: string} = {
    '2' : 'NEXT LAB 통합관리자',
    '4' : 'NEXT LAB 대시보드'
  }

  useEffect(() => {
    filterTree(searchValue);
  },[searchValue]);

  useEffect(() => {
    getTreeItems();

  }, [domainType]);

  const getTreeItems = async () => {
    const response = await $api.post('/api/tree/get', {treeType : domainType} as TreeItemRequest);
    const treeItems :{ [key: string]: TreeItem } = JSON.parse(response.data.treeJson);
    setTreeItems({...treeItems});

    setExpandedItems(() => {
      return Object.values(treeItems)
                   .filter(v => typeof v.index === 'string' && v.index.match(/-/gi)?.length === 2)
                   .map(v => v.index);
    });
  }

  const closeDescModal = () => setDescOpen(false);
  const openDescModal = () => setDescOpen(true);

  const openAddMenuModal = () => setAddMenuOpen(true);
  const closeAddMenuModal = () => setAddMenuOpen(false);

  const getTitle = (item: any) => item.data.title;

  /**
   * 트리에 메뉴 추가
   * @param title
   * @param parentIndex
   * @param isFolder
   */
  const addMenuFn = (title : string, parentIndex : TreeItemIndex, isFolder : boolean): void => {
    const randomIndex = Math.floor(Math.random() * 1000000);
    const key = `${index}- ${randomIndex}`;
    setIndex((prevIndex) => prevIndex + 1);

    const updatedTreeItems = { ...treeItems,
      [key]: {
        index: key,
        canMove: true,
        canRename: true,
        isFolder: isFolder,
        children: [],
        data: {
          title: title,
          descriptions: [],
        }
      }
    };
    // 부모의 자식으로 추가
    updatedTreeItems[parentIndex].children = [
      ...(updatedTreeItems[parentIndex].children?.filter(v => updatedTreeItems.hasOwnProperty(v)) || []),
      key,
    ];

    setTreeItems(updatedTreeItems);
    setAddMenuOpen(false);
  }

  /**
   * 트리 정보 최신화 업데이트
   */
  const updateTreeItems = async () => {
    const param = {treeType : domainType, treeJson : JSON.stringify(treeItems), delYn : 'N'} as TreeItemRequest;
    const response = await $api.post('/api/tree/update', param);
    if (response.status === 200) {
      toast.call('저장 되었습니다');
    }
  }

  /**
   * 트리 아이템에 설명 수정
   * @param itemId
   * @param newDesc
   * @param index
   */
  const onDescChangeFn = (itemId: TreeItemIndex, newDesc: string, index: number): void => {
    if (newDesc === '') {
      alert.call('설명을 입력해주세요');
      return;
    }

    setTreeItems((prevTreeItems) => {
      const updatedTreeItems = { ...prevTreeItems };
      const newDescs = prevTreeItems[itemId].data.descriptions;
      newDescs[index] = newDesc;
      updatedTreeItems[itemId] = { ...prevTreeItems[itemId], data: { ...prevTreeItems[itemId].data, descriptions : newDescs }};
      return updatedTreeItems;
    });
    toast.call('설명이 변경 되었습니다');
  };

  /**
   * 트리 아이템에 설명 추가
   * @param itemId
   * @param newDesc
   */
  const onDescAddFn = (itemId: TreeItemIndex, newDesc: string): void => {
    setTreeItems((prevTreeItems) => {
      const updatedTreeItems = { ...prevTreeItems };
      const newDescs = prevTreeItems[itemId].data.descriptions;
      newDescs.push(newDesc);
      updatedTreeItems[itemId] = { ...prevTreeItems[itemId], data: { ...prevTreeItems[itemId].data, descriptions : newDescs }};
      return updatedTreeItems;
    });
    toast.call('설명이 추가 되었습니다');
  }

  /**
   * 트리 아이템에 설명 삭제
   * @param itemId
   * @param index
   */
  const onDescRemoveFn = (itemId: TreeItemIndex, index: TreeItemIndex): void => {
    if (!confirm('설명을 삭제 하시겠습니까?')) {
      return;
    }

    setTreeItems((prevTreeItems) => {
      const updatedTreeItems = { ...prevTreeItems };
      const newDescs = prevTreeItems[itemId].data.descriptions;
      newDescs.splice(index, 1);
      updatedTreeItems[itemId] = { ...prevTreeItems[itemId], data: { ...prevTreeItems[itemId].data, descriptions : newDescs }};
      return updatedTreeItems;
    });

    toast.call('설명이 삭제 되었습니다');
  }

  /**
   * 트리 검색 기능
   * @param value
   */
  const filterTree = (value :string): void => {
    // 검색어가 없으면 초기화
    setExpandedItems([]);

    // 검색어에 해당하는 타이틀의 index 배열생성
    const filteredIndexes = Object.values(treeItems)
      .filter(item => item.data.title.includes(value) && item.index !== 'root')
      .map(item => item.index);

    if (filteredIndexes.length === 0 || value === '') return;

    filteredIndexes.forEach((index) => expandParent(index));
  }

  /**
   * 트리 아이템의 부모를 expandedItems 에 추가
   * @param index
   */
  const expandParent = async (index : TreeItemIndex) => {
    const parentIndex = getParents(index, []).reverse();

    setExpandedItems(prev => {
      const tmp = parentIndex.filter(v => !prev.includes(v));
      return [...prev, ...tmp];
    });
  };

  /**
   * 트리 아이템의 부모들을 찾아서 배열로 반환
   * @param target
   * @param idx
   * @returns {TreeItemIndex[]} - 부모들의 index 배열
   */
  const getParents = (target : TreeItemIndex, idx: TreeItemIndex[]): TreeItemIndex[] => {
    //target 추가
    idx.push(target);

    const parentIndex = getParentIndex(target);

    if (parentIndex) {
      return getParents(parentIndex, idx);
    }

    // 부모가 없으면 idx 반환
    return idx;
  }

  /**
   * 트리 아이템의 부모 index 를 찾아서 반환
   * @param index
   */
  const getParentIndex = (index: TreeItemIndex): TreeItemIndex | undefined => {
    return Object.values(treeItems).find(item => item.children?.includes(index))?.index;
  }

  /**
   * 트리 전체 접기
   */
  const collapseAll = (): void => {
    setSearchValue('');
    setExpandedItems([]);
  }

  /**
   * 트리 전체 펼치기
   */
  const expandAll = (): void => {
    setSearchValue('');
    setExpandedItems(Object.values(treeItems)
                           .filter(item => item.index !== 'root')
                           .map(item => item.index));
  }

  /**
   * 트리 아이템의 타이틀에 검색어 하이라이트
   * @param title
   */
  const searchHighlight = (title: any): React.ReactNode | string => {
    if (searchValue === '' || !title.includes(searchValue)) return title;

    const searchRegex = new RegExp(`(${searchValue})`, 'gi');

    return title.split(searchRegex)
      .map((v : string, i : number) => {
        if (v === '') return '';
        if (searchValue.toLowerCase() === v.toLowerCase()) {
          return <span key={i} className="rct-tree-item-search-highlight">{v}</span>;
        }

        return <span key={i}>
                {reactStringReplace(v, / /, () => <span key={i}>&nbsp;</span>)}
               </span>;
      });
  }

  /**
   * 트리 아이템 삭제
   * @param treeIndex
   */
  const deleteTreeItem = (treeIndex: TreeItemIndex): void => {
    const currentItem = treeItems[treeIndex];

    if (!confirm(`${currentItem.data.title} 메뉴를 삭제 하시겠습니까?`)) return;

    if (Array.isArray(currentItem.children) && currentItem.children.length > 0) {
      alert.call('하위 메뉴가 존재합니다. 하위 메뉴를 먼저 삭제해주세요.');
      return;
    }

    setTreeItems((prevTreeItems) => {
      const updatedTreeItems = { ...prevTreeItems };
      delete updatedTreeItems[treeIndex];

      const parentIndex = getParentIndex(treeIndex);
      if (parentIndex === undefined) return updatedTreeItems;

      updatedTreeItems[parentIndex].children = updatedTreeItems[parentIndex].children?.filter((v: any) => v !== treeIndex);
      return updatedTreeItems;
    });

    alert.call('삭제 되었습니다.');
  }

  /**
   * 드래그앤 드롭 이벤트
   * @param dragItems 드래그 한 아이템
   * @param target 드랍 했을때에 해당되는 타겟
   */
  const onDropFn = (dragItems : TreeItem[], target : DraggingPosition): void => {
    //중복 선택이 되지 않기 때문에 dragItems[0]으로 처리
    const dragItem = {...dragItems[0]}
    const dragItemParent = getParentIndex(dragItem.index) as TreeItemIndex;

    if (dragItemParent === undefined) return;

    setTreeItems(prevItems => {
      const updatedItems = {...prevItems};

      //드래그 아이템의 부모의 차일드에서 드래그 아이템을 삭제한다.
      updatedItems[dragItemParent].children = updatedItems[dragItemParent].children?.filter((v: any) => v !== dragItem.index);

      //타겟의 인덱스를 찾는다 between-items 의 경우 타겟의 차일드로 가는것이 아니기 때문에 타겟의 부모를 찾는다.
      //between-items 의 경우 타겟의 차일드로 가기 떄문에 차일드로 지정
      const targetIndex = target.targetType === 'between-items' ? target.parentItem : target.targetItem;

      //타겟의 부모에 차일드를 추가한다.
      const targetChildren = updatedItems[targetIndex].children;

      if (!targetChildren) return prevItems;

      if (target.targetType === 'between-items') {
        targetChildren.splice(target.childIndex, 0, dragItem.index);
      } else if (target.targetType === 'item') {
        targetChildren.push(dragItem.index);
      }

      updatedItems[targetIndex] = {...updatedItems[targetIndex], children: targetChildren};

      return updatedItems;
    });
  }

  return (
    <>
      <div
        className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">{DOMAIN_TYPE_TITLE[domainType] || ''}</h1>
      </div>


      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled">Disabled</a>
              </li>
            </ul>
              <input className="form-control me-2" type="search" value={searchValue} onChange={(e)=> setSearchValue(e.target.value)} placeholder="검색할 메뉴를 입력해 주세요."  aria-label="Search"/>
                {/*<button className="btn btn-outline-success" type="submit">Search</button>*/}
          </div>
        </div>
      </nav>




      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label" >검색</label>
        <input type="text" className="form-control" id="exampleFormControlInput1" />
      </div>
      {
        descOpen &&
        <Modal>
          <DescModal
            closeModal={closeDescModal}
            treeItem={targetItem}
            onDescChangeFn={onDescChangeFn}
            onDescAddFn={onDescAddFn}
            onDescRemoveFn={onDescRemoveFn}
          />
        </Modal>
      }
      {
        addMenuOpen &&
        <Modal>
          <AddMenuModal
            closeModal={closeAddMenuModal}
            treeItems={treeItems}
            addMenuFn={addMenuFn}
          />
        </Modal>
      }

      <button type="button" className="btn btn-primary" onClick={expandAll}>
        전체 열기
      </button>
      <button type="button" className="btn btn-secondary" onClick={collapseAll}>
        전체 닫기
      </button>
      <button type="button" className="btn btn-secondary" onClick={openAddMenuModal}>
        메뉴 추가
      </button>
      <button type="button" className="btn btn-secondary" onClick={updateTreeItems}>
        메뉴 수정 반영
      </button>
      <button type="button" className="btn btn-secondary" onClick={getTreeItems}>
        초기 데이터 조회
      </button>

      <ControlledTreeEnvironment <string>
        canDragAndDrop
        canDropOnFolder
        canReorderItems
        items={treeItems}
        onFocusItem={item => setFocusedItem(item.index)}
        onExpandItem={item => setExpandedItems([...expandedItems, item.index])}
        onCollapseItem={item => setExpandedItems(expandedItems.filter(i => i !== item.index))}
        onRenameItem={(treeItem, name) => {
          setTreeItems(prevTreeItems => {
            const updatedTreeItems = { ...prevTreeItems };
            updatedTreeItems[treeItem.index].data.title = name;
            return updatedTreeItems;
          });
        }}
        onSelectItems={items => setSelectedItems(items)}
        onDrop={onDropFn}
        getItemTitle={getTitle}
        viewState={{
          ['complexTree']: {
            focusedItem,
            expandedItems,
            selectedItems,
          },
        }}
        defaultInteractionMode={{
          mode: 'custom',
          extends: InteractionMode.ClickItemToExpand,
          createInteractiveElementProps: (item, treeId, actions, renderFlags) => ({
            onDoubleClick: () => {
              if (item.isFolder) return;
              setTargetItem(item);
              openDescModal();
            },
            tabIndex: !renderFlags.isRenaming ? (renderFlags.isFocused ? 0 : -1) : undefined,
          }),
        }}
        renderItem={({ item, depth, children, title, context, arrow }) => {
          const InteractiveComponent = context.isRenaming ? 'div' : 'button';
          const type = context.isRenaming ? undefined : 'button';

          return (
            <li
              {...(context.itemContainerWithChildrenProps as any)}
              className={`rct-tree-item-li`}
            >
              <div
                {...(context.itemContainerWithoutChildrenProps as any)}
                style={{ paddingLeft: `${(depth + 1) * 4}px` }}
                className={[
                  'rct-tree-item-title-container',
                  item.isFolder && 'rct-tree-item-title-container-isFolder',
                  context.isSelected && 'rct-tree-item-title-container-selected',
                  context.isExpanded && 'rct-tree-item-title-container-expanded',
                  context.isFocused && 'rct-tree-item-title-container-focused',
                  context.isDraggingOver && 'rct-tree-item-title-container-dragging-over'
                ].join(' ')}
              >
                {arrow}
                <InteractiveComponent
                  type={type}
                  {...(context.interactiveElementProps as any)}
                  className="rct-tree-item-button"
                >
                  {searchHighlight(title)}
                </InteractiveComponent>
                {
                  context.isSelected && (
                    <>
                      <button
                        onClick={context.startRenamingItem}
                        className="btn"
                        type="button"
                      >
                        <i className="bi bi-wrench"></i>
                      </button>
                      <button
                        onClick={() => deleteTreeItem(item.index)}
                        type="button"
                        className="btn"
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </>
                  )}
              </div>
              {children}
            </li>
          );
        }}
      >
        <Tree treeId="complexTree" rootItem="root" treeLabel="complexTree Example"/>
      </ControlledTreeEnvironment>
    </>
  );
}
