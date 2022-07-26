/* eslint-disable no-underscore-dangle */
const {
  getAllPatients,
  createNewPatient,
  getPatientById,
  deletePatient,
  getListAppointmentsByPatientId,
  updatePatient,
} = require('../services/patient.service');
const { getListPatientsByUserId } = require('../services/user.service');

const getAllPatientHandler = async (req, res, next) => {
  try {
    const patients = await getAllPatients();
    res.status(200).json({
      data: patients,
      status: 'OK',
    });
  } catch (error) {
    next(error);
  }
};

const createPatientToUserHandler = async (req, res, next) => {
  try {
    const patient = req.body;
    const { id } = req.user;

    const newPatient = await createNewPatient(id, patient);
    res.status(200).json({
      data: newPatient,
      status: 'OK',
    });
  } catch (error) {
    next(error);
  }
};

const editPatientToUserHandler = async (req, res, next) => {
  try {
    const patient = req.body;
    const { id } = req.params;

    const newPatient = await updatePatient(id, patient);
    res.status(200).json({
      data: newPatient,
      status: 'OK',
    });
  } catch (error) {
    next(error);
  }
};

const getPatientByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patient = await getPatientById(id);
    res.status(200).json({
      data: patient,
      status: 'OK',
    });
  } catch (error) {
    next(error);
  }
};

const deletePatientHandler = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await deletePatient(userId);
    res.status(200).json({ msg: 'Appointment deleted' });
  } catch (error) {
    next(error);
  }
};

const getAllAppointmentsByPatientHandler = async (req, res, next) => {
  try {
    const patientId = req.params.id;
    const appointments = await getListAppointmentsByPatientId(patientId);
    res.status(200).json({
      data: appointments,
      status: 'OK',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to return all patients by user id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAllPatientsByUserIdHandler = async (req, res, next) => {
  try {
    const { id } = req.user;
    const patients = await getListPatientsByUserId(id);
    res.status(200).json({
      data: patients,
      status: 'OK',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPatientHandler,
  createPatientToUserHandler,
  getPatientByIdHandler,
  deletePatientHandler,
  getAllAppointmentsByPatientHandler,
  editPatientToUserHandler,
  getAllPatientsByUserIdHandler,
};
