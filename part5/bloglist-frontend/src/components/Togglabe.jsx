import { forwardRef, useState, useImperativeHandle  } from 'react'


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
        <button data-testid="toggle-blog-form" onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>{props.buttonLabelHide}</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable