'use strict';

// alert('Hello');

/*
    "image_url": "http://3.bp.blogspot.com/_DBYF1AdFaHw/TE-f0cDQ24I/AAAAAAAACZg/l-FdTZ6M7z8/s1600/Unicorn_and_Narwhal_by_dinglehopper.jpg",
    "title": "UniWhal",
    "description": "A unicorn and a narwhal nuzzling their horns",
    "keyword": "narwhal",
    "horns": 1
*/

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
  console.log('Hello this is render', this);
  let source = $('#photo-template').html();
  // compile the template
  let template = Handlebars.compile(source);
  // return the filled template
  return template(this);
}

$.get('./data/page-1.json').then(data => {
  // .get is a promise because it's a data fetching thing.
  // .get is going to go off and grab the data, and when that finishes, THEN, it's going to take the contents retrieved from page-1.json and give it to the function defined in .then ... and we're call all that data passed into .then "data".
  data.forEach(item => {
    // console.log(item);
    let horn = new Horn(item);
    // horn.render() only works because of return template(this) above in the protype.
    $('#append-here').append(horn.render())
  })
  // console.log(data[1]);
});
