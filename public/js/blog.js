'use strict';
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
let ids = 1;
let userId = 0;
function myFunction() {
  document.getElementById('myDropdown').classList.toggle('show');
}
window.addEventListener('click', function (e) {
  let s = e.target.id;
  if (s !== 'blog' && s !== 'color' && s !== 'test') {
    userId = s || userId;
  }
  // if (!e.target.matches('.dropbtn')) {
  //     var myDropdown = document.getElementById('myDropdown');
  //     if (myDropdown.classList.contains('show')) {
  //       myDropdown.classList.remove('show');
  //     }
  //   }
});
// Close the dropdown if the user clicks outside of it
window.onclick = function (e) {
  // if (!e.target.matches('.dropbtn')) {
  //   var myDropdown = document.getElementById('myDropdown');
  //   if (myDropdown.classList.contains('show')) {
  //     myDropdown.classList.remove('show');
  //   }
  // }
};
function myFunction1() {
  document.getElementById('myDropdown1').classList.toggle('show1');
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (e) {
  if (!e.target.matches('.dropbtn1')) {
    var myDropdown = document.getElementById('myDropdown1');
    if (myDropdown.classList.contains('show1')) {
      myDropdown.classList.remove('show1');
    }
  }
};

function addItem(type) {
  if (type === 'img') {
    addimgbtn();
  } else {
    var menu = document.getElementById('menu').innerHTML;

    $('div[name="div"]').remove();
    $('.addItem').remove();
    var template = document.getElementById(type).innerHTML;
    var rendered = Mustache.render(template, { ids });
    $('#blog').append(rendered);
    $(menu).appendTo('#blog');
    ids++;
  }
}

function addimgbtn() {
  $('.addItem').remove();
  var template = document.getElementById('addimg').innerHTML;
  var rendered = Mustache.render(template, { ids });
  $('#test').append(rendered);
}

function remove() {
  $('.addItem').remove();
}

function finshImg(event) {
  if (event.keyCode == 13) {
    let url = document.getElementById('imgurl').value;
    var template = document.getElementById('img').innerHTML;
    var rendered = Mustache.render(template, { img: url, ids });
    $('.addItem').remove();
    var menu = document.getElementById('menu').innerHTML;
    $('div[name="div"]').remove();
    $(rendered).appendTo('#blog');
    $(menu).appendTo('#blog');
    ids++;
  }
}

function changeColor() {
  var template = document.getElementById('colorform').innerHTML;
  $(template).appendTo('#blog');
  $('#formc').submit(changeColorForm);
}
function changeColorForm(e) {
  let tag = document.getElementById(userId + '');
  tag.style.color = e.target.color.value;
  $('#formc').remove();
}

function changeFontSize() {
  var template = document.getElementById('fontsize').innerHTML;
  let size = document.getElementById(userId + '').style.fontSize.split('p')[0];
  var rendered = Mustache.render(template, { size });
  $(rendered).appendTo('#blog');
}
function sizech(e) {
  let tag = document.getElementById(userId + '');
  tag.style.fontSize = e.target.value + 'px';
}
function finshSize() {
  $('form[name="size"]').remove();
}

function changeAlign() {
  var template = document.getElementById('fontplace').innerHTML;
  $(template).appendTo('#blog');
}
function plChange(e) {
  let tag = document.getElementById(userId + '');
  tag.style.textAlign = e.target.value;
}

function finshPlace() {
  $('form[name="place"]').remove();
}

function changeImage() {
  var template = document.getElementById('imgsize').innerHTML;
  let wsize = document.getElementById(userId + '').style.width.split('p')[0];
  let hsize = document.getElementById(userId + '').style.height.split('p')[0];
  var rendered = Mustache.render(template, { wsize, hsize });
  $(rendered).appendTo('#blog');
}
function sizechimg(e) {
  let tag = document.getElementById(userId + '');
  tag.style[e.target.name] = e.target.value + 'px';
}

function changeDisplay() {
  var template = document.getElementById('display').innerHTML;
  var rendered = Mustache.render(template);
  $(rendered).appendTo('#blog');
}
function finshblock() {
  $('form[name="display"]').remove();
}

function diChange(e) {
  if (e.target.value !== 'position') {
    let tag = document.getElementById(userId + '');
    tag.style.display = e.target.value;
    document.getElementById(userId + '').style.position = 'unset';
    $("form[name='position']").remove();
  } else {
    var template = document.getElementById('position').innerHTML;
    let tag = document.getElementById(userId + '');
    var rendered = Mustache.render(template, {
      top: tag.clientTop,
      left: tag.clientLeft,
    });
    document.getElementById(userId + '').style.position = 'relative';
    $(rendered).appendTo('form[name="display"]');
  }
}

function finshposition() {
  $("form[name='position']").remove();
}

function elementPostion(e) {
  let tag = document.getElementById(userId + '');
  tag.style[e.target.name] = e.target.value + 'px';
}

function done() {
  $('#blog').find('*[contenteditable]').attr('contenteditable', 'false');
  $('button[name="doneall"]').remove();
  $('div').remove();
  let blog = $('#blog')[0].outerHTML;
  let tittle = $('#blog').find('h1')[0].textContent;
  let des =
    $('#blog').find('p').length > 0 ? $('#blog').find('p')[0].textContent : '';
  let img =
    $('#blog').find('img').length > 0
      ? $('#blog').find('img')[0].src
      : 'https://www.knstek.com/wp-content/uploads/2012/12/default_blog_large.png';
  $.post('/blog/create', { blog, tittle, img, des, id: 1 }, function (s) {
    window.location.href = '/blog?id=' + s.id;
  });
}
var menu = document.getElementById('menu').innerHTML;
$(menu).appendTo('#blog');
