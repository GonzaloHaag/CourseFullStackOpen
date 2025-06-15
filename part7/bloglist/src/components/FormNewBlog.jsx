import { TextField, Button, Stack } from '@mui/material'

export const FormNewBlog = ( props ) => {
  return (
    <form onSubmit={props.createNewBlog} data-testid="form-blog">
      <Stack spacing={2}>
        <TextField
          label="Title"
          value={props.titleBlog}
          onChange={props.handleTitleBlog}
          placeholder="Titulo del blog"
          data-testid="title"
          fullWidth
        />
        <TextField
          label="Author"
          value={props.authorBlog}
          onChange={props.handleAuthorBlog}
          placeholder="Author del blog"
          data-testid="author"
          fullWidth
        />
        <TextField
          label="Url"
          value={props.urlBlog}
          onChange={props.handleUrlBlog}
          placeholder="Url del blog"
          data-testid="url"
          fullWidth
        />
        <Button
          variant="contained"
          type="submit"
          data-testid="create-blog"
        >
          Create
        </Button>
      </Stack>
    </form>
  )
}
