import 'react-complex-tree/lib/style-modern.css';
import $api from '../../../../common/CommonAxios';
import React, {useContext, useEffect, useState} from "react";
import toastContext from "../../../../store/toast-context";
import alertContext from "../../../../store/alert-context";
import confirmContext from "../../../../store/confirm-context";
import reactStringReplace from 'react-string-replace';
import {createKey, isEmpty, isNotEmpty} from "../../../../common/commonUtil";
import useModals from "../../../../common/useModal";
import {commModal, MODAL_SIZE} from "../../CommModal";

import {
  ControlledTreeEnvironment,
  DraggingPosition,
  InteractionMode,
  Tree,
  TreeItem,
  TreeItemIndex
} from "react-complex-tree";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store";


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

export default function ComplexTree({ titleHandler }: { titleHandler: (title: string) => void }): React.ReactElement {

  const [treeItems, setTreeItems] = useState<{ [key: string]: TreeItem }>({});
  const [searchValue, setSearchValue] = useState('');

  const [focusedItem, setFocusedItem] = useState<TreeItemIndex>();
  const [expandedItems, setExpandedItems] = useState<TreeItemIndex[]>([]);
  const [selectedItems, setSelectedItems] = useState<TreeItemIndex[]>([]);

  const commToast = useContext(toastContext);
  const commAlert = useContext(alertContext);
  const commConfirm = useContext(confirmContext);

  const {openModal} = useModals();

  const treeType = useSelector((state: RootState) => ((state.leftTree.treeType) == 5 ? '2'
                                                            : (state.leftTree.treeType) == 6 ? '4'
                                                            : (state.leftTree.treeType) == 7 ? '3' : '4'));
  // 5 의 경우 관리자, 6 의 경우 대시보드, 7 의 경우 데모
  const DOMAIN_TYPE_TITLE : {[key: string]: string} = {
    '2' : 'NEXT LAB 통합관리자',
    '4' : 'NEXT LAB 대시보드',
    '3' : '데모 (대시보드)'
  }

  useEffect(() => {
    filterTree(searchValue);
  },[searchValue]);

  useEffect(() => {
    getTreeItems();
  }, []);

  /**
   * 메뉴 추가
   */
  const openAddMenuModal = () => {
    openModal(commModal.addMenuModal, {treeItems, addMenuFn}, {MODAL_SIZE: MODAL_SIZE.LARGE});
  }

  const getTreeItems = async () => {
		const type = treeType !== '2' ? '4' : '2';
    const response = await $api.post('/api/tree/get', {treeType : type} as TreeItemRequest);
    const treeItems :{ [key: string]: TreeItem } = JSON.parse(response.data.treeJson);

    setTreeItems({...treeItems});

    setExpandedItems(() => {
      return Object.values(treeItems)
        .filter(v => typeof v.index === 'string' && v.index.match(/-/gi)?.length === 2)
        .map(v => v.index);
    });

    titleHandler(DOMAIN_TYPE_TITLE[treeType]);
  }

  const getTitle = (item: any) => item.data.title;

  /**
   * 트리에 메뉴 추가
   * @param title
   * @param parentIndex
   * @param isFolder
   */
  const addMenuFn = (title : string, parentIndex : TreeItemIndex, isFolder : boolean): void => {
    const key = createKey('tree');

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
  }

  /**
   * 트리 정보 최신화 업데이트
   */
  const updateTreeItems = async () => {
    const type = treeType !== '2' ? '4' : '2';
    const param = {treeType : type, treeJson : JSON.stringify(treeItems), delYn : 'N'} as TreeItemRequest;
    const response = await $api.post('/api/tree/update', param);
    if (response.status === 200) {
      commToast.call('저장 되었습니다');
    }
  }

  /**
   * 트리 아이템에 설명 수정
   * @param itemId
   * @param newDesc
   * @param index
   */
  const onDescChangeFn = (itemId: TreeItemIndex, newDesc: string, index: number): void => {
    if (isEmpty(newDesc)) {
      commAlert.call('설명을 입력해주세요');
      return;
    }

    setTreeItems((prevTreeItems) => {
      const updatedTreeItems = { ...prevTreeItems };
      const newDescs = updatedTreeItems[itemId].data.descriptions;
      newDescs[index] = newDesc;
      updatedTreeItems[itemId] = { ...updatedTreeItems[itemId], data: { ...updatedTreeItems[itemId].data, descriptions : newDescs }};
      return updatedTreeItems;
    });

    commToast.call('설명이 변경 되었습니다');
  };

  /**
   * 트리 아이템에 설명 추가
   * @param itemId
   * @param newDesc
   */
  const onDescAddFn = (itemId: TreeItemIndex, newDesc: string): void => {

    setTreeItems((prevTreeItems) => {
      const updatedTreeItems = { ...prevTreeItems };
      const newDescs = updatedTreeItems[itemId].data.descriptions || [];
      newDescs.push(newDesc);
      updatedTreeItems[itemId] = { ...updatedTreeItems[itemId], data: { ...updatedTreeItems[itemId].data, descriptions : newDescs }};
      return updatedTreeItems;
    });

    commToast.call('설명이 추가 되었습니다');
  }

  /**
   * 트리 아이템에 설명 삭제
   * @param itemId
   * @param index
   */
  const onDescRemoveFn = (itemId: TreeItemIndex, index: TreeItemIndex): void => {
    setTreeItems((prevTreeItems) => {
      const updatedTreeItems = { ...prevTreeItems };
      const newDescs = updatedTreeItems[itemId].data.descriptions;
      newDescs.splice(index, 1);
      updatedTreeItems[itemId] = { ...updatedTreeItems[itemId], data: { ...updatedTreeItems[itemId].data, descriptions : newDescs }};
      return updatedTreeItems;
    });

    commToast.call('설명이 삭제 되었습니다');
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

    if (isEmpty(filteredIndexes)) return;

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
    if (isEmpty(searchValue)) return title;

    const searchRegex = new RegExp(`(${searchValue})`, 'gi');

    return title.split(searchRegex)
      .map((v: string, i: number) => {
        if (isEmpty(v)) return '';
        if (searchValue.toLowerCase() === v.toLowerCase()) {
          return <span key={i} className="rct-tree-item-search-highlight">{v}</span>;
        }

        return <span key={i}>
                {
                  reactStringReplace(v, / /,
                  (match, index) => <span key={`${i}_${index}`}>&nbsp;{match}</span>)
                }
               </span>;
      });
  }

  /**
   * 트리 아이템 삭제
   * @param treeIndex
   */
  const deleteTreeItem = (treeIndex: TreeItemIndex): void => {
    const currentItem = treeItems[treeIndex];

    commConfirm.call({
      message: `${currentItem.data.title} 메뉴를 삭제 하시겠습니까?`,
      onConfirm: () => {
        if (isNotEmpty(currentItem.children)) {
          commAlert.call('하위 메뉴가 존재합니다. 하위 메뉴를 먼저 삭제해주세요.');
          return;
        }

        setTreeItems((prevTreeItems) => {
          const updatedTreeItems = { ...prevTreeItems };
          delete updatedTreeItems[treeIndex];

          const parentIndex = getParentIndex(treeIndex);
          if (!parentIndex) return updatedTreeItems;

          updatedTreeItems[parentIndex].children = updatedTreeItems[parentIndex].children?.filter((v: any) => v !== treeIndex);
          return updatedTreeItems;
        });
        commAlert.call('삭제 되었습니다.');
      }
    })

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

  /**
   * 트리 아이템 설명 모달
   * @param item
   */
  const openDescModalHandler = async (item: TreeItem): Promise<void> => {
    if (item.isFolder) return;
    openModal(commModal.descModal, {treeItem: {...item}, onDescChangeFn, onDescAddFn, onDescRemoveFn});
  }

  const resetTreeData = (): void => {
    getTreeItems();
    commToast.call('수정 전 데이터 조회 완료');
  }


  return (
    <>
      <nav className="navbar navbar-expand-lg mt-2">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <input className="form-control me-2" type="search" value={searchValue} onChange={(e)=> setSearchValue(e.target.value)} placeholder="검색할 메뉴를 입력해 주세요."  aria-label="Search"/>
            {/*<button className="btn btn-outline-success" type="submit">Search</button>*/}
          </div>
        </div>
      </nav>
      <div className="searchItem mt-2 mb-3">
        <button type="button" className="btn-icon" onClick={expandAll}>
          <i className="icon-icon18" data-bs-toggle="tooltip" data-bs-html="true" title="전체 열기"></i>
          <span>전체 열기</span>
        </button>
        <button type="button" className="btn-icon" onClick={collapseAll}>
          <i className="icon-icon17" data-bs-toggle="tooltip" data-bs-html="true" title="전체 닫기"></i>
          <span>전체 닫기</span>
        </button>
        <button type="button" className="btn-icon" onClick={openAddMenuModal}>
          <i className="icon-icon20" data-bs-toggle="tooltip" data-bs-html="true" title="등록"></i>
          <span>등록</span>
        </button>
        <button type="button" className="btn-icon" onClick={resetTreeData}>
          <i className="icon-icon19" data-bs-toggle="tooltip" data-bs-html="true" title="리셋"></i>
          <span>리셋</span>
        </button>
      </div>
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
              openDescModalHandler(item);
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
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      {!item.isFolder && (
                      <button
                        onClick={() => openDescModalHandler(item)}
                        type="button"
                        className="btn"
                      >
                        <i className="bi bi-chat-square-dots"></i>
                      </button>
                      )}
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
      
      <div className="searchItem mt-2">
        <button type="button" className="btn btn-sm btn-primary" onClick={updateTreeItems}>
          저장하기
        </button>
      </div>
    </>
  );
}
