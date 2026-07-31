export interface IProducts {
  id: number;
  imgUrl: string;
  title: string;
  description: string;
  colors: string[];
  category: {
    name: string;
    imageUrl: string;
  }
  price: number;
}