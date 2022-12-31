//Importamos las funciones del servicio Student
const {
  saveStudentService,
  updateStudentService,
  deleteStudentService,
  findOneStudentService,
  findAllStudentService,
} = require("../service/StudentService");

/**
 * Función usada para llamar al servicio
 * correspondiente para registrar un nuevo estudiante
 * @param {*HttpRequest} req
 * @param {*HttpResponse} res
 */
const saveStudentController = async (req, res) => {
    const { firstname, lastname, subjects } = req.body;
    const response = await saveStudentService(firstname, lastname, subjects);
    if(response !== ""){
      res.json({identification : response});
    }else{
      res.status(400).json({ error : "error when creating student"});
    }
};
/**
 * Función usada para llamar al servicio
 * correspondiente para actualizar un estudiante
 * @param {*HttpRequest} req
 * @param {*HttpResponse} res
 */
const updateStudentController = async (req, res) => {
    const { firstname, lastname, subjects } = req.body;
    const identification = req.params.identification;
    const response = await updateStudentService(identification, firstname, lastname, subjects);
    if(response > 0){
      res.json({ message: "student updated successfully" });
    }else{
      res.status(400).json({ error : "error when updating student"});
    }
};

/**
 * Función usada para llamar al servicio
 * correspondiente para eliminar un estudiante
 * @param {*HttpRequest} req
 * @param {*HttpResponse} res
 */
const deleteStudentController = async (req, res) => {
    const identification = req.params.identification;
    const response = await deleteStudentService(identification);
    if(response > 0){
      res.json({ message: "student deleted successfully" });
      res.status(200);
    }else{
      res.status(404).json({ message: "student not found" });
    }
};

/**
 * Función usada para llamar al servicio
 * correspondiente para buscar un estudiante
 * @param {*HttpRequest} req
 * @param {*HttpResponse} res
 */
const findOneStudentController = async (req, res) => {
  const identification = req.params.identification;
    const response = await findOneStudentService(identification);
    if(response.length > 0){
      res.json({response});
    }else{
      res.status(204).send();
    }
};

/**
 * Función usada para llamar al servicio
 * correspondiente para buscar todos los estudiantes
 * @param {*HttpRequest} req
 * @param {*HttpResponse} res
 */
const findAllStudentController = async (req, res) => {
    const response = await  findAllStudentService();
    if(response.length > 0){
      res.json({students : response});
    }else{
      res.status(204);
    }
};

//Exportamos las funciones
module.exports = {
  saveStudentController,
  updateStudentController,
  deleteStudentController,
  findOneStudentController,
  findAllStudentController,
};
