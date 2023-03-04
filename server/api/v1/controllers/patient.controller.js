/* eslint-disable no-underscore-dangle */
const {
  getAllPatients,
  createNewPatient,
  getPatientById,
  deletePatient,
  getListAppointmentsByPatientId,
  updatePatient,
} = require('../services/patient.service');
const { createNewProlongedDiagnosis } = require('../services/prolongedDiagnosis.service');
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
    const { prolongedDiagnoses } = req.body;

    const formPatient = {
      dni: patient.dni,
      name: patient.name,
      lastname: patient.lastname,
      birthDate: patient.birthDate,
      gender: patient.gender,
      birthWeight: patient.birthWeight,
      childBirth: patient.childBirth,
      apgar: patient.apgar,
      supplementaryFeeding: patient.supplementaryFeeding,
      lactation: patient.lactation,
      gestation: patient.gestation,
      state: true,
      vaccines: [],
      prolongedDiagnoses: [],
    };

    const newPatient = await createNewPatient(id, formPatient);

    // *********************  Diagnosticos Prolongados  ******************************
    // *******************************************************************************

    // Creando los Diagnosticos Prolongados
    const promiseArrayProlongedDiagnoses = prolongedDiagnoses.map((prolongedDiagnosis) => {
      const newProlongedDiag = createNewProlongedDiagnosis(newPatient.id, prolongedDiagnosis);
      return newProlongedDiag;
    });

    await Promise.all(promiseArrayProlongedDiagnoses);

    const finalPatient = await getPatientById(newPatient);

    res.status(200).json({
      data: finalPatient,
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
    const userAuthenticated = req.user;

    const patients = await getListPatientsByUserId(userAuthenticated.id);
    if (patients.findIndex((x) => x.id === id) === -1) {
      throw Error('patient not found');
    }

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
