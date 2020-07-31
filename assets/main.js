// Info Toggle
//////////////////////////////////////////////////////////////////////////////
function openInfo() {
  $('.header__toggle').height($('.header__info').outerHeight(true));
  $('#open, #close').toggle();
}

function closeInfo() {
  $('.header__toggle').height('0');
  $('#open, #close').toggle();
}


// Color Toggle
//////////////////////////////////////////////////////////////////////////////
function toggleColor() {
  var dark = getCookie('dark');
  if (dark == 'true') {
    setCookie('dark', false, 365);
    $('body').removeClass().addClass('light');
  } else {
    setCookie('dark', true, 365);
    $('body').removeClass().addClass('dark');
  };
}

$(document).ready( function() {
  var dark = getCookie('dark');
  if (dark == 'true') {
    $('body').removeClass('light').addClass('dark')
  };
  setTimeout( function() {
    $('.preload').removeClass('preload');
  }, 20);
});

// Let images fill
//////////////////////////////////////////////////////////////////////////////
$(window).on("load", function() {
  $('.project__image--flex').each( function() {
    var img = $(this).children('img:first');
    var width = img.prop('naturalWidth');
    var height = img.prop('naturalHeight');
    var ratio = width / height;
    $(this).css('flex-grow', ratio);
  });
});

// Basic Cookie Functions
//////////////////////////////////////////////////////////////////////////////
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function deleteCookie(cname) {
  document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Control Popup
//////////////////////////////////////////////////////////////////////////////
function showCookieBar() {
  document.getElementById('cookieBar').style.display = 'block';
}

function hideCookieBar() {
  document.getElementById('cookieBar').style.display = 'none';
  setCookie('alertSeen', true, 365);
}

// Fire on Load
//////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function() {
  var seen = getCookie('alertSeen');
  if (seen == '' || seen == null) {
    showCookieBar();
  }
});
