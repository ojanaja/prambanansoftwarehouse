import { project } from './project'
import { service } from './service'
import { testimonial } from './testimonial'
import { product } from './product'
import author from './author'
import category from './category'
import blockContent from './blockContent'
import post from './post'

export const schema = {
    types: [project, service, testimonial, product, author, category, blockContent, post],
}
