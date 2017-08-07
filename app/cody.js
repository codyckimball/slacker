const token = require('../slackTokens/cody.js').token

function getStatus(){
        var now = new Date();

        const weekDay = {0:"Recovering From Being Awesome All Week", 1:"Hailing From Farmington East", 2:"Remote and Productive",3:"No meetings...honestly trying to hide", 4:"Livin the Dream at Farmington East", 5:"Lehi and Chill", 6:"Leave me Alone!!!"}
        return {"token":token, "status_text":weekDay[now.getDay()]}
}

function currentProcess(events){
  var response = {};
  for (var i = 0; i < events.length; i++){
    if(events[i]["start"].indexOf('T') > -1 && events[i]["end"].indexOf('T') > -1){
      var now = new Date();
            var startDate = new Date(Date.parse(events[i]["start"],"yyyy-MM-DD'T'HH:mm:ss'-06:00'"));
            var endDate = new Date(Date.parse(events[i]["end"],"yyyy-MM-DD'T'HH:mm:ss'-06:00'"))
            if(startDate < now && now < endDate){
              response = {"token":token, 'status_text':events[i]["event"]}
            }
    }
  }
  if (response['status_text'] == undefined){
    response = getStatus();
  }
  return response;
}

module.exports.status = getStatus
module.exports.currentProcess = currentProcess
