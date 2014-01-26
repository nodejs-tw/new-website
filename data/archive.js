var jsdom = require("jsdom");
var html2markdown = require('html2markdown');
var fs = require('fs');

var archive = [{"href":"http://nodejs-tw.tumblr.com/post/40671921582/node-js-taiwan-party-25","tag":"","date":"2013-01-16"},{"href":"http://nodejs-tw.tumblr.com/post/39578274844/node-js-taiwan-party-24","tag":"","date":"2013-01-04"},{"href":"http://nodejs-tw.tumblr.com/post/39472905161/node-js-taiwan-party-24","tag":"","date":"2013-01-02"},{"href":"http://nodejs-tw.tumblr.com/post/38448665733/node-js-taiwan-party-23","tag":"","date":"2012-12-21"},{"href":"http://nodejs-tw.tumblr.com/post/37295295689/node-js-taiwan-party-22","tag":"","date":"2012-12-06"},{"href":"http://nodejs-tw.tumblr.com/post/36124193756/node-js-taiwan-party-21","tag":"","date":"2012-11-20"},{"href":"http://nodejs-tw.tumblr.com/post/35752824620/node-knockout-2012","tag":"","date":"2012-11-15"},{"href":"http://nodejs-tw.tumblr.com/post/35622662763/node-js-taiwan-party-20","tag":"","date":"2012-11-13"},{"href":"http://nodejs-tw.tumblr.com/post/32520399720/node-js-taiwan-party-17","tag":"#交流聚會","date":"2012-09-29"},{"href":"http://nodejs-tw.tumblr.com/post/32101145439/node-js-windows-azure-node-js-taiwan-party-16","tag":"#聚會回顧","date":"2012-09-23"},{"href":"http://nodejs-tw.tumblr.com/post/31439170405/node-js-taiwan-party-16","tag":"#交流聚會","date":"2012-09-13"},{"href":"http://nodejs-tw.tumblr.com/post/31234504171/node-js-mashup-web-language-node-js-taiwan-party-15","tag":"#聚會回顧","date":"2012-09-10"},{"href":"http://nodejs-tw.tumblr.com/post/31206680274/hadoop-and-node-js-node-js-taiwan-party-14","tag":"#聚會回顧","date":"2012-09-10"},{"href":"http://nodejs-tw.tumblr.com/post/31206307366/socket-io-issue-and-solution-node-js-taiwan-party-13","tag":"#聚會回顧","date":"2012-09-10"},{"href":"http://nodejs-tw.tumblr.com/post/31205779009/how-implement-internationalization-i18n-on-node-js","tag":"#聚會回顧","date":"2012-09-10"},{"href":"http://nodejs-tw.tumblr.com/post/30578126489/node-js-taiwan-party-15","tag":"#交流聚會","date":"2012-08-31"},{"href":"http://nodejs-tw.tumblr.com/post/29557790922/node-js-taiwan-party-14","tag":"#交流聚會","date":"2012-08-17"},{"href":"http://nodejs-tw.tumblr.com/post/28548080184/node-js-taiwan-party-13","tag":"#交流聚會","date":"2012-08-02"},{"href":"http://nodejs-tw.tumblr.com/post/27901619900/backbone-node-js-a-spa-node-js-taiwan-party-11","tag":"#聚會回顧","date":"2012-07-24"},{"href":"http://nodejs-tw.tumblr.com/post/27899151795/facebook-login-with-everyauth-node-js-taiwan-party-10","tag":"#聚會回顧","date":"2012-07-24"},{"href":"http://nodejs-tw.tumblr.com/post/27558118743/node-js-taiwan-party-12","tag":"#交流聚會","date":"2012-07-19"},{"href":"http://nodejs-tw.tumblr.com/post/26439410169/node-js-taiwan-party-11","tag":"#交流聚會","date":"2012-07-04"},{"href":"http://nodejs-tw.tumblr.com/post/25889479509/comet-server-client-developing-node-js-taiwan-party","tag":"#聚會回顧","date":"2012-06-26"},{"href":"http://nodejs-tw.tumblr.com/post/25434606033/node-js-taiwan-party-10","tag":"","date":"2012-06-19"},{"href":"http://nodejs-tw.tumblr.com/post/24896137291/build-a-todo-list-using-express-node-js-taiwan-party","tag":"#聚會回顧","date":"2012-06-12"},{"href":"http://nodejs-tw.tumblr.com/post/24587750476/node-js-taiwan-party-9","tag":"","date":"2012-06-07"},{"href":"http://nodejs-tw.tumblr.com/post/23613714423/nodejs-taiwan-party-8","tag":"","date":"2012-05-24"},{"href":"http://nodejs-tw.tumblr.com/post/23484442955/mojito-node-js-framework-ntp-7","tag":"#聚會回顧","date":"2012-05-22"},{"href":"http://nodejs-tw.tumblr.com/post/22330064564/nodeparty20120510","tag":"#交流聚會","date":"2012-05-04"},{"href":"http://nodejs-tw.tumblr.com/post/22260160107/node-js-taiwan-party-6","tag":"#聚會回顧","date":"2012-05-03"},{"href":"http://nodejs-tw.tumblr.com/post/21386689776/nodeparty2012046","tag":"#交流聚會","date":"2012-04-20"},{"href":"http://nodejs-tw.tumblr.com/post/21273549484/nodejs20120412","tag":"#聚會回顧","date":"2012-04-18"},{"href":"http://nodejs-tw.tumblr.com/post/20975736640/nodejs20120329","tag":"#聚會回顧","date":"2012-04-13"},{"href":"http://nodejs-tw.tumblr.com/post/20631976641/nodeparty20120412","tag":"#交流聚會","date":"2012-04-07"},{"href":"http://nodejs-tw.tumblr.com/post/19738511597/nodeparty20120329","tag":"#交流聚會","date":"2012-03-23"},{"href":"http://nodejs-tw.tumblr.com/post/19683689347/nodejs20120315","tag":"#node.js party","date":"2012-03-22"},{"href":"http://nodejs-tw.tumblr.com/post/19121070387/nodeparty20120315","tag":"#交流聚會","date":"2012-03-11"},{"href":"http://nodejs-tw.tumblr.com/post/18849102579/nodejs20120301","tag":"","date":"2012-03-06"},{"href":"http://nodejs-tw.tumblr.com/post/18183023082/nodeparty20120301","tag":"#交流聚會","date":"2012-02-24"},{"href":"http://nodejs-tw.tumblr.com/post/17428977856/nodejs-taiwan","tag":"#交流聚會","date":"2012-02-12"},{"href":"http://nodejs-tw.tumblr.com/post/17211223561/2012jsdc","tag":"#javascript","date":"2012-02-07"},{"href":"http://nodejs-tw.tumblr.com/post/16872125817","tag":"#新聞快訊","date":"2012-02-02"},{"href":"http://nodejs-tw.tumblr.com/post/16871681842/post-new-year-for-nodejs","tag":"#新竹聚會","date":"2012-02-02"}];

(fetch = function(index){
    jsdom.env(archive[index].href, ["http://code.jquery.com/jquery.js"],
      function (errors, window) {
        var $ = window.$;
        var post = $('.post');
        var title = $('h3:eq(0)', post).text();
        var tags = archive[index].tag.match(/#([^#]+)/gi);
        var date = archive[index].date;
        $('h3:eq(0)', post).remove();
        $('.postmeta', post).remove();
        var data = '';
        data += 'title: ' + title + '\n\r';
        data += 'description: 說明\n\r';
        data += 'tags:\n\r';
        data += ' - NodeJS\n\r'
        if ( tags ) {
            tags.forEach(function(tag){
                data += ' - ' + tag.substr(1) + '\n\r'
            });
        }
        data += 'date: ' + date + '\n\r';
        data += 'type: activity\n\r';
        data += '---\n\r';
        data += html2markdown(post.html());
        fs.writeFileSync('tumblr/' + title.replace('/','or') + '.md', data);
        console.log('COMPLETED: ' + title);

        index += 1;
        if ( index < archive.length ) fetch(index);
      }
    );
})(0);
