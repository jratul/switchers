import type { Document, ObjectId, WithId } from "mongodb";

export interface NavSubLink {
  name: string;
  href: string;
}

export interface NavSubCategory {
  title: string;
  subLinks: NavSubLink[];
}

export interface GameInfo extends WithId<Document> {
  _id: ObjectId;
  name: string;
  genre: string;
  release: Date;
  price: number;
  company: string;
  image: string;
  desc: string;
  score: number;
}

export interface ProductInfo extends WithId<Document> {
  name: string;
  price: number;
  image: string;
  desc: string;
  type: string;
}

export interface ReviewInfo extends WithId<Document> {
  userName: string;
  score: number;
  date: Date;
  content: string;
}

export interface EventInfo {
  title: string;
  content: string;
  image: string;
  totalPrice: number;
  games: string[];
  devices: string[];
  accs: string[];
}

export interface FilterInfo {
  title: string;
  items: string[];
}

export interface CartInfo extends WithId<Document> {
  name: string;
  price: number;
  count: number;
  image: string;
}
