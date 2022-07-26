/* eslint-disable no-underscore-dangle */
const Patient = require('../models/patient.model');
const { addNewPatientToUser } = require('./user.service');

/**
 *Esta funcion creara un paciente y lo agregara a su respectivo usuario por el id proporcionado
 * @param {String} userId Id del usuario al que pertenece el paciente
 * @param {Object} patient Nuevo paciente que sera creado
 * @returns Nuevo paciente creado
 */
async function createNewPatient(userId, patient) {
  // let newPatient = await Patient.findOne({ numberHC: patient.numberHC }) || null;
  // if (newPatient !== null) {
  //   throw new Error('The patient already exists');
  // }
  const newPatient = new Patient(patient);
  await newPatient.save();
  await addNewPatientToUser(userId, newPatient.id);

  return newPatient;
}

async function getPatientById(id) {
  const patient = await Patient.findById(id);
  if (!patient) {
    return {
      msg: 'Not found',
    };
  }
  return patient;
}

async function updatePatient(id, patient) {
  const newPatient = await Patient.findByIdAndUpdate(id, patient, { new: true });
  return newPatient;
}

async function getAllPatients() {
  const patients = await Patient.find({}).sort({ date: -1 });
  return patients;
}

async function deletePatient(id) {
  const appointmentToDelete = await Patient.findByIdAndUpdate(
    id,
    { $set: { state: 0 } },
    { new: true },
  );
  return appointmentToDelete;
}

async function addNewAppointmentToPatient(patientId, appointmentId) {
  const updatedPatient = await Patient
    .findByIdAndUpdate(patientId, { $push: { appointments: appointmentId } }, { new: true });
  return updatedPatient;
}

async function getListAppointmentsByPatientId(patientId) {
  const patient = await Patient.findById(patientId).populate('appointments');
  return patient.appointments;
}

module.exports = {
  updatePatient,
  createNewPatient,
  getPatientById,
  getAllPatients,
  deletePatient,
  addNewAppointmentToPatient,
  getListAppointmentsByPatientId,
};
