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
    console.log(blogs[i]);
    var template = document.getElementById('blog').innerHTML;
    var rendered = Mustache.render(template, {
      img: blogs[i].img,
      tittle: blogs[i].tittle,
      name: blogs[i].name,
      id: blogs[i].id,
      des: blogs[i].des,
    });
    $('.containrbtn').before(rendered);
  }
});
function chengeblogs(i) {
  $('.containr').remove();
  i *= 10;
  let end = i + 10;
  for (; i < end; i++) {
    if (blogs[i] === undefined) {
      // break;
    } else {
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
  window.location.href = '/blog?id=' + 10;
}

function addBlog() {
  $.ajax({
    url: '/blog/create/' + localStorage.id,
    // data: { signature: authHeader },
    type: 'GET',
    headers: { authorization: `bearer ${localStorage.token}` },
    success: function (data) {
      console.log(data)
      if (data === 'not the same user') {
        alert('not the same user');
      } else if (data === 'please login or singup') {
        alert('login please');
      } else {
        window.location.href = '/blog/create';
      }
    },
    error: function (err) {
      console.log(err);
    },
  });

}

// localStorage.id = 1;
// console.log(localStorage.token);
