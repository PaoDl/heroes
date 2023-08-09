import { useNavigate } from "react-router-dom"

export const LoginPage = () => {
  const navigate  = useNavigate(); // guarda el estado us naigate
  const onLogin = ():void =>{
      navigate('/', { replace: true})
  }
  return (
    <div className="container nt-5">
        <h1>Login</h1>
        <hr />
          <button className="btn btn-primary" onClick={onLogin}>
            Login
          </button>
        </div>
  )
}
