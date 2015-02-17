#!/usr/bin/env node

var async = require('async');
var request = require('request');


var BASE_SEARCH_URL = 'http://kakaku.com/specsearch/3147';


var qs = 'st=2&_s=2&Sort=bbs_desc&DispSaleDate=on&Carrier=1%2c2%2c3&' +
  'ModelSeason=33%2c32%2c30%2c31%2c29%2c28%2c26%2c27%2c25%2c24%2c22%2c23%2c21%2c20&' +
  'OSType=2&Data_service=1%2c13%2c10%2c11%2c9%2c14%2c12&DispTypeColor=1&';
var searchUrl = BASE_SEARCH_URL + '/?' + qs;
var pages = [1, 2, 3, 4, 5];

var data = {
  devices: []
};

async.series([
  function(next) {
    async.eachSeries(pages, function(page, nextLoop) {
      // 普通にサイト上で見ると、初回アクセス以降はセッションに検索条件を保存しているらしく
      // アドレスバーには BASE_SEARCH_URL までしか表示されない
      // 2 ページ目を開くとそうなるので page の根拠はなかったけど、勘でやったら成功した
      var pagedSearchUrl = searchUrl + '?page=' + page;
      request(pagedSearchUrl, function(err, res, body) {
        // @TODO
        // - 文字コード変換
        // - 要素抽出
        console.log(body);
        nextLoop();
      });
    }, next);
  }
], function(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log('Script has been executed successfully');
    process.exit();
  }
});
