const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const pool = require("./db/db");
const app = express();

app.use(cors());
app.use(express.json());

// --- 1. RUTAS DE USUARIOS ---

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

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [results] = await pool.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email],
    );
    if (results.length === 0)
      return res.status(400).json({ mensaje: "Credenciales inválidas" });

    const usuario = results[0];
    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida)
      return res.status(400).json({ mensaje: "Credenciales inválidas" });

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET || "clave_secreta_provisoria",
      { expiresIn: "2h" },
    );

    res.json({
      mensaje: "¡Bienvenido al sistema del Club!",
      token,
      usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 2. RUTA DEL MURO (INTERACCIÓN) ---

// Esta ya la tenés (es para ver los mensajes)
// --- 2. RUTA DEL MURO (INTERACCIÓN) ---

app.get("/api/comentarios", async (req, res) => {
  try {
    // El c.id_usuario tiene que ir acá arriba, en el SELECT
    const query = `
      SELECT 
        c.id, 
        c.id_usuario, 
        c.texto, 
        c.fecha, 
        u.nombre AS nombre_usuario
      FROM comentarios c
      JOIN usuarios u ON c.id_usuario = u.id
      ORDER BY c.fecha DESC
    `;
    const [results] = await pool.query(query);
    res.json(results);
  } catch (err) {
    console.error("❌ ERROR EN EL GET DE COMENTARIOS:", err);
    res.status(500).json({ error: "Error al traer los comentarios" });
  }
});

app.post("/api/comentarios", async (req, res) => {
  const { id_usuario, texto } = req.body;
  try {
    const query = "INSERT INTO comentarios (id_usuario, texto) VALUES (?, ?)";
    await pool.query(query, [id_usuario, texto]);
    res.status(201).json({ mensaje: "Comentario publicado con éxito" });
  } catch (err) {
    console.error("❌ ERROR EN EL POST DE COMENTARIOS:", err); // <--- AGREGÁ ESTO
    res.status(500).json({ error: "No se pudo guardar el comentario" });
  }
});

// Borrar un comentario del muro
app.delete("/api/comentarios/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM comentarios WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "El comentario no existe" });
    }

    res.json({ mensaje: "Comentario eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar comentario:", err);
    res.status(500).json({ error: "No se pudo eliminar el comentario" });
  }
});

// --- 3. RUTAS DEL CLUB (CRUD SOCIOS) ---

app.get("/api/socios", async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM socios");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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

app.delete("/api/socios/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM socios WHERE id = ?", [id]);
    res.json({ mensaje: "Socio eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
