import { ModalDispatchContext} from "@components/modal/ModalContext";
import { ModalOptionProps } from "@components/modal/CommModal";
import { useContext } from "react";
import { LoadableComponent } from "@loadable/component";

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
