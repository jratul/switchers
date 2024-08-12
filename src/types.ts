export interface NavSubLink {
  name: string;
  href: string;
}

export interface NavSubCategory {
  title: string;
  subLinks: NavSubLink[];
}

export interface GameInfo {
  name: string;
  genre: string;
  release: Date;
  price: number;
  company: string;
  image: string;
  desc: string;
}
