var time = new Date();
var timestamp = time.getHours() + ":" + time.getMinutes();

$(".timestamp").html(timestamp);
console.log(timestamp);
