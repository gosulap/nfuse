import { loginWithMetaMask } from "../providers/Web3Provider";

function Login() {
    return (
        <div>
            <button id="login-button" onClick={async () => { await loginWithMetaMask() }}>Login</button>
        </div>
    )
}

export default Login;