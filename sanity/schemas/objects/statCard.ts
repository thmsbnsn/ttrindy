// sanity/schemas/objects/statCard.ts
import { defineType } from 'sanity'

/**
 * OBJECT TYPE: Stat Card
 * Statistics/numbers display (e.g., "15+ Years Experience")
 */
export default defineType({
  name: 'statCard',
  title: 'Statistic Card',
  type: 'object',
  fields: [
    {
      name: 'number',
      title: 'Number/Statistic',
      type: 'string',
      description: 'e.g., "15+", "1000+", "100%", "24/7"',
      validation: (Rule) => Rule.required().max(20),
    },
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'e.g., "Years Experience", "Projects Completed"',
      validation: (Rule) => Rule.required().max(50),
    },
  ],
  preview: {
    select: {
      number: 'number',
      label: 'label',
    },
    prepare({ number, label }) {
      return {
        title: `${number} ${label}`,
      }
    },
  },
})

