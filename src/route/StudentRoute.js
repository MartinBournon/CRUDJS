const {Router} = require('express');

const router = Router();
const StudentController = require("../controller/StudentController");
/**
 * Este archivo contiene las rutas para cada acción del CRUD
 *los endpoints que figuran con un :identification se los conoce como
 *endpoints que poseen parámetros los cuales son colocados en la url 
 *al ser llamados desde afuera, ejemplo www.miweb.com/students/45025 
 *donde 45025 es el número de identificación del estudiante
*/


//Devuelve todos los estudiantes almacenados en la base de datos
router.get("/students", StudentController.findAll);

//Devuelve un estudiante cuya identification se encuentre almacenado en la base de datos
router.get("/students/:identification", StudentController.findOne);

//Registra un nuevo estudiante en la base de datos
router.post("/students", StudentController.save);

//Actualiza un estudiante en la base de datos
router.put("/students/:identification", StudentController.update);

//Elimina un estudiante de la base de datos
router.delete("/students/:identification", StudentController.delete);

module.exports = router;