/* eslint-disable no-unused-vars */
export interface Personal {
  data: {
    title: string;
    address: string;
    email: string;
    images: Image;
    name: string;
    phoneNumber: string;
    project: Project[];
    skill: Skill[];
    social: Social[];
  };
}
export interface Personal2 {
  title: string;
  address: string;
  email: string;
  images: Image;
  name: string;
  phoneNumber: string;
  project: Project[];
  skill: Skill[];
  social: Social[];
}

export interface Image {
  _type: ImagesType;
  asset: Asset;
}

export enum ImagesType {
  Image = 'image',
}

export interface Asset {
  _ref: string;
  _type: AssetType;
}

export enum AssetType {
  Reference = 'reference',
}

export interface Project {
  description: string;
  image: Image;
  linkToBuild: string;
  technologies: Technology[];
  title: string;
}

export interface Technology {
  _key: string;
  _ref: string;
  _type: AssetType;
  _strengthenOnPublish?: StrengthenOnPublish;
  _weak?: boolean;
}

export interface StrengthenOnPublish {
  template: Template;
  type: string;
}

export interface Template {
  id: string;
}

export interface Skill {
  image: Image;
  progress: number | null;
  title: string;
}

export interface Social {
  title: string;
  url: string;
}
