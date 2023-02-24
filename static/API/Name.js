let db = require("../db/index");
let axios = require("axios");
let cheerio = require("cheerio");

exports.search = (req, res) => {
  var sql = "select * from Name ";
  db.query(sql, [], (err, data) => {
    if (err) {
      return res.send("错误：" + err.message);
    }
    res.send(data);
  });
};

exports.searchName = (req, res) => {
  //向info表添加数据
  var sql = "select * from Name where videoname = ?";
  db.query(sql, [req.query.videoname], (err, data) => {
    if (err) {
      return res.send("错误：" + err.message);
    }
    res.send(data);
  });
};

exports.insertName = (req, resp) => {
  //console.log(req.query.videoname);
  axios
    .get(encodeURI("https://v.qq.com/x/search/?q=" + req.query.videoname), {
      params: {
        origin: "https://v.qq.com",
        referer: "https://v.qq.com/",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
      },
    })
    .then((res) => {
      var $ = cheerio.load(res.data);
      var id = $(
        "#search_container > div.wrapper > div.wrapper_main > div.mix_warp > div:nth-child(1) > div > div"
      ).attr("data-id");
      var videoType = $(
        "#search_container > div.wrapper > div.wrapper_main > div.mix_warp > div:nth-child(1) > div > div > div._infos > div > h2 > a > span.type"
      ).text();
      let update = "1";
      if (videoType != "电影") {
        update = $(
          "#search_container > div.wrapper > div.wrapper_main > div.mix_warp > div:nth-child(1) > div > div > div._infos > div > a > span.figure_caption > span"
        )
          .text()
          .trim();
      }
      update = Number(update.match(/\d+/g)[0]);

      var info = {
        dataid: id,
        videoname: req.query.videoname,
        update_episode: update,
        videoType: videoType,
      };
      //console.log(info);
      var sql =
        "insert into Name (dataid,videoname,update_episode, videotype) values (?,?,?,?)";
      db.query(
        sql,
        [info.dataid, info.videoname, info.update_episode, info.videoType],
        (err, data) => {
          if (err) {
            return resp.send({
              status: 200,
              msg: "错误：" + err.message,
            });
          }
          resp.send(data);
        }
      );
    })
    .catch((err) => {
      console.log("insertName:" + err);
    });
};

exports.deleteVideo = (req, res) => {
  var sqldata = "delete from Data where dataid=? ;"
  db.query(sqldata, [req.query.dataid], (err, data) => {
    if (err) {
      return res.send("错误：" + err.message);
    }
  });
  var sqlname = "delete from Name where dataid=? ;";
  db.query(sqlname, [req.query.dataid], (err, data) => {
    if (err) {
      return res.send("错误：" + err.message);
    }
    return res.send(data);
  });
};

exports.refresh = (req, resp) => {
  //console.log(req.query.videoname);
  axios
    .get(encodeURI("https://v.qq.com/x/search/?q=" + req.query.videoname), {
      params: {
        origin: "https://v.qq.com",
        referer: "https://v.qq.com/",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
      },
    })
    .then((res) => {
      var $ = cheerio.load(res.data);
      var id = $(
        "#search_container > div.wrapper > div.wrapper_main > div.mix_warp > div:nth-child(1) > div > div"
      ).attr("data-id");
      var videoType = $(
        "#search_container > div.wrapper > div.wrapper_main > div.mix_warp > div:nth-child(1) > div > div > div._infos > div > h2 > a > span.type"
      ).text();
      let update = "1";
      if (videoType != "电影") {
        update = $(
          "#search_container > div.wrapper > div.wrapper_main > div.mix_warp > div:nth-child(1) > div > div > div._infos > div > a > span.figure_caption > span"
        )
          .text()
          .trim();
      }
      update = Number(update.match(/\d+/g)[0]);
      if (update != req.query.update) {
        var info = {
          dataid: id,
          videoname: req.query.videoname,
          update_episode: update,
          videoType: videoType,
        };
        //console.log(info);
        var sql = "update Name set update_episode = ? where dataid = ?";
        db.query(sql, [info.update_episode, info.dataid], (err, data) => {
          if (err) {
            return resp.send({
              status: 200,
              msg: "错误：" + err.message,
            });
          }
          resp.send(req.query.videoname + " Refreshed succefully");
        });
      } else {
        resp.send("Not any change");
      }
    })
    .catch((err) => {
      console.log("insertName:" + err);
    });
};