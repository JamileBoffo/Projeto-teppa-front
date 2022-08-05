import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./index.css";
import { ITask } from "../../services/type";

const Home = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const history = useNavigate();

  const resultApi = async () => {
    const response = await api.get("/");
    setTasks(response.data);
  };

  useEffect(() => {
    resultApi();
  }, []);

  function newEmp() {
    history("/createorupdate");
  }

  function editEmp(id: string) {
    history(`/createorupdate/${id}`);
  }

  async function deleteEmp(id: string) {
    await api.delete(`/${id}`);
    resultApi();
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
        <h1></h1>
        <h2>Fornecedores cadastrados</h2>
        <button className="btn-add" onClick={newEmp}>
          {" "}
          Adicionar fornecedor
        </button>
      </div>
      <br />
      <table className="table striped bordered hover centered highlight responsive-table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome da Empresa</th>
            <th scope="col">Descrição</th>
            <th scope="col">Responsável</th>
            <th scope="col">Email</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.nome}</td>
              <td>{task.descricao}</td>
              <td>{task.responsavel}</td>
              <td>{task.email}</td>
              <td>
                <button className="btn-edit" onClick={() => editEmp(task.id!)}>
                   Editar 
                </button>{" "}
                <button
                  className="btn-delete"
                  onClick={() => deleteEmp(task.id!)}
                >
                   Excluir 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
