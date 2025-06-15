import { forwardRef, useState, useImperativeHandle  } from 'react'
import { Button } from '@mui/material'

const Togglable = forwardRef((props,refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button type='button' variant='contained' data-testid="toggle-blog-form" onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button type='button' variant='outlined' onClick={toggleVisibility} sx={{ marginTop:2 }}>{props.buttonLabelHide}</Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable