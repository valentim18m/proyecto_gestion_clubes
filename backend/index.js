const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // <-- 1. Importación necesaria
require("dotenv").config();

// Importamos el pool que creamos en la carpetita db
const pool = require("./db/db");

const app = express();

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json());

// --- RUTAS DE USUARIOS (SISTEMA DE GESTIÓN) ---

// Registro con hashing [cite: 46]
app.post("/api/registro", async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query =
      "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";
    await pool.query(query, [nombre, email, hashedPassword]);

    res.status(201).json({ mensaje: "Usuario registrado con éxito" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Inicio de Sesión (Login) [cite: 26]
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // 1. Buscamos al usuario por email [cite: 31]
    const [results] = await pool.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email],
    );

    if (results.length === 0) {
      return res.status(400).json({ mensaje: "Credenciales inválidas" });
    }

    const usuario = results[0];

    // 2. Comparamos la clave con el hash de la BD [cite: 46]
    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) {
      return res.status(400).json({ mensaje: "Credenciales inválidas" });
    }

    // 3. Generamos el Token de Sesión
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET || "clave_secreta_provisoria",
      { expiresIn: "2h" },
    );

    res.json({
      mensaje: "¡Bienvenido al sistema del Club!",
      token,
      usuario: { nombre: usuario.nombre, rol: usuario.rol },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- RUTAS DEL CLUB (CRUD) ---

// Listado de socios (Leer) [cite: 14]
app.get("/api/socios", async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM socios");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Alta de socio (Crear) [cite: 14]
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

// Borrar socio (Eliminar) [cite: 14]
app.delete("/api/socios/:id", async (req, res) => {
  const { id } = req.params;
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
