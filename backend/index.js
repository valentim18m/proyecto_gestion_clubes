const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs"); // Para el hashing de contraseñas
require("dotenv").config();

const app = express();

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json()); // Esto sanitiza la entrada básica de datos [cite: 45]

// --- CONEXIÓN A MYSQL ---
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ Base de datos conectada (MySQL)");
});

// --- RUTAS (SISTEMA DE GESTIÓN DE USUARIOS) [cite: 24] ---

// Registro con hashing de contraseña [cite: 25, 46]
app.post("/api/registro", async (req, res) => {
  const { nombre, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const query =
    "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";
  db.query(query, [nombre, email, hashedPassword], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ mensaje: "Usuario registrado con éxito" });
  });
});

// --- RUTAS DEL CLUB (CRUD) [cite: 14, 30] ---

// Listado de socios (Leer)
app.get("/api/socios", (req, res) => {
  db.query("SELECT * FROM socios", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Alta de socio (Crear)
app.post("/api/socios", (req, res) => {
  const { nombre, apellido, dni, categoria } = req.body;
  const query =
    "INSERT INTO socios (nombre, apellido, dni, categoria) VALUES (?, ?, ?, ?)";
  db.query(query, [nombre, apellido, dni, categoria], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ mensaje: "Socio agregado" });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
