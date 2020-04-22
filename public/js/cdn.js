let data;
let btns;
$(function () {
  data = JSON.parse($('#cdnsser').text());
  btns = data.length / 10 + (data.length % 10 > 0 ? 1 : 0);
  btns = Math.floor(btns);
  addbtns();
  addcdntem(0);
});

function addbtns() {
    btns = data.length / 10 + (data.length % 10 > 0 ? 1 : 0);
    btns = Math.floor(btns);
  $('.containrbtn').empty();
  for (let i = 0; i < btns; i++) {
    var template = document.getElementById('btn').innerHTML;
    var rendered = Mustache.render(template, {
      index: i,
      number: i + 1,
    });
    $(rendered).appendTo('.containrbtn');
  }
}

function addcdntem(i) {
  $('.flex-col').empty();
  if (i !== 0) {
    i += 10;
  }
  let end = i + 10;
  for (i; i < end; i++) {
    if (data[i] === undefined) {
      break;
    }
    if (typeof data[i].keywords === 'string') {
      data[i].keywords = data[i].keywords.split(',');
    }
    var template = document.getElementById('cdntemp').innerHTML;
    var rendered = Mustache.render(template, {
      name: data[i].name,
      latest: data[i].latest,
      keywords0: data[i].keywords[0],
      keywords1: data[i].keywords[1],
      keywords2: data[i].keywords[2],
      description: data[i].description,
      filename: data[i].filename,
      author: data[i].author,
      version: data[i].version,
    });
    $(rendered).appendTo('.flex-col');
  }
  addForm();
}

$('#searchs').submit(function (event) {
  $.get('/cdns/search?search_query=' + event.target.cdnsearch.value, function (
    results
  ) {
    data = results;
    addbtns();
    addcdntem(0);
  });
  $('#cdnsearch').val('')
});

function addForm() {
  $('form[name="savescdn"]').each(function (i, e) {
    $(this).submit(function (event) {
      $.ajax({
        url: '/cdns/save/' + localStorage.id,
        data: {
          name: event.target.name.value,
          latest: event.target.latest.value,
          description: event.target.description.value,
          filename: event.target.filename.value,
          author: event.target.author.value,
          version: event.target.version.value,
          keywords: `${event.target.keywords0.value},${event.target.keywords1.value},${event.target.keywords2.value}`,
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

function seesavevalue() {
  $.ajax({
    url: '/cdns/user/' + localStorage.id,
    type: 'GET',
    headers: { authorization: `bearer ${localStorage.token}` },
    success: function (data1) {
      if (data === 'not the same user') {
        alert('not the same user');
      } else if (data === 'please login or singup') {
        alert('login please');
      } else {
        data = data1.rows;
        addbtns();
        addcdntem(0);
      }
    },
    error: function (err) {
      console.log(err);
    },
  });
}
