
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function createTweetElement(obj) {
  let article = `<article class="tweet-container">
    <header class="tweet-header">
      <img class="img" src=${obj.user.avatars.regular}>
      <span class="name">${obj.user.name}</span>
      <span class="handle">${obj.user.handle}</span>
    </header>
    <div class="tweet-display-box">
      <p class="tweet-display">${escape(obj.content.text)}</p>
    </div>
      <footer name="tweet-footer" class="tweet-footer">
        <span class="days-ago">${obj.created_at}</span>
        <span class="icons"><i class="fas fa-flag"></i><i class="fas fa-sync-alt"></i><i class="fas fa-heart"></i></span>
    </footer>
  </article>
  `
  let $tweet = $(article).addClass('tweet');
  return $tweet;
}

$(document).ready(function() {

  $(".compose").click(function() {
    $(".container").slideToggle("slow");
    $("#text").focus();
  });

  $("form").on("submit", function(event) {
    event.preventDefault();
    let tweetLength = $("textarea").val().length
    if (tweetLength === 0) {
        $("#cognito").text("You cannot tweet a blank field").css( "display")
        $("#cognito").slideToggle("fast", function () {
          $("#cognito").fadeOut(5000)
        });
    } else if (tweetLength > 140) {
      $("#cognito").text("You cannot tweet more than 140 characters").css( "display")
      $("#cognito").slideToggle("fast", function () {
        $("#cognito").fadeOut(5000)
      });
    } else {
      $.ajax("/tweets", { method: "POST", data : $(this).serialize()})
        .then(function() {
          $('#text').val('')
          loadTweets()}

      );
    }
  });

  function renderTweets(tweets) {
    for (let id of tweets) {
      $(".tweets").prepend(createTweetElement(id));
    }
  }

  // fetching tweets from localhost:8080/tweets
  function loadTweets() {
    $.ajax('/tweets', { method: 'GET' })
        .then(function(data) {
          $(".tweets").empty()
          renderTweets(data)
        });
  };

  loadTweets();

});






