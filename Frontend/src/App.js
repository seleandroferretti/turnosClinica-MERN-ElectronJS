import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import clienteAxios from "./config/axios";

// componentes
import Pacientes from "./components/Paciente";
import NuevoTurno from "./components/NuevoTurno";
import Turno from "./components/Turno";

function App() {
  // state de la app
  const [turnos, guardarTurnos] = useState([]);
  const [consultar, guardarConsultar] = useState(true);

  useEffect(() => {
    if (consultar) {
      const consultarAPI = () => {
        clienteAxios
          .get("/pacientes")
          .then((respuesta) => {
            guardarTurnos(respuesta.data);

            // deshabilitar la consulta
            guardarConsultar(false);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      consultarAPI();
    }
  }, [consultar]); //cuando cambie, que se ejecute de nuevo

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Pacientes turnos={turnos} />} />
        <Route
          exact
          path="/nuevo"
          component={() => <NuevoTurno guardarConsultar={guardarConsultar} />}
        />
        <Route
          exact
          path="/turno/:id"
          render={(props) => {
            const turno = turnos.filter(
              (turno) => turno._id === props.match.params.id
            );

            return (
              <Turno turno={turno[0]} guardarConsultar={guardarConsultar} />
            );
          }}
        />
      </Switch>
    </Router>
  );
}

export default App;
