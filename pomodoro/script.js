var COUNTDOWN;
var PAUSED = true;
var SESSION = true;

function setTimer(minutes) {
  $('#session-length').html(minutes);
  $('#minutes').html(minutes);
  $('#colon').html(":");
  $('#seconds').html("00");
}

function setBreakTime(minutes) {
  $('#break-length').html(minutes);
}

function pauseTimer() {
  PAUSED = true;
  $('.start-stop').html('<i class="fa fa-clock-o" aria-hidden="true"></i> Start Timer');
}

function startTimer(minutes, seconds) {
  var mins = minutes;
  var secs = seconds;
  $('#minutes').html(mins);
  $('#colon').html(":");
  $('#seconds').html(secs);
  if (!PAUSED) {
    $('#timebar').val(0);
  }
  PAUSED = false;
}

function timeIsUp() {
  var sound = 'http://www.oringz.com/oringz-uploads/sounds-917-communication-channel.mp3';
  var audio = new Audio(sound);
  audio.play();
  
  if (SESSION) {
    $('.time-type').html("Session Time Remaining");
    var minutes = parseInt($('#session-length').text());
  } else {
    $('.time-type').html("Break Time Remaining");
    var minutes = parseInt($('#break-length').text());
  }
  
  clearInterval(COUNTDOWN);
  $('#timebar').val(0);
  $('#minutes').html(minutes);
  $('#colon').html(":");
  $('#seconds').html("00");
  COUNTDOWN = setInterval(function() {
    if (!PAUSED) {
      var mins = $('#minutes').text();
      var secs = $('#seconds').text();
      decrementTimer(mins, secs, minutes);
    }
  }, 1000);
}

function decrementTimer(mins, secs, startTime) {
  var inc = 100/(startTime * 60);
  var newTime = $('#timebar').val() + inc;
  $('#timebar').val(newTime);
  if (parseInt(mins) === 0 && secs === "00") {
    SESSION = !SESSION;
    timeIsUp();
  } else {
    if (parseInt(secs) === 0) {
      var mins = mins - 1;
      var secs = "59";
    } else if (Math.floor(parseInt(secs) / 10) === 0 || secs === "10") {
      var decSec = parseInt(secs) - 1;
      var secs = "0" + decSec.toString();
    } else {
      var secs = (parseInt(secs) - 1).toString();
    }
    $('#minutes').html(mins);
    $('#seconds').html(secs);
  }
}

$('document').ready(function() {
  setTimer(25);
  $('#break-length').html(5);
});

$('.session-plus').on('click', function() {
  if (PAUSED) {
    $('#timebar').val(0);
    var newVal = parseInt($('#session-length').text()) + 1;
    setTimer(newVal);
  }
});

$('.session-minus').on('click', function() {
  if (PAUSED) {
    var currNum = parseInt($('#session-length').text());
    if (currNum > 1) {
      var newVal = currNum - 1;
      setTimer(newVal);
      $('#timebar').val(0);
    }
  }
});

$('.break-plus').on('click', function() {
  if (PAUSED) {
    var newVal = parseInt($('#break-length').text()) + 1;
    setBreakTime(newVal);
  }
});

$('.break-minus').on('click', function() {
  if (PAUSED) {
    var currNum = parseInt($('#break-length').text());
    if (currNum > 1) {
      var newVal = currNum - 1;
      setBreakTime(newVal);
    }
  }
});

$('.start-stop').on("click", function() {
  if (PAUSED) {
    var startTime = parseInt($('#session-length').text());
    var mins = $('#minutes').text();
    var secs = $('#seconds').text();
    startTimer(mins, secs);
    clearInterval(COUNTDOWN);
    COUNTDOWN = setInterval(function() {
      if (!PAUSED) {
        var mins = $('#minutes').text();
        var secs = $('#seconds').text();
        decrementTimer(mins, secs, startTime);
      }
    }, 1000);
    $('.start-stop').html('<i class="fa fa-pause" aria-hidden="true"></i> Pause Timer');
  } else {
    pauseTimer();
  }
});