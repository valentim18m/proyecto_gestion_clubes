const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const pool = require("./db/db");
const app = express();

app.use(cors());
app.use(express.json());

// ==========================================
// 1. RUTAS DE USUARIOS (AUTENTICACIÓN)
// ==========================================

// Registro de nuevos usuarios/socios
app.post("/api/registro", async (req, res) => {
  const { nombre, email, password, rol } = req.body;
  // Si no se envía un rol, por defecto es 'usuario'
  const usuarioRol = rol || "usuario";

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // CORRECCIÓN: Agregamos el campo 'rol' al INSERT
    const query =
      "INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)";
    await pool.query(query, [nombre, email, hashedPassword, usuarioRol]);

    res.status(201).json({ mensaje: "Usuario registrado con éxito" });
  } catch (err) {
    console.error("Error en registro:", err.message);
    res
      .status(500)
      .json({ error: "Error al registrar: el email ya podría existir" });
  }
});

// Inicio de sesión
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

    // Firmamos el token con el ID y el Rol
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET || "clave_secreta_provisoria",
      { expiresIn: "2h" },
    );

    res.json({
      mensaje: "¡Bienvenido al sistema del Club!",
      token,
      usuario: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        rol: usuario.rol, // Importante para el frontend
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 2. RUTA DEL MURO (INTERACCIÓN)
// ==========================================

// Obtener todos los comentarios con el nombre del autor
app.get("/api/comentarios", async (req, res) => {
  try {
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

// Publicar un comentario
app.post("/api/comentarios", async (req, res) => {
  const { id_usuario, texto } = req.body;
  try {
    const query = "INSERT INTO comentarios (id_usuario, texto) VALUES (?, ?)";
    await pool.query(query, [id_usuario, texto]);
    res.status(201).json({ mensaje: "Comentario publicado con éxito" });
  } catch (err) {
    console.error("❌ ERROR EN EL POST DE COMENTARIOS:", err);
    res.status(500).json({ error: "No se pudo guardar el comentario" });
  }
});

// Borrar un comentario (Admin puede todo, Socio solo el suyo)
app.delete("/api/comentarios/:id", async (req, res) => {
  const { id } = req.params; // ID del comentario a borrar
  const { rol, usuarioId } = req.query; // Rol e ID del que está logueado

  try {
    // 1. Primero buscamos el comentario para ver quién es el dueño
    const [rows] = await pool.query(
      "SELECT id_usuario FROM comentarios WHERE id = ?",
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ mensaje: "El comentario no existe" });
    }

    const dueñoId = rows[0].id_usuario;

    // 2. Aplicamos la lógica de permisos
    // ¿Es Admin? O ¿Es el mismo usuario que lo escribió?
    if (rol === "admin" || Number(usuarioId) === Number(dueñoId)) {
      await pool.query("DELETE FROM comentarios WHERE id = ?", [id]);
      return res.json({ mensaje: "Comentario eliminado correctamente" });
    } else {
      // Si no es ninguno de los dos, le denegamos el acceso
      return res.status(403).json({
        mensaje: "No tenés permiso para borrar este comentario",
      });
    }
  } catch (err) {
    console.error("Error al eliminar comentario:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// ==========================================
// 3. RUTAS DEL CLUB (GESTIÓN DE SOCIOS)
// ==========================================

// Traer la lista de socios
app.get("/api/socios", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM socios ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "No se pudo obtener la lista de socios" });
  }
});

// Agregar un socio nuevo
app.post("/api/socios", async (req, res) => {
  const { nombre, apellido, dni, categoria } = req.body;
  const query =
    "INSERT INTO socios (nombre, apellido, dni, categoria) VALUES (?, ?, ?, ?)";
  try {
    await pool.query(query, [nombre, apellido, dni, categoria]);
    res.status(201).json({ mensaje: "Socio agregado" });
  } catch (err) {
    console.error("Error al agregar socio:", err.message);
    res.status(500).json({ error: "Error: El DNI podría estar duplicado" });
  }
});

// Eliminar un socio (PROTEGIDO POR ROL)
app.delete("/api/socios/:id", async (req, res) => {
  const { id } = req.params;
  const { rol } = req.query; // Recibimos el rol desde el frontend

  // SEGURIDAD: Solo el admin puede borrar socios
  if (rol !== "admin") {
    return res
      .status(403)
      .json({ mensaje: "Acceso denegado: Se requiere rol de administrador" });
  }

  try {
    const [result] = await pool.query("DELETE FROM socios WHERE id = ?", [id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ mensaje: "Socio no encontrado" });
    res.json({ mensaje: "Socio eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al intentar borrar el socio" });
  }
});
// --- 4. RUTAS DE PARTIDOS Y RESULTADOS ---

// Obtener todos los partidos (Para socios y admin)
app.get("/api/partidos", async (req, res) => {
  try {
    // Los traemos ordenados por fecha, los más recientes primero
    const query = "SELECT * FROM partidos ORDER BY fecha DESC";
    const [rows] = await pool.query(query);
    res.json(rows);
  } catch (err) {
    console.error("❌ ERROR AL TRAER PARTIDOS:", err.message);
    res.status(500).json({ error: "No se pudo obtener la lista de partidos" });
  }
});

// Cargar un nuevo partido o resultado (SOLO ADMIN)
app.post("/api/partidos", async (req, res) => {
  const {
    equipo_local,
    equipo_visitante,
    goles_local,
    goles_visitante,
    fecha,
    categoria,
    estado,
  } = req.body;
  const { rol } = req.query; // Recibimos el rol desde el frontend

  // 🛡️ SEGURIDAD: Solo el admin carga resultados
  if (rol !== "admin") {
    return res
      .status(403)
      .json({ mensaje: "Acceso denegado: Se requiere rol de administrador" });
  }

  // Validación básica de campos
  if (!equipo_local || !equipo_visitante || !fecha) {
    return res
      .status(400)
      .json({ mensaje: "Faltan datos obligatorios (Equipos o Fecha)" });
  }

  try {
    const query = `
      INSERT INTO partidos (equipo_local, equipo_visitante, goles_local, goles_visitante, fecha, categoria, estado) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.query(query, [
      equipo_local,
      equipo_visitante,
      goles_local || 0,
      goles_visitante || 0,
      fecha,
      categoria || "Primera",
      estado || "programado",
    ]);

    res
      .status(201)
      .json({ mensaje: "Partido/Resultado cargado correctamente" });
  } catch (err) {
    console.error("❌ ERROR AL INSERTAR PARTIDO:", err.message);
    res.status(500).json({ error: "Error interno al guardar el partido" });
  }
});

// Eliminar un partido (SOLO ADMIN)
app.delete("/api/partidos/:id", async (req, res) => {
  const { id } = req.params;
  const { rol } = req.query;

  if (rol !== "admin") {
    return res
      .status(403)
      .json({ mensaje: "No tenés permiso para eliminar partidos" });
  }

  try {
    const [result] = await pool.query("DELETE FROM partidos WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "El partido no existe" });
    }
    res.json({ mensaje: "Partido eliminado correctamente" });
  } catch (err) {
    console.error("❌ ERROR AL ELIMINAR PARTIDO:", err.message);
    res.status(500).json({ error: "No se pudo eliminar el partido" });
  }
});

// Configuración del puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
