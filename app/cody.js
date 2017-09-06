const token = require('../slackTokens/cody.js').token

function getStatus(){
        var now = new Date();

        const weekDay = {0:["Recovering From Being Awesome All Week",":aw_yeah:"], 1:["Hailing From FARMington East",":tractor:"], 2:["Remote and Productive (Lehi)",":house_with_garden:"],3:["Livin the Dream (Farmington)",":hmm:"], 4:["No meetings...honestly trying to hide (Farmington)",":uh:"], 5:["Lehi and Chill",":see_no_evil:"], 6:["Leave me Alone!!!",":gun:"]}
        return {"token":token, "status_text":weekDay[now.getDay()][0], "status_emoji":weekDay[now.getDay()][1]}
}

function currentProcess(events){
  var response = {};
  var now = new Date();
  for (var i = 0; i < events.length; i++){
    if(events[i]["start"].indexOf('T') > -1 && events[i]["end"].indexOf('T') > -1){
	    var now = new Date();
            var startDate = new Date(Date.parse(events[i]["start"],"yyyy-MM-DD'T'HH:mm:ss'-06:00'"));
            var endDate = new Date(Date.parse(events[i]["end"],"yyyy-MM-DD'T'HH:mm:ss'-06:00'"))
            if(startDate < now && now < endDate){
              response = {"token":token, 'status_text':events[i]["event"], "status_emoji":":meeting:"}
		if(response['status_text'].indexOf('OOO') !== -1){
                	response['status_emoji'] = ":palm_tree:";
            	} else if (response['status_text'].indexOf('Frontrunner') !== -1){
			response['status_emoji'] = ":train:";
		} else {
			response['status_text'] = 'In Meeting: ' + response['status_text'];
		}

            }
     } else if(events[i]["event"].indexOf('OOO') !== -1 && new Date(events[i]["start"]).getDate() <= now.getDate() && new Date(events[i]["end"]).getDate() >= now.getDate()){
     		response = {"token":token, 'status_text':events[i]["event"], "status_emoji":":palm_tree:"}
		break;
     }
  }
  if (response['status_text'] == undefined){
    response = getStatus();
  }
  return response;
}

module.exports.status = getStatus
module.exports.currentProcess = currentProcess
