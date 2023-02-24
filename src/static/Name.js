let db = require("./db_mysql");
let axios = require("axios");
let cheerio = require("cheerio");

exports.refresh = (req) => {
  // console.log(req);
  axios
    .get(encodeURI("https://v.qq.com/x/search/?q=" + req.videoname), {
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
      if (update != req.update_episode) {
        var info = {
          dataid: id,
          videoname: req.videoname,
          update_episode: update,
          videoType: videoType,
        };
        //console.log(info);
        var sql = "update Name set update_episode = ? where dataid = ?";
        db.query(sql, [info.update_episode, info.dataid], (err) => {
          if (err) {
            console.log(err.message)
          }
          console.log(req.videoname + " Refreshed succefully");
        });
      } else {
        console.log("Not any change");
      }
    })
    .catch((err) => {
      console.log("insertName:" + err);
    });
};
