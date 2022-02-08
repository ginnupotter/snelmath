 
    /*
    Author: Varun Aggarwal

    Created as a hobby project to replicate the game Wordle with my own take on the logic. The whole code was writtent from scratch with no reference to the original wordle game.

    Wanted to implement a real time webservice call to dictionary API for validation however due to CORS issue, had to work with a comprehensive list of 5 letter english words (The list was the only thing taken from original wordle)

    This project can be used for creating a personalized version by simply updating the word list and the validation lists in thie file.

    */
    
    
     var testType; // Global variable to set the word for the day, accessible throughout the script
     var counter = 0;
     var matched = 0;
     var first = [];
     var second = [];
     var result = [];
     var initialCount = 1;
     var greenChars = [];
     var yellowChars = [];
     var score = 0;
     var shortMsg = 1000;
     var medMsg = 2000;
     var longMsg = 6000;
     var operators = {
      "plus" : function(a, b) { return a + b },
      "minus" : function(a, b) { return a - b },
      "multi" : function(a, b) { return a * b },
      "divide" : function(a, b) { return a/b },

      };

      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

     function testSetup(testId) {

      testType = testId;

      if(testType=="plus" || testType=="minus" || testType=="plusminus") {
        for(let idx=0; idx<40; idx++) {
          first.push(getRandomInt(10,20));
          second.push(getRandomInt(2,9));
        }
      } else if(testType=="multi" || testType=="divide" || testType=="multidiv" ) {
        for(let idx=0; idx<40; idx++) {
          first.push(getRandomInt(7,12));
          second.push(getRandomInt(2,9));
        }
      }

      if(testType=="plus" || testType=="minus" || testType=="multi" || testType=="divide") {
        for(let idx=0; idx < 40; idx++) {
          result[idx]=operators[testType](first[idx],second[idx]);
         // alert(first[idx]+" "+testType+" "+second[idx]+"="+result[idx] );
        }

        document.getElementById("chooseTest").remove();
        document.getElementById("buttonPress").style.visibility="visible";

      }


               
     }

 
 /*Function to disable all but first row and bring focus to first character on page load*/
 function onPageload() {
     
  counter=0;
  }

    
    
    //Function to clear the grid for taking a screenshot for sharing.
    function clearGrid() {
      for (let index = 0; index < 6; index++) {
        document.getElementsByName("row" + index).forEach(e => {
        e.value = "";
        });

      }
      document.getElementById("buttonPress").style.visibility = "hidden";
      document.getElementById("dateDiv").className = "linkVisible";
      document.getElementById("howTo").style.visibility = "hidden";
      document.getElementById("disclaimer").style.visibility = "hidden";
      document.getElementById("keyboard").style.visibility = "hidden";
      document.getElementById("heading").remove();
      
      return;
    }

    function onKeyboardClick(keyId) {
      
      let enteredVal = document.getElementById("result").value;
      if(keyId=="clear") {
        
          if(enteredVal.length == 0 ) {
            return;
          } else {
            document.getElementById("result").value = "";
            return;
          }
        }

      if(enteredVal.length==0) {
        document.getElementById("result").value = keyId;
        return;
      } else {
        document.getElementById("result").value = enteredVal+keyId;
        return;
      }
      
      
    }
        
    

    

    function timesUp()
    {
      document.getElementById("result").disabled = "true";
      document.getElementById("testBoxes").remove();
      showMessage("Times Up. You Scored: "+score+" Points",longMsg);
      document.getElementById("buttonPress").value = "Try Again";
      document.getElementById("buttonPress").style.visibility = "visible";
      debugger;
      document.getElementById("keyboard").remove();
      counter = 100;
    }

    function checkAnswer() {
      if(counter==100) {
        return;
      }
      var answer = document.getElementById("result").value;
      if (answer == result[counter]) {
        score++;
        document.getElementById("result").className = "testBoxGreen";
      } else {
        document.getElementById("result").className = "testBoxRed";
      }

      setTimeout(function () { document.getElementById("result").className = "testBox" ; }, 100);
      counter++;
      onSubmit();
    }

    //Main logic function which does the matching against the word of the day.
    function onSubmit() {
      debugger;
      if(counter==0){
      document.getElementById("buttonPress").style.visibility = "hidden";
      document.getElementById("testBoxes").style.visibility = "visible";
      document.getElementById("keyboard").style.visibility = "visible";
      document.getElementById("first").disabled = "true";
      document.getElementById("sign").disabled = "true";
      document.getElementById("second").disabled = "true";
      document.getElementById("result").focus();
      setTimeout(timesUp, 10000);
      } else if(counter ==100) {
        window.location.reload(true);
      }
      document.getElementById("result").value = "";
      document.getElementById("first").value = first[counter];
      document.getElementById("second").value = second[counter];
      switch (testType) {
        case 'plus':
          document.getElementById("sign").value = "+";
          break;
        case 'minus':
          document.getElementById("sign").value = "-";
          break;
        case 'multi':
          document.getElementById("sign").value = "x";
          break;
        case 'divide':
          document.getElementById("sign").value = ":";
          break;
      }
      document.getElementById("result").focus();

    }
    
    //Show snackbar message onscreen
    function showMessage(dispMsg,duration) {
     // alert(dispMsg);
    document.getElementById("snackbar").innerHTML = dispMsg;
      
      var x = document.getElementById("snackbar");
      x.className = "show";
      setTimeout(function () { x.className = x.className.replace("show", ""); }, duration);
    }





function checkValidity(enteredWord) {
    
     
    if(fullWordList1.includes(enteredWord)){
        return 1;
    } else if(fullWordList2.includes(enteredWord)) {
        return 1;
    } else if(fullWordList3.includes(enteredWord)) {
        return 1;
    } else {
        return 0;
    }

  }

  /* function checkValidity(enteredString) {
      var baseURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
      debugger;
      alert(baseURL+enteredString);
      const userAction = async () => {
      const response = await fetch(baseURL+enteredString);
      const myJson = await response.json(); //extract JSON from the http response
      
      alert(myJson);

      return 0;


      }
    }

    function checkWord(enteredString) {
      debugger;
      var URL = "https://api.dictionaryapi.dev/api/v2/entries/en/"+enteredString;

      var   responseTxt = '';

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          responseTxt = JSON.parse(this.responseText);
          alert(responseTxt.toString());
        }
      };
      xhttp.open("GET", URL, true);
      xhttp.send();

      return responseTxt;
    }


    async function fetchText(enteredString) {
    debugger;
    var URL = "https://api.dictionaryapi.dev/api/v2/entries/en/"+enteredString;
    let response = await fetch(URL);

    console.log(response.status); // 200
    console.log(response.statusText); // OK

    if (response.status === 200) {
        let data = await response.text();
        alert(data);
    }

    return 0;
    } */


