const {mdLinks} = require('../index.js');

const path= "../README.md";
const options = { validate: true };

describe('mdLinks', () => {
  it('deberia retornar una promesa que se resuelve con un array de objetos', (done) => {
    const result = mdLinks(path, options)
    expect (result).resolves.toEqual([

    ]).then(done);    
  });
});
