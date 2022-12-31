const Student = require("../model/Student");
const crypto = require("crypto");
/**
 * Posee toda la lógica de negocio
 * necesaria para realizar el CRUD
 * de estudiantes
 */

/**
 * Método usado para actualizar un estudiante
 * a través de su identificación y devolver un json
 * con el mensaje student registered successfully
 * si se encuentra el estudiante ya cargado devuelve un json
 * con el mensaje "student already exists"
 * @param {*HttpRequest} req
 * @param {*HttpResponse} res
 */
const saveStudentService = async (firstname, lastname, subjects) => {
  try {
    const identification = crypto.randomUUID();
    await Student.create({
      identification,
      firstname,
      lastname,
      subjects,
    });
    return identification;
  } catch (error) {
    return "";
  }
};

/**
 * Método usado para actualizar un estudiante
 * a través de su identificación y devolver un json
 * con el mensaje student updated successfully
 * @param {*HttpRequest} req
 * @param {*HttpResponse} res
 */
const updateStudentService = async (identification, firstname, lastname, subjects) => {
  try {
    const result = await Student.updateOne(
      { identification: `${identification}` },
      {
        firstname,
        lastname,
        subjects,
      }
    );
    return result.modifiedCount;
  } catch (error) {
    return -1;
  }
};

/**
 * Método usado para eliminar un estudiante
 * a través de su identificación y devolver un json
 * con el mensaje student deleted successfully
 * si no se encuentra el estudiante devuelve un json
 * con el mensaje "student not found"
 * @param {*HttpRequest} req
 * @param {*HttpResponse} res
 */
const deleteStudentService = async (identification) => {
  try {
    const deleted = await Student.deleteOne({
      identification: `${identification}`,
    });
    return deleted.deletedCount;
  } catch (error) {
    return -1;
  }
};

/**
 * Método usado para buscar un estudiante
 * a través de su identificación y devolverlo en la
 * respuesta http por medio de un json excluyendo el _id y el __v
 * en la respuesta por medio de los métodos .select("-_id").select("-__v") línea 126
 * @param {*HttpRequest} req
 * @param {*HttpResponse} res
 */
const findOneStudentService = async (identification) => {
  try {
    const student = await Student.find({ identification })
      .select("-_id")
      .select("-__v");
    return student;
  } catch (error) {
    return false;
  }
};

/**
 * Método usado para buscar todos los estudiantes
 * registrados y devolverlos en la
 * respuesta http por medio de un json excluyendo el _id y el __v
 * en la respuesta por medio de los métodos .select("-_id").select("-__v") línea 106
 * @param {*HttpRequest} req
 * @param {*HttpResponse} res
 */
const findAllStudentService = async () => {
  try {
    const student = await Student.find({}).select("-_id").select("-__v");
    return student;
  } catch (error) {
    return false;
  }
};

module.exports = {
  saveStudentService,
  updateStudentService,
  deleteStudentService,
  findOneStudentService,
  findAllStudentService,
};
