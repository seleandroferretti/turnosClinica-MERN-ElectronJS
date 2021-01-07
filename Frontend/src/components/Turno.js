import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

const Turno = (props) => {
  if (!props.turno) {
    props.history.push("/");
    return null;
  }

  // extraer por props
  const {
    turno: { _id, nombre, doctor, fecha, hora, telefono, sintomas },
  } = props;

  // elimina un registro
  const eliminarTurno = (id) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Un turno eliminado no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        // Alerta de eliminado
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        // Eliminado de la base de datos
        clienteAxios
          .delete(`/pacientes/${id}`)
          .then((respuesta) => {
            props.guardarConsultar(true);
            props.history.push("/");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <Fragment>
      <h1 className="my-5">Nombre del paciente: {nombre}</h1>

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
            <div className="list-group">
              <div className="p-5 list-group-item list-group-item-action flex-column align-items-center">
                <div className="d-flex w-100 justify-content-between mb-4">
                  <h3 className="mb-3">{nombre}</h3>
                  <small className="fecha-alta">
                    {fecha} - {hora}
                  </small>
                </div>
                <p className="mb-0">
                  <span>Síntomas:</span> {sintomas}
                </p>
                <div className="contacto py-3">
                  <p>Teléfono del paciente: {telefono}</p>
                  <p>Doctor: {doctor}</p>
                </div>

                <div className="d-flex">
                  <button
                    type="button"
                    className="text-uppercase py-2 px-5 font-weight-bold btn btn-danger col"
                    onClick={() => eliminarTurno(_id)}
                  >
                    Eliminar &times;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(Turno);
