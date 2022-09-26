const User = require("../model/User");

module.exports = class StudentService {
    static async findOne(req, res) {
        const { username, password } = req.body;
        try {
          const user = await Student.findOne({ username }).select("-_id").select("-__v");
          if(user){
            if(user.password === password){
                res.json({ data: "logged" });
                res.status(200);
            }else{
                res.json({ data: "Not logged" });
                res.status(400);
            }
          }
        } catch (error) {
          res.status(400);
          res.json({ error : error });
        }
      }

}


