const Student = require("../model/Student");
const winston = require('winston');

const consoleTransport = new winston.transports.Console()
/**
 * Posee toda la lógica de negocio
 * necesaria para realizar el CRUD
 * de estudiantes
 */
 const myWinstonOptions = {
  transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)
module.exports = class StudentService {
  
  /**
   * Método usado para actualizar un estudiante
   * a través de su identificación y devolver un json
   * con el mensaje student registered successfully
   * si se encuentra el estudiante ya cargado devuelve un json
   * con el mensaje "student already exists"
   * @param {*HttpRequest} req 
   * @param {*HttpResponse} res 
   */
  static async save(req, res) {
    const { identification, firstname, lastname, subjects } = req.body;
    try {
      const response = await exists(identification);
      if (!response.exists) {
        await Student.create({
          identification,
          firstname,
          lastname,
          subjects,
        });
        res.json({ message: "student registered successfully" });
        res.status(201);
      } else {
        res.status(400);
        res.json({ message: "student already exists" });
      }
      return res;
    } catch (error) {
        res.status(400);
        res.json({ error : error });
    }
  }

  /**
   * Método usado para actualizar un estudiante
   * a través de su identificación y devolver un json
   * con el mensaje student updated successfully
   * @param {*HttpRequest} req 
   * @param {*HttpResponse} res 
   */
  static async update(req, res) {
    const { firstname, lastname, subjects } = req.body;
    const identification = req.params.identification;
    try {
      await Student.updateOne(
        { identification : `${identification}` },
        {
          firstname,
          lastname,
          subjects,
        }
      );
      res.json({ message: "student updated successfully" });
      res.status(200);
    } catch (error) {
        res.status(400);
        res.json({ error : error });
    }
  }

  /**
   * Método usado para eliminar un estudiante
   * a través de su identificación y devolver un json
   * con el mensaje student deleted successfully
   * si no se encuentra el estudiante devuelve un json
   * con el mensaje "student not found"
   * @param {*HttpRequest} req 
   * @param {*HttpResponse} res 
   */
  static async delete(req, res) {
    const identification = req.params.identification;
    try {
      const deleted = await Student.deleteOne(
        { identification : `${identification}` },
      );
      if(deleted.deletedCount > 0){
      res.json({ message: "student deleted successfully" });
      res.status(200);
    }else{
      res.json({ message: "student not found" });
      res.status(404);
    }
    } catch (error) {
        res.status(400);
        res.json({ error : error });
    }
  }

  /**
   * Método usado para buscar todos los estudiantes
   * registrados y devolverlos en la
   * respuesta http por medio de un json excluyendo el _id y el __v
   * en la respuesta por medio de los métodos .select("-_id").select("-__v") línea 106
   * @param {*HttpRequest} req 
   * @param {*HttpResponse} res 
   */
  static async findAll(req, res) {
    try {
      logger.info("buscando")
      const student = await Student.find({}).select("-_id").select("-__v"); 
      res.setHeader("content-type", "application/json");
      res.json({ student: student });
      logger.info(student);
      res.status(200);
    } catch (error) {
      res.status(400);
      res.json({ error : error });
    }
  }

  /**
   * Método usado para buscar un estudiante
   * a través de su identificación y devolverlo en la
   * respuesta http por medio de un json excluyendo el _id y el __v
   * en la respuesta por medio de los métodos .select("-_id").select("-__v") línea 126
   * @param {*HttpRequest} req 
   * @param {*HttpResponse} res 
   */
  static async findOne(req, res) {
    const identification = req.params.identification;
    try {
      const student = await Student.find({ identification }).select("-_id").select("-__v");
      res.json({ data: student });
      res.status(200);
    } catch (error) {
      res.status(400);
      res.json({ error : error });
    }
  }
};

/**
 * Método usado para verificar si un estudiante ya está registrado
 * @param {*identificación del estudiante } identification 
 * @returns boolean devuelve true si el estudiante existe caso contrario false
 */
const exists = async (identification) => {
  try {
    const result = await Student.findOne({ identification });
    if(!result)
      return { exists : false };
    else
      return { exists : true };
  } catch (err) {
    console.error(`Something went wrong: ${err}`);
    return { exists : false, error : err};
  }
}
