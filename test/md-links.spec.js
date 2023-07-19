const { mdLinks } = require('../index.js');
const { isValidPath,isAbsolute }= require('../functions.js')

describe("isAbsolute",()=>{
  it("is function",()=>{
    expect(typeof isAbsolute).toBe("function");
  })
});

describe("IsValidPath", () => {
  it("is function", () => {
    expect(typeof isValidPath).toBe("function");
  });
});


const filePath = "./prueba.md";/*"C:Users\\mabelle\\DEV006-md-links\\prueba.md"*/;
const options = { validate: true };

describe("mdLinks", () => {
  it("deberia retornar una proomesa que se resuelve con un array de objetos", () => {
   const result =mdLinks(filePath, options);
    expect(result).resolves.toEqual([
        {
          texto: "Markdown",
          href: "https://es.wikipedia.org/wiki/Markdown",
          path: "C:\\Users\\mabelle\\DEV006-md-links\\prueba.md",
          status: 200,
          statusText: "OK",
        },
        /*{
          texto: "Markdown",
          href: "https://es.wikipedia.org/wiki/Markdown",
          path: "C:\\Users\\mabelle\\DEV006-md-links\\prueba.md",
          status: 200,
          statusText: "OK",
        },*/
      ]) 
  });
});

/*describe("mdLinks", () => {
  it("should return promise that resolves as an array", (done) => {
    mdLinks(filePath, options)
      .then((result) => {
        console.log("la ruta es válida:", true); // La ruta existe y es válida
        expect(result).toEqual([
          {
            texto: "Markdown",
            href: "https://es.wikipedia.org/wiki/Markdown",
            path: "C:\\Users\\mabelle\\DEV006-md-links\\prueba.md",
            status: 200,
            statusText: "ok",
          },
          {
            texto: "Markdown",
            href: "https://es.wikipedia.org/wiki/Markdown",
            path: "C:\\Users\\mabelle\\DEV006-md-links\\prueba.md",
            status: 404,
            statusText: "fail",
          },
          // ... tus resultados esperados aquí ...
        ]);
        done(); // la prueba asíncrona ha finalizado correctamente.
      })
      .catch((error) => {
        console.log("la ruta es válida:", false); // La ruta no es válida
        done(error); // Si hay un error, pásalo como argumento a done.
      });
  });
});*/