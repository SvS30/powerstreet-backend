import React from 'react';
import './App.css';

function App() {

  const [loginData, setLoginData] = React.useState({
    usuario: '',
    password: ''
  })

  const handleSubmit = async () => {
    await fetch(`${process.env.REACT_APP_LOGIN_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    }).then((response) => response.json())
      .then((res) => {
        if (res.status === 'OK') {
          alert(`Login ${res.status}`);
        } else { alert(`Login ${res.status}`); console.log(res) }
      })
      .catch((error) => { alert('Server error'); console.log(error) })
  }

  return (
    <div className="login-container">
      <div className="title">
        Login
      </div>
      <div className='fluid-input'>
        <div className="fluid-input-holder">
          <input
            className="fluid-input-input"
            type="text"
            id="usuario"
            name="usuario"
            data-testid="usuario-input"
            value={loginData.usuario}
            onChange={(event) => { setLoginData({ ...loginData, usuario: event.target.value }) }}
            autoComplete="off"
            placeholder='Usuario'
          />
        </div>
      </div>
      <div className='fluid-input' style={{ 'margin': '20px 0'}}>
        <div className="fluid-input-holder">
          <input
            className="fluid-input-input"
            type="password"
            id="pass"
            name="pass"
            data-testid="password-input"
            value={loginData.password}
            onChange={(event) => { setLoginData({ ...loginData, password: event.target.value }) }}
            autoComplete="off"
            placeholder='Password'
          />
        </div>
      </div>
      <div className={`button login-button`} onClick={handleSubmit}>
        Login
      </div>
    </div>
  );
}

export default App;
