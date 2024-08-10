import React, { createContext, useState, useMemo, ReactNode } from 'react';
import { CommModal, ModalOptionProps } from '@components/modal/CommModal';
import { LoadableComponent } from "@loadable/component";

interface ModalProps {
  Component: LoadableComponent<any>;
  props: {
    title: string;
    [key: string]: any;
  };
  option?: ModalOptionProps;
}

interface ModalContextValue {
  open: (Component: LoadableComponent<any>, props: {title: string, [key: string]: any}, option?: ModalOptionProps) => void;
  close: (Component: LoadableComponent<any>) => void;
}

const ModalDispatchContext = createContext<ModalContextValue>({
  open: (_Component, _props, _option) => {},
  close: (_Component) => {},
});

const ModalStateContext = createContext<ModalProps[]>([]);

interface ModalProviderProps {
  children: ReactNode;
}

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [openModals, setOpenModals] = useState<ModalProps[]>([]);
  
  const open = (Component: LoadableComponent<any>, props: {title: string, [key: string]: any}, option?: ModalOptionProps) => {
    setOpenModals(modals => [...modals, { Component, props, option }]);
  };

  const close = (Component: LoadableComponent<any>) => {
    setOpenModals(modals => modals.filter(modal => modal.Component !== Component));
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

export { ModalProvider, ModalStateContext, ModalDispatchContext }
export type { ModalProps }