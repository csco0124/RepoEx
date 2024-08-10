import { useContext } from 'react';
import { ModalDispatchContext, ModalStateContext } from '../../store/modal-context';
import Modal from "./exam/modals/Modal";
import loadable from '@loadable/component'

export const commModal = {
  descModal : loadable(() => import('./exam/modals/DescModal')),
  addMenuModal : loadable(() => import('./exam/modals/AddMenuModal')),
  iconModal : loadable(() => import('./exam/modals/IconModal')),
  agGridModal : loadable(() => import('./exam/modals/AgGridModal')),
  apiExecuteModal : loadable(() => import('./exam/modals/ApiExecuteModal')),
}

export interface ModalOptionProps {
  MODAL_SIZE? : MODAL_SIZE;
  outsideClose? : boolean;
}

export enum MODAL_SIZE {
  SMALL = 'modal-sm',
  LARGE = 'modal-lg',
  XL = 'modal-xl',
  FULL = 'modal-fullscreen',
}

export const CommModal = () => {
  const openModals = useContext(ModalStateContext);
  const { close } = useContext(ModalDispatchContext);

  if (!openModals.length) {
    return null;
  }

  return (
    <>
      {openModals.map((modal, index) => {
        const { Component, props, option } = modal;

        const onClose = () => {
          close(Component);
        };

        return (
          <Modal key={index} onClose={onClose} option={option}>
            <Component key={index} onClose={onClose} {...props}/>
          </Modal>
        );
      })}
    </>
  );
};