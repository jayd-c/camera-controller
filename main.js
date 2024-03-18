const MsgIds = {
    MSGID_KEEP_ALIVE:       2,
    MSGID_LOGIN:            3,
    MSGID_SET_HOME:         4,
    MSGID_GO_HOME:          5,
    MSGID_MOVE:             6,
    MSGID_MOVE_TO_TARGET:   7,
    MSGID_STEP:             8,
    MSGID_STOP:             9 
}

var panSocket;
var tiltSocket;
var panMaxDelay = 0;
var tiltMaxDelay = 0;

function send_keepalive() {
return;
var msg = {
  MsgID: MsgIds.MSGID_KEEP_ALIVE,
  Time: new Date().getTime()
  };

  var str = JSON.stringify(msg);
  panSocket.send(str);
  tiltSocket.send(str);
}

function button_go_home(element) {
    var msg = { MsgID: MsgIds.MSGID_GO_HOME};
    if (element.id === 'BTN_GO_HOME_PAN') {
        panSocket.send(JSON.stringify(msg));
    }
    else if (element.id === 'BTN_GO_HOME_TILT') {
        tiltSocket.send(JSON.stringify(msg));
    }
}

function move(element) {
var dir = 1; // Clockwise
  if (element.id === 'BTN_MOVE_PAN') {
    var speed = document.getElementById('SPEED_SLIDER_PAN').value;
    if (speed < 0) {
        dir = -1; // CounterClockwise;
        speed = speed * -1;
    }
    var msg = {
        MsgID: MsgIds.MSGID_MOVE,
        speed: speed,
        dir: dir
      };
    panSocket.send(JSON.stringify(msg));
  }
  else if (element.id === 'BTN_MOVE_TILT') {
    var speed = document.getElementById('SPEED_SLIDER_TILT').value;
    if (speed < 0) {
        dir = -1; // CounterClockwise
        speed = speed * -1;
    }
    var msg = {
        MsgID: MsgIds.MSGID_MOVE,
        speed: speed,
        dir: dir
      };
    tiltSocket.send(JSON.stringify(msg));
  }
}

function on_stop(element) {
var msg = { MsgID: MsgIds.MSGID_STOP };
    if (element.id === 'BTN_STOP_PAN') {
        panSocket.send(JSON.stringify(msg));
        document.getElementById('SPEED_SLIDER_PAN').value = '0';
    }
    else if (element.id === 'BTN_STOP_TILT') {
        tiltSocket.send(JSON.stringify(msg));
        document.getElementById('SPEED_SLIDER_TILT').value = '0';
    }
}

function on_stop_all() {
var msg = { MsgID: MsgIds.MSGID_STOP };
var str = JSON.stringify(msg);
panSocket.send(str);
tiltSocket.send(str);

document.getElementById('SPEED_SLIDER_PAN').value = '0';
document.getElementById('SPEED_SLIDER_TILT').value = '0';
}

function processPanCommand(event) {
var delay = new Date().getTime();
var obj = JSON.parse(event.data);
delay = delay - obj.Time;
if (panMaxDelay < delay) {
    panMaxDelay = delay;
    document.getElementById('PAN_MAX_DLY').innerHTML = panMaxDelay;
}
document.getElementById('PAN_RX').innerHTML = obj.Time;
document.getElementById('PAN_DLY').innerHTML = delay;
}

function processTiltCommand(event) {
var delay = new Date().getTime();
var obj = JSON.parse(event.data);
delay = delay - obj.Time;
if (tiltMaxDelay < delay) {
    tiltMaxDelay = delay;
    document.getElementById('TILT_MAX_DLY').innerHTML = tiltMaxDelay;
}
document.getElementById('TILT_RX').innerHTML = obj.Time;
document.getElementById('TILT_DLY').innerHTML = delay;
}

function init() {
panSocket = new WebSocket('ws://192.168.4.122:81/');
tiltSocket = new WebSocket('ws://192.168.4.125:81/');
panSocket.onmessage = function(event) {
  processPanCommand(event);
};
tiltSocket.onmessage = function(event) {
    processTiltCommand(event);
};

var timer = setInterval(function(){send_keepalive();}, 1000);
}

window.onload = function(event) {
init();
}