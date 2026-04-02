export const service = {
    name: 'service',
    title: 'Service',
    type: 'document',
    fields: [
        {
            name: 'title_en',
            title: 'Title (English)',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'title_id',
            title: 'Title (Indonesian)',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'description_en',
            title: 'Description (English)',
            type: 'text',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'description_id',
            title: 'Description (Indonesian)',
            type: 'text',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'icon',
            title: 'Icon Type (e.g. mobile, web, design)',
            type: 'string',
        },
        {
            name: 'order',
            title: 'Order',
            type: 'number',
        }
    ],
    preview: {
        select: {
            title: 'title_en',
            subtitle: 'title_id',
        },
    },
}
