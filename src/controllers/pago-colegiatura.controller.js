const { PagoColegiatura, Estudiante } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const pagos = await PagoColegiatura.findAll({
      include: [
        {
          model: Estudiante,
          as: 'estudiante',
          attributes: ['id', 'nombres', 'apellidos', 'codigo_estudiante']
        }
      ]
    });

    res.json({
      success: true,
      data: pagos
    });

  } catch (error) {
    console.error('Error en getAll:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener pagos',
      error: error.message
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const pago = await PagoColegiatura.findByPk(id, {
      include: [
        {
          model: Estudiante,
          as: 'estudiante'
        }
      ]
    });

    if (!pago) {
      return res.status(404).json({
        success: false,
        message: 'Pago no encontrado'
      });
    }

    res.json({
      success: true,
      data: pago
    });

  } catch (error) {
    console.error('Error en getById:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener pago',
      error: error.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    const {
      estudiante_id,
      ciclo_academico,
      monto,
      fecha_vencimiento,
      fecha_pago,
      metodo_pago,
      numero_recibo
    } = req.body;

    if (!estudiante_id || !ciclo_academico || !monto || !fecha_vencimiento) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos'
      });
    }

    const nuevoPago = await PagoColegiatura.create({
      estudiante_id,
      ciclo_academico,
      monto,
      fecha_vencimiento,
      fecha_pago,
      metodo_pago,
      numero_recibo,
      estado: fecha_pago ? 2 : 1 // 2:Pagado si tiene fecha, 1:Pendiente si no
    });

    res.status(201).json({
      success: true,
      message: 'Pago registrado exitosamente',
      data: nuevoPago
    });

  } catch (error) {
    console.error('Error en create:', error);
    res.status(500).json({
      success: false,
      message: 'Error al registrar pago',
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      fecha_pago,
      metodo_pago,
      numero_recibo,
      estado
    } = req.body;

    const pago = await PagoColegiatura.findByPk(id);

    if (!pago) {
      return res.status(404).json({
        success: false,
        message: 'Pago no encontrado'
      });
    }

    await pago.update({
      fecha_pago: fecha_pago !== undefined ? fecha_pago : pago.fecha_pago,
      metodo_pago: metodo_pago !== undefined ? metodo_pago : pago.metodo_pago,
      numero_recibo: numero_recibo !== undefined ? numero_recibo : pago.numero_recibo,
      estado: estado !== undefined ? estado : pago.estado
    });

    res.json({
      success: true,
      message: 'Pago actualizado exitosamente',
      data: pago
    });

  } catch (error) {
    console.error('Error en update:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar pago',
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const pago = await PagoColegiatura.findByPk(id);

    if (!pago) {
      return res.status(404).json({
        success: false,
        message: 'Pago no encontrado'
      });
    }

    await pago.destroy();

    res.json({
      success: true,
      message: 'Pago eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error en delete:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar pago',
      error: error.message
    });
  }
};