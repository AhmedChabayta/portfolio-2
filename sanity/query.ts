import { groq } from 'next-sanity';
export const query = groq`
*[_type=="personal"]{
  name,
  email,
  address,
  images,
  phoneNumber,
  title,
  "project": *[_type=='project']{
  description,
  image,
  linkToBuild,
  technologies,
  title,
},
  "skill": *[_type=='skill']{
  image,
  progress,
  title
  ,},
  "social": *[_type=='social']{
  title, url}
}
`;
