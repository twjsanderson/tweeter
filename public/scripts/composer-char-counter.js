$(document).ready(function() {

$("#text").on("input", function (counter) {
  let count = $(this)
  let tweetStr = count.val().length;
  let charCount = count.siblings(".counter").text(140 - tweetStr)
  if (tweetStr > 140) {
    count.siblings(".counter").css("color", "red")
  } else {
    count.siblings(".counter").css("color", "black")
  }
})

});

