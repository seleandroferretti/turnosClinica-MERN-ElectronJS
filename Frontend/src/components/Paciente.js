import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Pacientes = ({ turnos }) => {
  if (turnos.length === 0) return null;
  return (
    <Fragment>
      <h1 className="my-5">Administrador de Pacientes</h1>

      <div className="container mt-5 py-5">
        <div className="row">
          <div className="col-12 mb-5 d-flex justify-content-center">
            <Link
              to={"/nuevo"}
              className="btn btn-info text-uppercase py-2 px-5 font-weight-bold"
            >
              Crear Turno
            </Link>
          </div>

          <div className="col-md-8 mx-auto">
            <div className="list-group">
              {turnos.map((turno) => (
                <Link
                  to={`/turno/${turno._id}`}
                  key={turno._id}
                  className="p-5 list-group-item list-group-item-action flex-column align-items-start"
                >
                  <div className="d-flex w-100 justify-content-between mb-4">
                    <h3 className="mb-3">{turno.nombre}</h3>
                    <small className="fecha-alta">
                      {turno.fecha} - {turno.hora}
                    </small>
                  </div>
                  <p className="mb-0">
                    <span>Síntomas:</span> {turno.sintomas}
                  </p>
                  <div className="contacto py-3">
                    <p>
                      <p>Teléfono del paciente: {turno.telefono}</p>
                    </p>
                    <p>Doctor: {turno.doctor}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Pacientes;
