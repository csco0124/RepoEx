import { ModalDispatchContext } from "../store/modal-context";
import { useContext } from "react";
import { LoadableComponent } from "@loadable/component";
import { ModalOptionProps } from '../components/pages/CommModal';

const useModal = () => {
  const { open, close } = useContext(ModalDispatchContext);

  const openModal = (Component: LoadableComponent<any>, props?: any, option?: ModalOptionProps) => {
    open(Component, props, option);
  };

  const closeModal = (Component: LoadableComponent<any>) => {
    close(Component);
  };

  return { openModal, closeModal };
};

export default useModal;