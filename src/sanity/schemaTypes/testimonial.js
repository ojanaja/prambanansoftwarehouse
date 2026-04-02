export const testimonial = {
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Client Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'role_en',
            title: 'Role/Company (English)',
            type: 'string',
        },
        {
            name: 'role_id',
            title: 'Role/Company (Indonesian)',
            type: 'string',
        },
        {
            name: 'content_en',
            title: 'Testimonial Content (English)',
            type: 'text',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'content_id',
            title: 'Testimonial Content (Indonesian)',
            type: 'text',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'image',
            title: 'Client Avatar',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'rating',
            title: 'Rating (1-5)',
            type: 'number',
            validation: (Rule) => Rule.min(1).max(5),
        }
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'role_en',
            media: 'image',
        },
    },
}
