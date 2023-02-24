let db = require("./db_mysql");
let axios = require("axios");
let cheerio = require("cheerio");

async function getData(url, req) {
  const response = await axios.get(url, {
    params: req,
  });
  return response;
}

getData("http://43.139.189.22:5173/name/search")
  .then(async (res) => {
    for (var n = 0; n < res.data.length; n++) {
      // console.log(res.data[n].videoname);
      try {
        await refresh(res.data[n]);
        await loadData(res.data[n]);
      } catch (err) {
        console.log(err);
      }
      // console.log(res.data[n])
      if (n == res.data.length) {
        db.off();
        return;
      }
    }
  })
  .catch((err) => console.log(err));

async function refresh(req) {
  // console.log(req);
  await axios
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
            console.log(err.message);
          }
        //   console.log(req.videoname + " Refreshed succefully");
        });
      } else {
        // console.log("Not any change");
      }
    })
    .catch(() => {
    //   console.log("insertName:" + err);
    });
}

function loadData(req) {
  var episodeInfoList = [];
  var pageContext = "need_async=true";
  if (req.update_episode < 100) {
    getDataList(req.dataid, pageContext, function (list) {
      episodeInfoList = list;
      insert(req, episodeInfoList);
    //   console.log(req.videoname + " updated");
    });
  } else {
    var tab = Math.ceil(req.update_episode / 98);
    for (var i = 0; i < tab; i++) {
      var forword = (98 * i + 1).toString();
      var back = 98 * (i + 1).toString();
      pageContext = `tab_id=1_${forword}_${back}_0`;
      getDataList(req.dataid, pageContext, function (list) {
        episodeInfoList = episodeInfoList.concat(list);
        if (episodeInfoList.length >= req.update_episode) {
          insert(req, episodeInfoList);
          //   return res.send(episodeInfoList);
        //   console.log(req.videoname + " updated");
        }
      });
    }
    //return episodeInfoList;
  }
}

function insert(req, eslist) {
  //向info表添加数据
  var episode = 0;
  for (var i = 0; i < eslist.length; i++) {
    if (eslist[i.toString()].duration > 100) {
      var sql =
        "insert into Data (dataid,videoid,videoname,episode,checkUpTime,videourl,duration) values (?,?,?,?,?,?,?)";
      if (req.videotype == "电影") {
        episode = 1;
      } else {
        episode = eslist[i.toString()].title;
      }
      db.query(
        sql,
        [
          req.dataid,
          eslist[i.toString()].id,
          req.videoname,
          episode,
          eslist[i.toString()].checkUpTime,
          eslist[i.toString()].url,
          eslist[i.toString()].duration,
        ],
        (err) => {
          if (err) {
            // console.log("错误：" + err.message);
            return "错误：" + err.message;
          } else {
            return eslist;
          }
        }
      );
    }
  }
}

async function getDataList(id, pageContext, handle) {
  let url =
    "https://pbaccess.video.qq.com/trpc.videosearch.search_cgi.http/load_playsource_list_info";
  await axios
    .get(url, {
      params: {
        id: id,
        dataType: 2,
        pageContext: pageContext,
        scene: 2,
        platform: 2,
        appId: 10718,
        site: "qq",
        vappid: 34382579,
        vsecret: "e496b057758aeb04b3a2d623c952a1c47e04ffb0a01e19cf",
      },
    })
    .then((res) => {
      //console.log(res.data)
      //handle(res.data)
      let episodeInfoList =
        res.data.data.normalList.itemList["0"].videoInfo.firstBlockSites[0]
          .episodeInfoList;
      handle(episodeInfoList);
    })
    .catch((err) => {
    //   console.log("获取数据失败:getDataList " + err);
      return "获取数据失败:getDataList " + err;
    });
}
