
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
  images: string[] | string;
  // images: string[];
  title: string;
  postCode: string;
  address: string;
  price: number;
  business: string;
  phoneNumber: string;
  parking: string;
  toilet: string;
  closed: string;
  publicTransport: string[] | string;
  car: string[] | string;
}
