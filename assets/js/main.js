window.globals = [];
window.globals.quotes = [
"I really believe my resources are best used to help projects that make the world suck less.",
"Stay hungry. Stay foolish.",
"I try to get a vision of the future, and then I try to figure out where the discontinuities are.",
"You must be the change you wish to see in the world.",
"Simplicity is the ultimate sophistication.",
"You should bring something into the world that wasn't in the world before.",
"When you do things right, people won't be sure you've done anything at all.",
"If people are good only because they fear punishment and hope for reward, then we are a sorry lot indeed.",
];

window.globals.people = [
"Alexis Ohanian",
"Steve Jobs",
"Nolan Bushnell",
"Mahatma Gandhi",
"Leonardo Da Vinci",
"Ricky Gervais",
"God to Bender, Futurama, S03E20",
"Albert Einstein",
];

// Hide modal window
function hideModalWindow() {
$("#modal-wrap").removeClass("show");

$("#input-name").val('');
$("#input-email").val('');
$("#input-phone").val('');
$("#input-msg").val('');
}

// Add a random quote from above to the About Me page
function showRandQuote() {
  var index = Math.floor(Math.random() * window.globals.quotes.length);
  $("#quote").text(window.globals.quotes[index]);
  $("#quote-author").text("- " + window.globals.people[index]);
}

// AJAX call to verify the form and send me an email
function sendEmail() {
$("#submit-li").addClass("loading");

var name = $("#input-name").val();
var email = $("#input-email").val();
var phone = $("#input-phone").val();
var msg = $("#input-msg").val();

var string = "name=" + name + "&email=" + email + "&phone=" + phone + "&msg=" + msg;

$.post("email.php", string,
  function(data) {
    var obj = JSON && JSON.parse(data) || $.parseJSON(data);

    if (obj['status'] == "success") {
      $("#form-msg").text("Thanks! I'll get back to you ASAP!");
      setTimeout(hideModalWindow, 2000);
    } else if (obj['status'] == "error") {
      $("#form-msg").text("Looks like there was a problem sending the email...please try refreshing the page and trying again. Sorry about this!");
    }

    $("#submit-li").removeClass("loading");
  }
);
}

$(window).on('hashchange', function() {
if (window.location.hash != "") {
  $("#home").removeClass("show");
} else {
  showRandQuote();
  $("#home").addClass("show");
}
});

$(document).ready(function() {
  // Handle open/closing of project descriptions
  $(".toggle").click(function() {
    var extra = $(this).parent().siblings(".extra");
    if (extra.is(":visible")) {
      extra.slideUp();
      $(this).removeClass("open");
    } else {
      extra.slideDown();
      $(this).addClass("open");
    }
  });

  fetch("https://brillicity.com/wp-json/wp/v2/posts?page=1&per_page=1").then((res) => {
    return res.json();
  }).then((json) => {
    $(".latest-post").html('<a href="' + json[0]['link'] + '">' + json[0]['title']['rendered'] + '</a>');
  });

  // Highlight inset project picture
  $(".project-list li .title a").hover(function() {
    $(this).parent().parent().siblings(".thumb").addClass("hover");
  }, function() {
    $(this).parent().parent().siblings(".thumb").removeClass("hover");
  });

  showRandQuote();

  if (window.location.hash == "") {
    $("#home").addClass("show");
  }
});