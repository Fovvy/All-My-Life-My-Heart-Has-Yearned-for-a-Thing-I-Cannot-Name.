const api = "https://poetrydb.org/author,title/Shakespeare;Sonnet";
const sonnetArticle = document.getElementById('sonnet');

let sonnets = [];
const shakespeareImg = document.getElementById('shakespeare');

const featherContainer = document.getElementById('feather-container');

function displaySonnet(sonnetObj) {
  const title = sonnetObj.title;
  const lines = sonnetObj.lines;

  const htmlTitle = `<strong>${title}</strong>`;
  const htmlLines = lines.map(l => `${l}<br>`).join('');
  sonnetArticle.innerHTML = htmlTitle + htmlLines;
}

function getRandomSonnet(firstLoad) {
  featherContainer.style.display = 'block';
  sonnetArticle.innerHTML = '';
  const rand = Math.floor(Math.random() * sonnets.length);
  const sonnet = sonnets[rand];
  const delay = firstLoad ? 0 : 2000;
  setTimeout(function () {
    featherContainer.style.display = 'none';
    displaySonnet(sonnet);
  }, delay);
}

fetch(api, {
  method: "GET" }).
then(res => res.json()).
then(data => {
  sonnets = data;
  getRandomSonnet(true);
  return sonnets;
});

shakespeareImg.addEventListener('click', () => getRandomSonnet(false));