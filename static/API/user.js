let db = require("../db/index");

exports.login = (req, res) => {
    //向info表添加数据
    var sql = "select * from users where username=? and pswd=md5(?)";
    db.query(
      sql,
      [req.query.username,req.query.passwd],
      (err, data) => {
        if (err) {
          return res.send("错误：" + err.message);
        }
        res.send(data);
      }
    );
  };