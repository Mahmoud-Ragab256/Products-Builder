export interface IInput {
  name: string;
  type: string;
  placeholder: string;
  label: string;
}


export interface INewProductForm extends IInput {
  name: "title" | "description" | "price" | "imgUrl";
}