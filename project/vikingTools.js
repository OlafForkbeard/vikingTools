//====================================================/
//* Index
//
//  * vt
//    A small "library" of callable methods that are 
//    used in small web design situations.
//    The object to reference methods from is called:
//    "vt".
//   
//    These methods will only run server side, due to
//    the nature of import and export commands.
//
//  Method Index
//  * log(); WIP CAN'T WRITE TO SERVER YET
//      This is an event log.
//      This is an array object, holding a string of 
//      errors and log events to append. Should be 
//      read only. 
//  * delay();
//      sets ms a timer relative to the called 
//      location regardless of code execution then 
//      fires a function. Alternatively it can halts 
//      all code execution for up to 10000 ms.
//  * fileExists();
//      Literally checks if the source passed exists.
//  * scrollTo(); 
//      Smooth scroll to an anchor, with an optional 
//      wait time to allow loading elements. 
//  * writeHTML(); WIP
//      Used to insert text or text files directly into 
//      some HTML element, usually a div, defined by 
//      it's ID, with an optional wait time before
//      acting.
//      This implies it can be used to erase content 
//      by passing a blank string.
///* Index
//=/==================================================/
//====================================================/
//* vt
export const vt = {};
//This is the container object. It simply hosts 
//callable methods.
//The export is used to import the vt object, and 
//it's methods via 
//import { vt.delay() } from "./vikingToolbox.js"; 
//in another js doc, with the proper path.
//import only works server side.
//
///* vt
//=/==================================================/
//====================================================/
//* someMethod(); 
//Example construction of a method.
vt.someMethod = function(param1) {
  vt.log("vt.test fire() :" + param1);
  //Code goes here.
};
///* someMethod(); 
//=/==================================================/
//===================================================/
//* log();
//Debug Modes
vt.debugMode = false;
//Prints to the console when true.
vt.debugAlertMode = false;
//Alerts all debug info.
//Declare the logfile, and set node 0 to the starting log data. 
//TODO Needs to pull version from somewhere else.
vt.logfile = ["Initiated: " + Date.now()];
vt.log = function(logDataInput) {
  //Prefixing the current time to the log entry.
  logDataOutput = Date.now() + ": " + logDataInput;
  //Log it into vt.log's logfile.
  vt.logfile.push(logDataOutput);
  //If any debug mode is on, ignore sent parameter for it, and just 
  //debug every time.
  if (debugMode === undefined || debugMode === false || debugMode === 0) {
    alert("log() consoleDebugMode === undefined || consoleDebugMode === false || logDebugInput === 0");
    //Take no action
  } else if (debugMode === true || debugMode === 1) {
    //Record logging data in both vt.logfile and console.
    console.log(logDataOutput);
  } else {
    //Logdump, unknown error
    vt.logfile.push("Unexpected Error, starting vt.logfile dump.");
    for (let i = 0; i < vt.log.length(); i++) {
      console.log(vt.logfile[i]);
    }
    vt.logfile.push("Unexpected Error, ending vt.logfile dump.");
    alert("Unexpected Error, starting vt.logfile dump.");
  }
  //Catches for undefined and false sents. Defaults to debug off.
  if (debugAlertMode !== undefined || debugAlertMode !== false || debugAlertMode !== 0) {
    alert(logDataOutput);
  } else {
    //Logdump, unknown error
    vt.logfile.push("Unexpected Error, vt.logfile dump Starting.");
    for (let i = 0; i < vt.log.length(); i++) {
      console.log(vt.logfile[i]);
    }
    vt.logfile.push("Unexpected Error, ending vt.logfile dump.");
    alert("Unexpected Error, starting vt.logfile dump.");
  }
}
///* log(); 
//=/==================================================/
//====================================================/
//* delay();
vt.delay = function(delayms, delayfunc) {
  vt.log("vt.delay fire()");

  if (delayms !== undefined) {
    vt.log("delay() delayms: " + delayms);
    if (delayfunc instanceof Function) {
      vt.log("delay() delayfunc '" + delayfunc + "' is a function. Setting timer, then firing function on resolution.");
      setTimeout(() => delayfunc, delayms);
    } else {
      vt.log("delay() delayfunc '" + delayfunc + "' is not a function.");
      if (delayms > 0 && delayms < 10000) {
        vt.log("delay() delayms '" + delayms + "' is within the 10 second bound for a code pausing wait.");
        //this variable, and it's for loop are the wait.
        //no code executes during this wait.
        var start = new Date().getTime();
        for (let i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > delayms) {
            break;
          }
        }
        //end wait
      }
    }
  } else {
    vt.log("delay() delayms is undefined. No timer set.");
  }
}
///* delay()
//=/==================================================/
//====================================================/
//* fileExists();
//Literally checks if the source path file exists.
vt.fileExists = function(textInput) {
  vt.log("fileExists() is checking for the existence of: " + textInput);
  fetch(textInput, {
    method: "HEAD"
  }).then((res) => {
    if (res.ok) {
      // file is present at URL
      vt.log("fileExists() found " + textInput);
      return (true);
    } else {
      // file is not present at URL
      vt.log("writeHTML() did not find " + textInput);
      return (false);
    }
  });
}
///* fileExists()
//=/==================================================/
//====================================================/
//* scrollTo();
vt.scrollTo = function(anchor, mswait) {
  vt.log("vt.scrollTo fire");
  //anchor, opt, is the anchor id you'd like to 
  //  navigate to, and defaults to top of page "#"
  //mswait, opt, is the amount of time to wait before
  //  navigating via slow scroll.
  //  to it.
  if (anchor === undefined || anchor === false || anchor === 0) {
    //if the anchor is undefined or false, then 
    //set the anchor to the top of the page.
    anchor = "#";
  }
  if (mswait === undefined || mswait === false || mswait === 0) {
    //if mswait is undefined, no wait, just go.
    //actually scroll to the target anchor.
    document.getElementById(anchor).scrollIntoView();
  } else {
    //mswait has a time attached to it. wait, then go.
    setTimeout(() => anchorJump(anchor), mswait);
  }
}
///* scrollTo()
//=/==================================================/
//====================================================/
//* writeHTML();
vt.writeHTML = function(elid, textInput, attemptsToFindFile) {
  vt.log("vt.writeHTML fire()");
  //elid is the element ID of the div, or content holder that
  //  textInput will be inserted into.
  //textInput is two things. It will attempt to be the path
  //  to an external document to pull all data from for 
  //  insertion. If that fails, it is literal text to 
  //  insert.
  //attemptsToFindFile is how many attempts in 15 ms intervals to try
  //  pulling textInput's source. Defaults to 3.
  if (elid !== undefined && !!document.getElementById(elid)) {
    //the !! converts to boolean. This checks if the ID exsts on page.
    vt.log("writeHTML() elid '" + elid + "' exists on page.");
    //The container to store and edit the textInput.
    var textInput_data;
    if (vt.fileExists(textInput)) {
      //calls the file checker, and if the file exists do these
      if (window.XMLHttpRequest) {
        textInput_data = new XMLHttpRequest();
      } else {
        // code for older browsers
        textInput_data = new ActiveXObject("Microsoft.XMLHTTP");
      }
      textInput_data.onreadystatechange = function() {
        for (let i = attemptsToFindFile; i > 0; i--) {
          vt.log("writeHTML() Attempting to load" + textInput + " on attempt " + i + "/" + attemptsToFindFile);
          if (this.readyState == 4 && this.status == 200) {
            vt.log("writeHTML() writing textInput's file to page.");
            //actually write the file to the elid location in storage.
            document.getElementById(elid).innerHTML = this.responsetextInput;
            //end the loop.
            i = 0;
          }
        }
      }
    } else {
      vt.log("writeHTML() writing textInput to file as string.");
      //Couldn't find textInput. Writing textInput to file storage as string.
      document.getElementById(elid).innerHTML = textInput;
    }
    //Get the actual data.
    textInput_data.open("GET", textInput, true);
    textInput_data.send();
  } else {
    vt.log("writeHTML() elid '" + elid + "' does not exist on page.");
    //fail out.
  }
}
///* writeHTML()
//=/==================================================/