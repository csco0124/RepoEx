import React, { createContext, useState, useMemo, ReactNode } from 'react';
import { CommModal, MODAL_SIZE, ModalOptionProps } from '../components/pages/CommModal';
import {LoadableComponent} from "@loadable/component";

interface ModalProps {
  Component: LoadableComponent<any>;
  props: any;
  option?: ModalOptionProps;
}

interface ModalContextValue {
  open: (Component: LoadableComponent<any>, props?: any, option?: ModalOptionProps) => void;
  close: (Component: LoadableComponent<any>) => void;
}

const ModalDispatchContext = createContext<ModalContextValue>({
  open: (Component, props, size) => {},
  close: (Component) => {},
});

const ModalStateContext = createContext<ModalProps[]>([]);

interface ModalProviderProps {
  children: ReactNode;
}

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [openModals, setOpenModals] = useState<ModalProps[]>([]);

  const open = (Component: LoadableComponent<any>, props?: any, option?: ModalOptionProps) => {
    setOpenModals((modals) => [...modals, { Component, props, option }]);
  };

  const close = (Component: LoadableComponent<any>) => {
    setOpenModals((modals) => modals.filter((modal) => modal.Component !== Component));
  };

  const dispatch = useMemo(() => ({ open, close }), []);

  return (
    <ModalStateContext.Provider value={openModals}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
        <CommModal />
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
};

export { ModalProvider, ModalStateContext, ModalDispatchContext };