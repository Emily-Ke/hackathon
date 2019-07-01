const express = require('express');
const morgan = require('morgan');
const axios = require('axios');

const app = express();

var cache = [];
var paintingIds = [
  436524,436533,436528,436122,435882,436535,436532,436529,437984,436947,
  436155,438817,436144,436965,436135,436159,436126,436121,436157,436141,
  459193,336327,436527,436530,436531,436526,437980,436536,333914,438722,
  436525,436534,335537,335538,335536,336318,436176,437042,437998,438144
];
var requestLinks =
  paintingIds
    .map(id => `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
var promiseArray =
  requestLinks.map(link => axios.get(link));

axios
  .all(promiseArray)
  .then(results => {
    cache = results.map(result => {
      return {
        title: result.data.title,
        artist: result.data.artistDisplayName,
        imgUrl: result.data.primaryImageSmall,
        id: result.data.objectID
      }
    });
  })
  .catch(err => console.log(err));


app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.static('dist'));


app.get('/paintings', (req, res) => {
  if(cache.length > 0) {
    res.json(cache);
  }
  else {
    axios
      .all(promiseArray)
      .then(results => {
        cache = results.map(result => {
          return {
            title: result.data.title,
            artist: result.data.artistDisplayName,
            imgUrl: result.data.primaryImageSmall,
            id: result.data.objectID
          }
        });
        res.json(cache);
      })
      .catch(err => console.log(err));
  }
});

app.get('/quote', (req, res) => {
  axios
    .get('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1')
    .then(response => {
      res.json({
        quote: removeEncoding(response.data[0].content
          .replace(/<[^>]*>/g, '').replace(/\n/g, '').replace(/[ \t]+$/, '')),
        speaker: removeEncoding(response.data[0].title),
        id: response.data[0].ID
      });
    })
    .catch(err => console.log(err));
});

app.get('/*', (req, res) => res.status(404).json({ error: "file not found" }));

function removeEncoding(str) {
  return str
  .replace(/&#038;/g, '&')
  .replace(/&#8211;/g, '-')
  .replace(/&#8217;/g, "'")
  .replace(/&#8220;|&#8221;/g, '"')
  .replace(/&#8230;/g, '...');
}

module.exports = app;
