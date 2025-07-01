import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";
import { useEffect, useState } from "react";

const LoginForm = (props) => {
  const [username,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const [ loginUser,result ] = useMutation(LOGIN,{
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    }
  });

  useEffect(() => {
     if( result.data ) {
       const token = result.data.login.value;
       props.setToken(token);
       localStorage.setItem('user_token',token)
       props.setPage('add');
       props.setError(null);
     }
  },[ result.data ])

  const submit = async(event) => {
     event.preventDefault();
     loginUser({variables:{
         username,
         password
     }});
  }
  if(!props.show) {
    return null;
  }
  return (
    <form onSubmit={submit}>
      {
        props.error && (
          <span>{props.error}</span>
        )
      }
        <div>
            <label htmlFor="name">username</label>
            <input id="name" type="text" value={username} onChange={({target}) => setUserName(target.value)} />
        </div>
        <div>
            <label htmlFor="password">password</label>
            <input id="password" type="password" value={password} onChange={({target}) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
    </form>
  )
};
export default LoginForm;
