const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");

// crear servidor
const app = express();

// habilitar cors
const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    const existe = whitelist.some((dominio) => dominio === origin);
    if (existe) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};

//app.use(cors(corsOptions));
app.use(cors());

// conectar a mongodb
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/clinica", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// habilitar routing
app.use("/", routes());

// puerto y arrancar servidor
app.listen(4000, () => {
  console.log("Servidor funcionando");
});
