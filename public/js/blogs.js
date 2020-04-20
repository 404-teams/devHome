let blogs;
let btns;
$(function () {
  blogs = $('#blogs').text();
  blogs = JSON.parse(blogs);
  btns = blogs.length / 10 + (blogs.length % 10 > 0 ? 1 : 0);
  btns = Math.floor(btns);
  for (let i = 0; i < btns; i++) {
    var template = document.getElementById('btn').innerHTML;
    var rendered = Mustache.render(template, {
      index: i,
      number: i + 1,
    });
    $(rendered).appendTo('.containrbtn');
  }
  for (let i = 0; i < 10; i++) {
    var template = document.getElementById('blog').innerHTML;
    var rendered = Mustache.render(template, {
      img: blogs[i].img,
      tittle: blogs[i].tittle,
      name: blogs[i].name,
      id: blogs[i].id,
    });
    $('.containrbtn').before(rendered);
  }
});
function chengeblogs(i) {
  console.log('sfdsf');
  $('.containr').remove();
  i *= 10;
  let end = i + 10;
  for (; i < end; i++) {
    console.log(blogs[i].id);
    if (blogs[i] === undefined) {
      console.log('dsfds');
      // break;
    } else {
      console.log('sfdjlkj');
      var template = document.getElementById('blog').innerHTML;
      var rendered = Mustache.render(template, {
        img: blogs[i].img,
        tittle: blogs[i].tittle,
        name: blogs[i].name,
        id: blogs[i].id,
      });
      $('.containrbtn').before(rendered);
    }
  }
  window.scrollTo(0, 0);
}

function clicked(id) {
  console.log(typeof id);
  window.location.href = '/blog?id=' + id;
}

function addBlog() {
  console.log('sdlkfjlkdsjf');
}

localStorage.id = 1;
