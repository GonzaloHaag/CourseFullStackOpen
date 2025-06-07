import { useState } from 'react'
import blogService from '../services/blogs'
import { ButtonLike } from './ButtonLike'
const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes,setLikes] = useState(blog.likes) // estado inicial
  console.log(blog)
  const handleLike = async () => {
    try {
      const updatedBlog = {
        user: blog.user.id,
        likes: likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }
      const response = await blogService.updateBlog(blog.id, updatedBlog)
      setLikes(response.likes) // actualizamos localmente
    } catch (error) {
      console.error('Error al dar like:', error)
    }
  }

  const deleteBlog = async () => {
    if(window.confirm(`Remove blog You're NOT gonna need it! by ${ blog.author }`)) {
      blogService.deleteBlog( blog.id )
    }
  }
  return (
    <div>
      <div className='blog' data-testid="blog" style={{ marginBottom:'10px' }}>
        {blog.title} - {blog.author}
        <button type="button" data-testid="view" onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'Hide' : 'View'}
        </button>
      </div>
      {showDetails && (
        <div style={{ display:'flex',flexDirection:'column',gap:'0', border:'1px solid black',paddingInline:'1rem' }}>
          <p>{ blog.url }</p>
          <div style={{ display:'flex',alignItems:'center',gap:'10px' }}>
            <p data-testid="likes_text">likes { likes }</p>
            <ButtonLike handleLike={ handleLike } />
          </div>
          <button data-testid="delete_blog_button" onClick={ deleteBlog } style={{ maxWidth:'200px', background:'red',color:'white' }} type='button'>Remove</button>
        </div>
      )}
    </div>
  )
}

export default Blog