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

// Resize our iframe with its contents heights
function autoResize(id){
  var newHeight = $("#resume-iframe")[0].contentWindow.document.body.scrollHeight + 15;
  $("#resume-iframe").attr("height", newHeight + "px");
}

// Reset iframe height so it doesn't throw off the height of the rest of the page
function resetiFrame(id){
  $("#resume-iframe").attr("height", "0");
}

$(window).on('hashchange', function() {
if (window.location.hash != "") {
  $("#home").removeClass("show");
  // if (window.location.hash == '#about-me') showRandQuote();
  if (window.location.hash == '#resume') autoResize();
  else resetiFrame();
} else {
  showRandQuote();
  $("#home").addClass("show");
  resetiFrame();
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

  $.getJSON("ajax/get_latest_blog_post.php", function(data) {
    $(".latest-post").html('<a href="' + data[0]['link'] + '">' + data[0]['title']['rendered'] + '</a>');
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
  } else if (window.location.hash == "#resume") {
    autoResize();
  }
});