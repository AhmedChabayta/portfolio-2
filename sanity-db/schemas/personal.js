export default {
  name: 'personal',
  title: 'Personal',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'image',
    },
    {
      name: 'metaImage',
      title: 'Meta Image',
      type: 'image',
    },
    {
      name: 'socials',
      title: 'Socials',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'social' },
        },
      ],
    },
    {
      name: 'project',
      title: 'Project',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'project' },
        },
      ],
    },
  ],
};
