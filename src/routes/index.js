const express = require('express');
const router = express.Router();

// Importar todas las rutas
const authRoutes = require('./auth.routes');
const facultadRoutes = require('./facultad.routes');
const carreraRoutes = require('./carrera.routes');
const estudianteRoutes = require('./estudiante.routes');
const profesorRoutes = require('./profesor.routes');
const cursoRoutes = require('./curso.routes');
const seccionRoutes = require('./seccion.routes');
const inscripcionRoutes = require('./inscripcion.routes');
const asignacionRoutes = require('./asignacion.routes');
const calificacionRoutes = require('./calificacion.routes');
const asistenciaRoutes = require('./asistencia.routes');
const rolRoutes = require('./rol.routes');
const permisoRoutes = require('./permiso.routes');
const pagoColegiaturaRoutes = require('./pago-colegiatura.routes');
const pensumRoutes = require('./pensum.routes');
const historialAcademicoRoutes = require('./historial-academico.routes');

// Montar rutas
router.use('/auth', authRoutes);
router.use('/facultades', facultadRoutes);
router.use('/carreras', carreraRoutes);
router.use('/estudiantes', estudianteRoutes);
router.use('/profesores', profesorRoutes);
router.use('/cursos', cursoRoutes);
router.use('/secciones', seccionRoutes);
router.use('/inscripciones', inscripcionRoutes);
router.use('/asignaciones', asignacionRoutes);
router.use('/calificaciones', calificacionRoutes);
router.use('/asistencias', asistenciaRoutes);
router.use('/roles', rolRoutes);
router.use('/permisos', permisoRoutes);
router.use('/pagos-colegiatura', pagoColegiaturaRoutes);
router.use('/pensum', pensumRoutes);
router.use('/historial-academico', historialAcademicoRoutes);

module.exports = router;