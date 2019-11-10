'use strict';

let allHorns = [];

function Horn(horn) {
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
  allHorns.push(this);
}

Horn.prototype.render = function() {
  // get the template
  // console.log('Hello this is render', this);
  let source = $('#photo-template').html();
  // compile the template
  let template = Handlebars.compile(source);
  // return the filled template
  return template(this);
}

$('#page-1').on('click', getPage1Images);
$('#page-2').on('click', getPage2Images);

$('select').on('change', function(){
  let pickedThing = $(this).val()
  $(`div[id=append-here`).children().css('background-color', 'red');
  $(`div[class=${pickedThing}]`).parent().css('background-color', 'yellow');
})

function getPage1Images() {
  $('#append-here').empty();
  $('select').empty();
  $('select').append(`<option value="default">Filter by Keyword</option>`);
  $.get('./data/page-1.json').then(data => {
    // .get is a promise because it's a data fetching thing.
    // .get is going to go off and grab the data, and when that finishes, THEN, it's going to take the contents retrieved from page-1.json and give it to the function defined in .then ... and we're call all that data passed into .then "data".
    data.forEach(item => {
      // console.log(item);
      let horn = new Horn(item);
      // horn.render() only works because of return template(this) above in the protype.
      $('#append-here').append(horn.render());
      $('select').append(`<option value=${horn.keyword}>${horn.keyword}</option>`);
    })
    // console.log(data[1]);
  });
}

function getPage2Images() {
  $('#append-here').empty();
  $('select').empty();
  $('select').append(`<option value="default">Filter by Keyword</option>`);
  $.get('./data/page-2.json').then(data => {
    data.forEach(item => {
      let horn = new Horn(item);
      $('#append-here').append(horn.render());
      $('select').append(`<option value=${horn.keyword}>${horn.keyword}</option>`);
    })
  });
}

