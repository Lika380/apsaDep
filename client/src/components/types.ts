
export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string; 
  type?: string; 
};


export interface Review {
  id: string;
  productId: string;
  email: string;
  rating: number;
  comment: string;
  createdAt: string;
  phone?: string; 
}


