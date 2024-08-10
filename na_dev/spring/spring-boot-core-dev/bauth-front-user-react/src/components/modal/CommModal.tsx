import { useContext } from 'react';
import { ModalDispatchContext, ModalStateContext, ModalProps } from '@components/modal/ModalContext';
import ModalWrap from "@components/modal/ModalWrap";
import { Typography } from '@mui/material';
export interface ModalOptionProps {
  //MODAL_SIZE? : MODAL_SIZE;
  outsideClose? : boolean;
}

//bootstrap 기준 modal size
// export enum MODAL_SIZE {
//   SMALL = 'modal-sm',
//   LARGE = 'modal-lg',
//   XL = 'modal-xl',
//   FULL = 'modal-fullscreen',
// }

export const CommModal = () => {
  const openModals = useContext(ModalStateContext);
  const { close } = useContext(ModalDispatchContext);

  if (!openModals.length) {
    return null;
  }

  return (
    <>
      { openModals.map((modal, index) => {
        const { Component, props, option }: ModalProps = modal;

        const onClose = () => close(Component);

        return (
          <ModalWrap key={index} onClose={onClose} option={option}>
            <Typography variant="h1">{props.title}</Typography>
            <Component key={index} onClose={onClose} {...props}/>
          </ModalWrap>
        );
      })}
    </>
  );
};