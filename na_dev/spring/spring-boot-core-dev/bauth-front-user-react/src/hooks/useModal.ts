import { ModalDispatchContext } from "@components/modal/ModalContext";
import { useContext } from "react";
import { LoadableComponent } from "@loadable/component";
import { ModalOptionProps } from '@components/modal/CommModal';

export const useModal = () => {
  const { open, close } = useContext(ModalDispatchContext);

  const openModal = (Component: LoadableComponent<any>, props: {title: string, [key: string]: any}, option?: ModalOptionProps) => {
    if (props.title === undefined) throw new Error("Modal title is required");
    open(Component, props, option);
  };

  const closeModal = (Component: LoadableComponent<any>) => {
    close(Component);
  };

  return { openModal, closeModal };
};
