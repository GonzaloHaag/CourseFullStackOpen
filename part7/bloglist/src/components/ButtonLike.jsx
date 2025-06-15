import { Button } from '@mui/material'

export const ButtonLike = (props) => {
  return (
    <Button
      variant="outlined"
      size="small"
      data-testid="like_button"
      onClick={props.handleLike}
    >
      Like
    </Button>
  )
}
