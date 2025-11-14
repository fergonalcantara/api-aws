const { sequelize } = require('../config/database');

// Importamos todos los modelos
const Usuario = require('./usuario.model');
const Rol = require('./rol.model');
const Permiso = require('./permiso.model');
const UsuarioRol = require('./usuario-rol.model');
const RolPermiso = require('./rol-permiso.model');
const Facultad = require('./facultad.model');
const Carrera = require('./carrera.model');
const Estudiante = require('./estudiante.model');
const Profesor = require('./profesor.model');
const Curso = require('./curso.model');
const Seccion = require('./seccion.model');
const Inscripcion = require('./inscripcion.model');
const Asignacion = require('./asignacion.model');
const Calificacion = require('./calificacion.model');
const Asistencia = require('./asistencia.model');
const PagoColegiatura = require('./pago-colegiatura.model');
const Pensum = require('./pensum.model');
const HistorialAcademico = require('./historial-academico.model');

// ====================================
// ASOCIACIONES (RELACIONES)
// ====================================

// Usuario - Rol (Many-to-Many)
Usuario.belongsToMany(Rol, { through: UsuarioRol, foreignKey: 'usuario_id', as: 'roles' });
Rol.belongsToMany(Usuario, { through: UsuarioRol, foreignKey: 'rol_id', as: 'usuarios' });

// Rol - Permiso (Many-to-Many)
Rol.belongsToMany(Permiso, { through: RolPermiso, foreignKey: 'rol_id', as: 'permisos' });
Permiso.belongsToMany(Rol, { through: RolPermiso, foreignKey: 'permiso_id', as: 'roles' });

// Facultad - Carrera
Facultad.hasMany(Carrera, { foreignKey: 'facultad_id', as: 'carreras' });
Carrera.belongsTo(Facultad, { foreignKey: 'facultad_id', as: 'facultad' });

// Carrera - Estudiante
Carrera.hasMany(Estudiante, { foreignKey: 'carrera_id', as: 'estudiantes' });
Estudiante.belongsTo(Carrera, { foreignKey: 'carrera_id', as: 'carrera' });

// Usuario - Estudiante
Usuario.hasOne(Estudiante, { foreignKey: 'usuario_id', as: 'estudiante' });
Estudiante.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

// Usuario - Profesor
Usuario.hasOne(Profesor, { foreignKey: 'usuario_id', as: 'profesor' });
Profesor.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

// Carrera - Curso
Carrera.hasMany(Curso, { foreignKey: 'carrera_id', as: 'cursos' });
Curso.belongsTo(Carrera, { foreignKey: 'carrera_id', as: 'carrera' });

// Curso - Seccion
Curso.hasMany(Seccion, { foreignKey: 'curso_id', as: 'secciones' });
Seccion.belongsTo(Curso, { foreignKey: 'curso_id', as: 'curso' });

// Profesor - Seccion
Profesor.hasMany(Seccion, { foreignKey: 'profesor_id', as: 'secciones' });
Seccion.belongsTo(Profesor, { foreignKey: 'profesor_id', as: 'profesor' });

// Estudiante - Inscripcion
Estudiante.hasMany(Inscripcion, { foreignKey: 'estudiante_id', as: 'inscripciones' });
Inscripcion.belongsTo(Estudiante, { foreignKey: 'estudiante_id', as: 'estudiante' });

// Seccion - Inscripcion
Seccion.hasMany(Inscripcion, { foreignKey: 'seccion_id', as: 'inscripciones' });
Inscripcion.belongsTo(Seccion, { foreignKey: 'seccion_id', as: 'seccion' });

// Seccion - Asignacion
Seccion.hasMany(Asignacion, { foreignKey: 'seccion_id', as: 'asignaciones' });
Asignacion.belongsTo(Seccion, { foreignKey: 'seccion_id', as: 'seccion' });

// Inscripcion - Calificacion
Inscripcion.hasMany(Calificacion, { foreignKey: 'inscripcion_id', as: 'calificaciones' });
Calificacion.belongsTo(Inscripcion, { foreignKey: 'inscripcion_id', as: 'inscripcion' });

// Asignacion - Calificacion
Asignacion.hasMany(Calificacion, { foreignKey: 'asignacion_id', as: 'calificaciones' });
Calificacion.belongsTo(Asignacion, { foreignKey: 'asignacion_id', as: 'asignacion' });

// Inscripcion - Asistencia
Inscripcion.hasMany(Asistencia, { foreignKey: 'inscripcion_id', as: 'asistencias' });
Asistencia.belongsTo(Inscripcion, { foreignKey: 'inscripcion_id', as: 'inscripcion' });

// Estudiante - PagoColegiatura
Estudiante.hasMany(PagoColegiatura, { foreignKey: 'estudiante_id', as: 'pagos' });
PagoColegiatura.belongsTo(Estudiante, { foreignKey: 'estudiante_id', as: 'estudiante' });

// Carrera - Pensum
Carrera.hasMany(Pensum, { foreignKey: 'carrera_id', as: 'pensum' });
Pensum.belongsTo(Carrera, { foreignKey: 'carrera_id', as: 'carrera' });

// Curso - Pensum
Curso.hasMany(Pensum, { foreignKey: 'curso_id', as: 'pensum' });
Pensum.belongsTo(Curso, { foreignKey: 'curso_id', as: 'curso' });

// Estudiante - HistorialAcademico
Estudiante.hasMany(HistorialAcademico, { foreignKey: 'estudiante_id', as: 'historiales' });
HistorialAcademico.belongsTo(Estudiante, { foreignKey: 'estudiante_id', as: 'estudiante' });

// ====================================
// EXPORTAMOS TODOS LOS MODELOS
// ====================================
module.exports = {
  sequelize,
  Usuario,
  Rol,
  Permiso,
  UsuarioRol,
  RolPermiso,
  Facultad,
  Carrera,
  Estudiante,
  Profesor,
  Curso,
  Seccion,
  Inscripcion,
  Asignacion,
  Calificacion,
  Asistencia,
  PagoColegiatura,
  Pensum,
  HistorialAcademico
};