const {mdLinks} = require('../index.js');


describe('mdLinks',()=>{
  it("debería retornar una promesa que se resuelva con un array de objetos", () => {
    const path = "../README.md";
    const options = { validate: true };

    return mdLinks(path, options).then((res) => {
      expect(array.isArray(res)).toBe(true); //confirmar que es un array

      //cada elemento debe ser un objeto
      res.forEach((link) => {
        expect(link).toHaveProperty("href");
        expect(link).toHaveProperty("text");
        expect(link).toHaveProperty("status");
        expect(link).toHaveProperty("statusText");
      });
    });
  });
});