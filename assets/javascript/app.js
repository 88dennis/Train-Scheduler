// Initialize Firebase
var config = {
  apiKey: "AIzaSyC15aCP6evfYw0xcOaeGemkZuwGdbrAskE",
  authDomain: "train-scheduler-35795.firebaseapp.com",
  databaseURL: "https://train-scheduler-35795.firebaseio.com",
  projectId: "train-scheduler-35795",
  storageBucket: "train-scheduler-35795.appspot.com",
  messagingSenderId: "49005770895"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  $('tbody').empty();

  var name = $("#train-name-input").val();
  var destination = $("#destination-input").val();
  var start = $("#first-train-input").val();
  var frequency = $("#frequency-input").val();

  var newTrain = { name, destination, start, frequency
  }

  database.ref().push(newTrain);

  // console.log(newTrain.name);
  // console.log(newTrain.destination);
  // console.log(newTrain.start);
  // console.log(newTrain.frequency);  

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("value", function (snapshot) {

  var trainSchedule = snapshot.val();
  console.log(trainSchedule.destination)


  for (const entries in trainSchedule) {
    // ASSIGN VARIABLES, KEYS, ROWS, COLUMNS THEN PLACE THE TEXTS INSIDE
    
    var { name, destination, start, frequency } = trainSchedule[entries];
    
    var tableRow = $('<tr>');
    var tdName = $('<td>').text(name);
    var tdDestination = $('<td>').text(destination);
    var tdfrequency = $('<td>').text(frequency);
    
    
    // THIS IS TO COMPUTE THE ARRIVAL OF NEXT TRAIN
    var firstTimeConverted = moment(start, "HH:mm").subtract(1, "years");
    var currentTime = moment();

    var diffTime = currentTime.diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % frequency;
    
    var tMinsOfTrain = frequency - tRemainder;
    
    var nextTrain = moment().add(tMinsOfTrain, "minutes");
    var tdArrival = $("<td>").text(tMinsOfTrain);
      
    var arrival = moment(nextTrain).format("hh:mm");
    var tdStart = $('<td>').text(arrival);
    
    
    
    

    tableRow.append(tdName, tdDestination, tdfrequency, tdStart, tdArrival);
    console.log(tableRow);

    $("tbody").append(tableRow);

  }
});
