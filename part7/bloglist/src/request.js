import blogsService from './services/blogs'
import userService from './services/users'

export const getAllBlogs = () => {
  return blogsService.getAll()
}

export const getBlogById = (id) => {
  return blogsService.getBlogById( id )
}

export const createComment = (id,comment) => {
  return blogsService.createCommentBlog(id,comment)
}

export const getAllUsers = () => {
  return userService.getAll()
}
export const getUserById = (id) => {
  return userService.getUserById( id )
}