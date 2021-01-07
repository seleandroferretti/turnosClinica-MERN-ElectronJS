import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";

import clienteAxios from "../config/axios";

const NuevoTurno = (props) => {
  // generar state como objeto
  const [turno, guardarTurno] = useState({
    nombre: "",
    doctor: "",
    fecha: "",
    hora: "",
    sintomas: "",
    telefono: "",
  });

  // leer datos del formulario
  const actualizarState = (e) => {
    guardarTurno({
      ...turno,
      [e.target.name]: e.target.value,
    });
  };

  // enviar una peticion a la restapi
  const crearNuevoTurno = (e) => {
    e.preventDefault();

    // enviar la peticion por axios
    clienteAxios.post("/pacientes", turno).then((respuesta) => {
      props.guardarConsultar(true);

      // redireccionar
      props.history.push("/");
    });
  };

  return (
    <Fragment>
      <h1 className="my-5">Crear nuevo Turno</h1>
      <div className="container mt-5 py-5">
        <div className="row">
          <div className="col-12 mb-5 d-flex justify-content-center">
            <Link
              to={"/"}
              className="btn btn-info text-uppercase py-2 px-5 font-weight-bold"
            >
              Volver
            </Link>
          </div>
          <div className="col-md-8 mx-auto">
            <form onSubmit={crearNuevoTurno} className="bg-white p-5 bordered">
              <div className="form-group">
                <label htmlFor="nombre">Nombre Paciente</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="nombre"
                  name="nombre"
                  placeholder="Nombre Paciente"
                  onChange={actualizarState}
                />
              </div>

              <div className="form-group">
                <label htmlFor="doctor">Nombre Doctor</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="doctor"
                  name="doctor"
                  placeholder="Nombre Doctor"
                  onChange={actualizarState}
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  type="tel"
                  className="form-control form-control-lg"
                  id="telefono"
                  name="telefono"
                  placeholder="Teléfono"
                  onChange={actualizarState}
                />
              </div>

              <div className="form-group">
                <label htmlFor="fecha">Fecha</label>
                <input
                  type="date"
                  className="form-control form-control-lg"
                  id="fecha"
                  name="fecha"
                  onChange={actualizarState}
                />
              </div>

              <div className="form-group">
                <label htmlFor="hora">Hora</label>
                <input
                  type="time"
                  className="form-control form-control-lg"
                  id="hora"
                  name="hora"
                  onChange={actualizarState}
                />
              </div>

              <div className="form-group">
                <label htmlFor="sintomas">Síntomas</label>
                <textarea
                  className="form-control"
                  name="sintomas"
                  rows="6"
                  onChange={actualizarState}
                ></textarea>
              </div>

              <input
                type="submit"
                className="btn btn-primary mt-3 w-100 p-3 text-uppercase font-weight-bold"
                value="Crear Turno"
              />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(NuevoTurno);
