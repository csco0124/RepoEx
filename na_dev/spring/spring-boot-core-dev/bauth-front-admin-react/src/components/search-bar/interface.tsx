import type { TextFieldProps } from "@mui/material/TextField"
import { ReactNode } from "react";
import type { UseFormHandleSubmit, UseFormReset } from "react-hook-form";


export interface SearchBarContainer {
  fetchMethod(): void;
  title: string;
  fieldList: TextFieldProps[];
}

export interface SearchBarPresentation {
  title: string;
  handleSubmit : UseFormHandleSubmit<any, any>;
  reset : UseFormReset<any>;
  children: ReactNode;
}