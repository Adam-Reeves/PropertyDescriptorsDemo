const fetch = require('node-fetch');

// 1.
function makeGetRequest(resource) {
  console.log(this);
  fetch(`${this.baseUrl}/${resource}`, {method: 'GET', headers: this.headers})
  .then(response => response.json())
  .then(data => console.log(data));
}

// 2.
const pokemonApi = {
  baseUrl: 'https://pokeapi.co/api/v2',
  makeRequest: makeGetRequest
}

// 3.
Object.defineProperty(pokemonApi, 'headers', { 
  value: {
    'Content-Type': 'application/json'
  },
  enumerable: false, 
  writable: false, 
  configurable: false 
});

// 4.
Object.defineProperty(pokemonApi, 'pokemonName', {
  get() {
    if(pokemonApi._pokemonName) {
      makeGetRequest.call(pokemonApi, `pokemon/${pokemonApi._pokemonName}`);
    }
  },
  set(pokemonName) {
      pokemonApi._pokemonName = pokemonName;
  }
});

// 5.
Object.defineProperties(pokemonApi, {
  'baseUrl': { 
    writable: false, 
    configurable: false 
  },
  'makeRequest': {
    writable: false, 
    configurable: false
  }
});

// 6.
pokemonApi.pokemonName = 'charizard';


// 7.
pokemonApi.pokemonName;