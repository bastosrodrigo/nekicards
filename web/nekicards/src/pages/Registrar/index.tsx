import React from "react";

const Registrar = () => {
  return (
    <div className="container-login">
      <div className="box-login">
        <div className="content-esquerda">
          <img src={""} alt="" />
        </div>
        <div className="content-direita">
          <h3>Faça aqui seu login.</h3>
          <div className="login-form">
            <label htmlFor="email">Digite seu email</label>
            <input type="text" id="email" value={""} />

            <label htmlFor="senha">Digite sua senha</label>
            <input type="password" id="senha" value={""} />
            <button>ENTRAR</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registrar;
