const cricLive = require('cric-live');
  
cricLive.getRecentMatches()
  .then(currentMatches => {
    for(i in currentMatches){
      console.log(currentMatches[i].series);
      console.log(currentMatches[i].series);
      for(j in currentMatches[i].teams){ 
      console.log("TEAM:"+currentMatches[i].teams[j].name+"\n");
      console.log("SCORE:"+currentMatches[i].teams[j].name+"\n");
      console.log("OVERS:"+currentMatches[i].teams[j].name+"\n");
      console.log("EICKETS:"+currentMatches[i].teams[j].name+"\n");
      }
      console.log("\n.......................................................");
    }
  });