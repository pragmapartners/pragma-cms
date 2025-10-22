import type { Block } from 'payload'

export const CollectionStack: Block = {
  slug: 'collectionStack',
  interfaceName: 'CollectionStackBlock',
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'scale',
      options: [
        {
          label: 'Scale',
          value: 'scale',
        },
        {
          label: 'Bloom',
          value: 'bloom',
        },
      ],
    },
    {
      name: 'relationTo',
      type: 'select',
      defaultValue: 'case-studies',
      label: 'Collections To Show',
      options: [
        {
          label: 'Case Studies',
          value: 'case-studies',
        },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        step: 1,
      },
      defaultValue: 10,
      label: 'Limit',
    },
    
  ],
  labels: {
    plural: 'Collection Stacks',
    singular: 'Collection Stack',
  },
}
