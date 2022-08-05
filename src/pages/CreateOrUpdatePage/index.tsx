import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { ITask } from "../../services/type";
import "./index.css";

const CreateOrUpdatePage = () => {
  //Configurações básicas
  const [model, setModel] = useState<ITask>({
    nome: "",
    responsavel: "",
    email: "",
    descricao: "",
  });
  const { id } = useParams();
  useEffect(() => {
    if (id !== undefined) {
      findEmp(id!);
    }
  }, [id]);

  //Configuração MultiStep
  const [passo, setPasso] = useState(0);
  const steps = [
    {
      id: "INICIAL",
      title: "Dados iniciais",
    },
    {
      id: "FINAL",
      title: "Dados de contato",
    },
  ];
  const [formValues, setFormValues] = useState<ITask>({
    nome: "",
    descricao: "",
    responsavel: "",
    email: "",
  });
  function handleNext() {
    setPasso((prevState) => prevState + 1);
  }

  //Configuração para Edição
  async function findEmp(id: string) {
    const response = await api.get(`/${id}`);
    setModel({
      nome: response.data.nome,
      responsavel: response.data.responsavel,
      email: response.data.email,
      descricao: response.data.descricao,
    });
  }
  function updateModel(e: ChangeEvent<HTMLInputElement>) {
    setModel({
      ...model,
      [e.target.name]: e.target.value,
    });
  }

  //Configuração de botão
  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id !== undefined) {
      const res = await api.put(`/${id}`, model);
    } else {
      const response = await api.post("/", model);
    }
    back();
  }

  //Configuração para retorno a página principal
  const voltar = useNavigate();
  function back() {
    voltar("/");
  }

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg ">
        <img
          src="https://www.freeiconspng.com/thumbs/mechanism-icon-png/machinery-mechanical-mechanism-technology-icon-2.png"
          alt="emp-logo"
          className="img-header"
        />
        <h2 className="name-header">Enterprise Inc.</h2>
      </nav>
      <br />
      <div className="header">
        <h1></h1>
        <h1>Formulário</h1>
        <button className="button-back" onClick={back}>Voltar</button>
      </div>
      <br />
      <form className="steps-form" onSubmit={onSubmit}>
        <div className="steps-name">
          <p>{steps[passo].title}</p>
          {steps[passo].id === "INICIAL" && (
            <div className="form-inicial">
              <div className="field">
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome da empresa"
                  value={model.nome}
                  onChange={updateModel}
                />
              </div>
              <div className="field">
                <input
                  type="text"
                  name="descricao"
                  placeholder="Descrição de serviços"
                  value={model.descricao}
                  onChange={updateModel}
                />
              </div>
            </div>
          )}
          {steps[passo].id === "FINAL" && (
            <div className="form-">
              <div className="field">
                <input
                  type="text"
                  name="email"
                  placeholder="Email de contato"
                  value={model.email}
                  onChange={updateModel}
                />
              </div>
              <div className="field">
                <input
                  type="text"
                  name="responsavel"
                  placeholder="Responsável pelo contato"
                  value={model.responsavel}
                  onChange={updateModel}
                />
              </div>
            </div>
          )}
        </div>
        {passo < steps.length - 1 && (
          <button className="button next" onClick={handleNext}>
            Próximo
          </button>
        )}
        {passo === steps.length - 1 && 
        <button className="button finish" type="submit"> Cadastrar </button>}
      </form>
    </div>
  );
};

export default CreateOrUpdatePage;
