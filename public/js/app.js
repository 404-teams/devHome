function show(indx) {
  $(`#detSec${indx}`).toggle();
}

$(document).ready(function () {
  for (var i = 0; i < 20; i++) {
    $(`#detSec${i}`).hide();
  }
});

for (var i = 0; i < 20; i++) {
  var str = $(`#jobDes${i}`).text();
  $(`#jobDes${i}`).html(str);
}
$('form').each(function (i, e) {
  $(this).submit(function (event) {

    $.ajax({
      url: '/jobs/save/'+localStorage.id,
      data: {
        type: event.target.type.value,
        company_logo: event.target.company_logo.value,
        company: event.target.company.value,
        company_url: event.target.company_url.value,
        location: event.target.location.value,
        title: event.target.title.value,
        description: event.target.description.value,
      },
      type: 'POST',
      headers: { authorization: `bearer ${localStorage.token}` },
      success: function (data) {
        if (data === 'not the same user') {
          alert('not the same user');
        } else if (data === 'please login or singup') {
          alert('login please');
        } else {
            alert('done')
        }
      },
      error: function (err) {
        console.log(err);
      },
    });
    console.log('jsfdsfjkl');
  });

});

// ------------------------------------
let data;
$(function () {
  data = $('#serverJobs').text();
  data = JSON.parse(data);
  btns = data.length / 10 + (data.length % 10 > 0 ? 1 : 0);
  btns = Math.floor(btns);
  for (let i = 0; i < btns; i++) {
    var template = document.getElementById('btn').innerHTML;
    var rendered = Mustache.render(template, {
      index: i,
      number: i + 1,
    });
    $(rendered).appendTo('.containrbtn');
  }
  //   for (let i = 0; i < 10; i++) {
  //     console.log(data[i]);
  //     var template = document.getElementById('blog').innerHTML;
  //     var rendered = Mustache.render(template, {
  //       img: data[i].img,
  //       tittle: data[i].tittle,
  //       name: data[i].name,
  //       id: data[i].id,
  //       des: data[i].des,
  //     });
  //     $('.containrbtn').before(rendered);
  //   }
});

// console.log(data);
// alert('dsffsdf');
