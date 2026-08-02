export interface IErrors {
  title: string;
  description: string;
  price: string;
  imgUrl: string;
  colors: string;
}

export function validateProduct({ title, description, price, imgUrl, colors }: { title: string; description: string; price: number; imgUrl: string; colors: string[] }) {

  const errors: IErrors = {
    title: '',
    description: '',
    price: '',
    imgUrl: '',
    colors: ''
  }

  const isValidURL = (url: string): boolean => {
    try {
      const imgURL: URL = new URL(url);
      return imgURL.protocol === 'http:' || imgURL.protocol === 'https:' || imgURL.protocol === 'ftp:';
    } catch (e) {
      return false;
    }
  };

  if (!title.trim() || title.length < 10 || title.length > 100) {
    errors.title = 'Title must be between 10 and 100 characters'
  }

  if (!description.trim() || description.length < 20 || description.length > 500) {
    errors.description = 'Description must be between 20 and 500 characters'
  }

  if (!price || price <= 0) {
    errors.price = 'Price must be greater than 0'
  }

  if (!imgUrl.trim() || !isValidURL(imgUrl)) {
    errors.imgUrl = 'Image URL must be a valid URL'
  }

  if (!colors || colors.length === 0) {
    errors.colors = 'At least one color must be selected'
  }

  return errors;
}