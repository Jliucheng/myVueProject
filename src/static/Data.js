const { default: axios } = require("axios");
let db = require("./db_mysql");

function insert(req, eslist) {
  //向info表添加数据
  var episode = 0;
  for (var i = 0; i < eslist.length; i++){
    if (eslist[i.toString()].duration > 100) {
      var sql =
        "insert into Data (dataid,videoid,videoname,episode,checkUpTime,videourl,duration) values (?,?,?,?,?,?,?)";
      if(req.query.videotype == "电影"){
        episode = 1
      }else{
        episode = eslist[i.toString()].title
      }
        db.query(
        sql,
        [
          req.query.dataid,
          eslist[i.toString()].id,
          req.query.videoname,
          episode,
          eslist[i.toString()].checkUpTime,
          eslist[i.toString()].url,
          eslist[i.toString()].duration,
        ],
        (err) => {
          if (err) {
            console.log("错误：" + err.message)
            return "错误：" + err.message;
          }else{
            return eslist
          }
        }
      );
    }
  }
}


function getDataList(id, pageContext, handle) {
  let url =
    "https://pbaccess.video.qq.com/trpc.videosearch.search_cgi.http/load_playsource_list_info";
  axios
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
      let episodeInfoList = res.data.data.normalList.itemList['0'].videoInfo.firstBlockSites[0]
        .episodeInfoList;
      handle(episodeInfoList);
    })
    .catch((err) => {
      console.log("获取数据失败:getDataList " + err);
      return "获取数据失败:getDataList " + err
    });
}

exports.loadData = (req, res) => {
  //console.log(req.query.dataid, req.query.update);
  var episodeInfoList = [];
  var pageContext = "need_async=true";
  if (req.query.update < 100) {
    getDataList(req.query.dataid, pageContext, function (list) {
      episodeInfoList = list;
      insert(req, episodeInfoList);
      return res.send(episodeInfoList);
      //console.log(episodeInfoList);
    });
    //return episodeInfoList;
  } else {
    var tab = Math.ceil(req.query.update / 98);
    for (var i = 0; i < tab; i++) {
      var forword = (98 * i + 1).toString();
      var back = 98 * (i + 1).toString();
      pageContext = `tab_id=1_${forword}_${back}_0`;
      getDataList(req.query.dataid, pageContext, function (list) {
        episodeInfoList = episodeInfoList.concat(list);
        if (episodeInfoList.length >= req.query.update) {
          insert(req, episodeInfoList);
          return res.send(episodeInfoList);
        }
      });
    }
    //return episodeInfoList;
  }
};

exports.insertData = (req, res) => {
  //添加数据
  var sql =
    "insert into Data (dataid,videoid,videoname,episode,checkUpTime,videourl,duration) values (?,?,?,?,?,?,?)";
  db.query(
    sql,
    [
      req.query.dataid,
      req.query.videoid,
      req.query.videoname,
      req.query.episode,
      req.query.checkUpTime,
      req.query.videourl,
      req.query.duration,
    ],
    (err, data) => {
      if (err) {
        return res.send("错误：" + err.message);
      }
      res.send(data);
    }
  );
};

