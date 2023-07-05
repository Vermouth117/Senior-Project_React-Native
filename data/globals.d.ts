
export interface Prefecture {
  name: string;
  imgSrc: string;
  number: number;
}

export interface Spot {
  id: number;
  name: string;
  imgSrc: string;
  price: number;
  access: string;
}

export interface Cards {
  name: string;
  prefecture: string;
  images: string[] | string;
  price: number;
  access: string;
  zip_code: string;
  address: string;
  business: string;
  phone_number: string;
  parking: string;
  toilet: string;
  closed: string;
  public_transport: string[] | string;
  car: string[] | string;
  has_visited: boolean;
  latitude: number;
  longitude: number;
}

export interface RandomCards {
  name: string;
  prefecture: string;
  images: string[];
  price: number;
  access: string;
  zip_code: string;
  address: string;
  business: string;
  phone_number: string;
  parking: string;
  toilet: string;
  closed: string;
  public_transport: string[] | string;
  car: string[] | string;
  has_visited: boolean;
  latitude: number;
  longitude: number;
}
