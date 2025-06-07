export const FormNewBlog = ( props ) => {
  return (
    <form onSubmit={props.createNewBlog} data-testid="form-blog">
      <div>
        <label>Title</label>
        <input value={props.titleBlog} onChange={props.handleTitleBlog} placeholder="Titulo del blog" data-testid="title" type='text' />
      </div>
      <div>
        <label>Author</label>
        <input value={props.authorBlog} onChange={props.handleAuthorBlog} placeholder="Author del blog" data-testid="author" type='text' />
      </div>
      <div>
        <label>Url</label>
        <input value={props.urlBlog} onChange={props.handleUrlBlog} placeholder="Url del blog" data-testid="url" type='text' />
      </div>
      <button data-testid="create-blog" type='submit'>Create</button>
    </form>
  )
}
