// backend/index.js
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Importamos el pool que creamos en la carpetita db
const pool = require("./db/db");

const app = express();

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json());

// --- RUTAS DE USUARIOS ---

// Registro con hashing
app.post("/api/registro", async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query =
      "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";
    // Usamos await con el pool
    await pool.query(query, [nombre, email, hashedPassword]);

    res.status(201).json({ mensaje: "Usuario registrado con éxito" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- RUTAS DEL CLUB (CRUD) ---

// Listado de socios (Leer)
app.get("/api/socios", async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM socios");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Alta de socio (Crear)
app.post("/api/socios", async (req, res) => {
  const { nombre, apellido, dni, categoria } = req.body;
  const query =
    "INSERT INTO socios (nombre, apellido, dni, categoria) VALUES (?, ?, ?, ?)";
  try {
    await pool.query(query, [nombre, apellido, dni, categoria]);
    res.json({ mensaje: "Socio agregado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ... (lo que ya tenés arriba de Registro e Inicio de socios)

// Alta de socio (Crear)
app.post("/api/socios", async (req, res) => {
  const { nombre, apellido, dni, categoria } = req.body;
  const query =
    "INSERT INTO socios (nombre, apellido, dni, categoria) VALUES (?, ?, ?, ?)";
  try {
    await pool.query(query, [nombre, apellido, dni, categoria]);
    res.json({ mensaje: "Socio agregado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- NUEVA RUTA: Borrar socio (Eliminar) ---
app.delete("/api/socios/:id", async (req, res) => {
  const { id } = req.params; // Tomamos el ID que viene en la URL
  try {
    await pool.query("DELETE FROM socios WHERE id = ?", [id]);
    res.json({ mensaje: "Socio eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- FIN DE RUTAS DEL CLUB ---

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
