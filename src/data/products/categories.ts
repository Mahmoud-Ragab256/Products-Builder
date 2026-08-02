export interface ICategory {
  id: number;
  name: string;
  imageUrl: string;
}

export const categories: ICategory[] = [
  {
    id: 1,
    name: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500'
  },
  {
    id: 2,
    name: 'Fashion & Apparel',
    imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500'
  },
  {
    id: 3,
    name: 'Home & Kitchen',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500'
  },
  {
    id: 4,
    name: 'Beauty & Personal Care',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500'
  },
  {
    id: 5,
    name: 'Sports & Fitness',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500'
  },
  {
    id: 6,
    name: 'Books & Stationery',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500'
  },
  {
    id: 7,
    name: 'Toys & Games',
    imageUrl: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500'
  },
  {
    id: 8,
    name: 'Automotive & Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500'
  },
  {
    id: 9,
    name: 'Health & Wellness',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500'
  },
  {
    id: 10,
    name: 'Groceries & Snacks',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500'
  }
];

export default categories;