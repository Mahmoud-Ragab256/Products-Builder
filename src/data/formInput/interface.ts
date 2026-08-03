import { type TName } from "../../types";

export interface IInput {
  name: string;
  type: string;
  placeholder: string;
  label: string;
}


export interface IProductForm extends IInput {
  name: TName;
}