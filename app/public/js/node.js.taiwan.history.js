/*
  JSON Sample:
  date: "2014-02-07T12:22:54.344Z"
  file: "/Users/win/Sites/new-website/public/articles/news/data/開放報名 - Node.js Taiwan Party 7.html"
  type: "news"
*/

function convertDataFile2Url(str){
  var slice_index = str.indexOf('/articles');
  var result = str.slice(slice_index);
  //console.log(result);
  return result;
}

function convertDataDate2_yyyy_mm_dd(date){
  var format = new Date(date),
      month = 0 + format.getMonth()+1,
      date = 0 + format.getDate();

  if(month<10)
  {
    month = '0' + month;
  }

  if(date<10)
  {
    date = '0' + date;
  }

  return format.getFullYear() + '-' + month + '-' + date;
}


//get column data
$.getJSON("/list.json", function(data){

  var columns = data.news,
      items = [];

  $.each( columns, function(key, obj){
    items.push( "<li><a href=" + encodeURI(convertDataFile2Url(obj.file)) + "><date>"+ convertDataDate2_yyyy_mm_dd(obj.date) + "</date>» " + obj.title + "</a></li>" );
  });

  $( "<ul/>", {
      "class": "",
      html: items.join( "" )
    }).appendTo( ".nodejs-container-histroy-block" );

});


