const express = require("express");
const router = express.Router();
const pacienteController = require("../controllers/pacienteControllers");

module.exports = function () {
  // Agrega nuevos pacientes via POST
  router.post("/pacientes", pacienteController.nuevoCliente);

  // obtiene todos los registros de pacientes en la bd
  router.get("/pacientes", pacienteController.obtenerPacientes);

  // obtiene un paciente en especifico (id)
  router.get("/pacientes/:id", pacienteController.obtenerPaciente);

  // actualizar un registro con un id especifico
  router.put("/pacientes/:id", pacienteController.actualizarPaciente);

  // elimina un paciente por su id
  router.delete("/pacientes/:id", pacienteController.eliminarPaciente);

  return router;
};
