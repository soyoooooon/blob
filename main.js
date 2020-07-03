const endPoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';


const cities = [];

fetch(endPoint)
     .then(blob => blob.json())
     .then(data => cities.push(...data));

//the blob has to be convert to from raw data that is in to json

function findMatches(wordMatch, cities){
     return cities.filter(place => {
          
     const regex = new RegExp(wordMatch, 'gi');
     return place.city.match(regex) || place.state.match(regex)
     });
}

//g modifier: global. All matches (don't return on first match)
//i modifier: insensitive. Case insensitive match (ignores case of [a-zA-Z])
// 'gi'
//gi


function numberWithCommas(x) {
     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
   }



function displayMatches() {
     
     const matchArray = findMatches(this.value, cities);
     const inHtml = matchArray.map(place => {
     const regex = new RegExp(this.value, 'gi');
     const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
     const stateName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
          return `<li><span class="name">${cityName}, ${stateName}</span>
          <span class="population">${numberWithCommas(place.population)}</span>
          </li>`
     }).join('');
     
     suggestions.innerHTML = inHtml;

}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
//change event only fire when you go off that input

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);