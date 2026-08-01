import type { INewProductForm } from "./interface";

export const newProductForm: INewProductForm[] = [
  {
    name: 'title',
    type: 'text',
    placeholder: 'Product Title',
    label: 'Title',
  },
  {
    name: 'description',
    type: 'text',
    placeholder: 'Product Description',
    label: 'Description',
  },
  {
    name: 'price',
    type: 'number',
    placeholder: 'Product Price',
    label: 'Price',
  },
  {
    name: 'imgUrl',
    type: 'text',
    placeholder: 'Product Image URL',
    label: 'Image URL',
  },
]