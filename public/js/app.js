let data;
$(function () {
  data = $('#serverJobs').text();
  data = JSON.parse(data);
  // console.log(data)
  btns = data.length / 20 + (data.length % 20 > 0 ? 1 : 0);
  btns = Math.floor(btns);
  for (let i = 0; i < btns; i++) {
    var template = document.getElementById('btn').innerHTML;
    var rendered = Mustache.render(template, {
      index: i,
      number: i + 1,
    });
    $(rendered).appendTo('.containrbtn');
  }
  for (let i = 0; i < 20; i++) {
    var template = document.getElementById('job').innerHTML;
    var rendered = Mustache.render(template, {
      company_logo: data[i].company_logo,
      type: data[i].type,
      company: data[i].company,
      company_url: data[i].company_url,
      location: data[i].location,
      title: data[i].title,
      indx: i,
      number: i + 1,
    });
    $(rendered).appendTo('#sec2');

    $(data[i].description).appendTo('#jobDes' + i);
  }
  hide(0);
  addForm();
 

});

function show(indx) {
  $(`#detSec${indx}`).toggle();
}
function hide(i) {
  console.log(i);
  let end = i + 20;
  for (; i < end; i++) {
    $(`#detSec${i}`).hide();
  }
}
// console.log(data);
// alert('dsffsdf');
function addForm() {
  $('form[name="addjob"]').each(function (i, e) {
    $(this).submit(function (event) {
      $.ajax({
        url: '/jobs/save/' + localStorage.id,
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
            alert('done');
          }
        },
        error: function (err) {
          console.log(err);
        },
      });
    });
  });
}
function chengeJobs(i) {
  console.log(i, 'fist');
  $('#sec2').empty();
  if (i < 100) {
    i *= 20;
  } else {
    i += 20;
  }
  let end = i + 20;
  for (; i < end; i++) {
    if (data[i] === undefined) {
      // break;
    } else {
      var template = document.getElementById('job').innerHTML;
      var rendered = Mustache.render(template, {
        company_logo: data[i].company_logo,
        type: data[i].type,
        company: data[i].company,
        company_url: data[i].company_url,
        location: data[i].location,
        title: data[i].title,
        indx: i,
        number: i + 1,
      });
      $(rendered).appendTo('#sec2');
      $(data[i].description).appendTo('#jobDes' + i);
    }
  }
  hide(i - 20);
  window.scrollTo(0, 0);
}

$('#searchjob').submit(function (event) {
  $.get(
    `/jobs?description=${event.target.description.value}&type=${event.target.type.value}&location=${event.target.location.value}`
  ).then((resulte) => {
    data = resulte;
    chengeJobs(0);
  });
  // console.log(event.target);
});

function savedjobs() {
  // $.get('/jobs/user/'+localStorage.id).then(data=>{
  //   console.log(data)
  // })
  $.ajax({
    type: 'GET',
    headers: {
      Authorization: `bearer ${localStorage.token}`,
    },
    url: '/jobs/user/' + localStorage.id,
    success: function (msg) {
      console.log(msg.rows)
      data = msg.rows
      chengeJobs(0);
    },
  });
  // $.ajax({
  //   type: "GET",
  //   beforeSend: function(request) {
  //     request.setRequestHeader("Authority", `bearer ${localStorage.token}`);
  //   },
  //   url: '/jobs/user/'+localStorage.id,
  //   success: function(msg) {
  //    console.log(msh)
  //   }
  // });
}
