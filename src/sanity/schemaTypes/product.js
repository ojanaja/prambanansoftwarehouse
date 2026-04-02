export const product = {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'name_en',
            title: 'Product Name (English)',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'name_id',
            title: 'Product Name (Indonesian)',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'description_en',
            title: 'Description (English)',
            type: 'text',
        },
        {
            name: 'description_id',
            title: 'Description (Indonesian)',
            type: 'text',
        },
        {
            name: 'image1',
            title: 'Main Feature Image',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'image2',
            title: 'Hero / Dashboard Image',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'image3',
            title: 'Secondary Feature Image',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'order',
            title: 'Order',
            type: 'number',
        }
    ],
    preview: {
        select: {
            title: 'name_en',
            media: 'image2',
        },
    },
}
