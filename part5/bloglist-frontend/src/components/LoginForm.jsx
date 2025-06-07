import PropTypes from 'prop-types' // Para hacer que las propiedades sean requeridas

export const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleLogin}>
      <div>
        username
        <input
          type="text"
          value={props.username}
          name="Username"
          onChange={props.handleUsername}
          data-testid='username'
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={props.password}
          name="Password"
          onChange={props.handlePassword}
          data-testid='password'
        />
      </div>
      <button type="submit" data-testid='button_login'>login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
