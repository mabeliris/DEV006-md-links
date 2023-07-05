const {
  isAbsolute,
  relativeToAbsolute,
  isValidPath,
  isFile,
  getFilesInDirectory,
  
} = require("./functions");
//
const filePath = process.argv[2];


function mdLinks (path,options){
  return new Promise ((resolve,reject) =>{
    let absolutePath;
    const validateLinks=isAbsolute(path); //valida si la ruta es absoluta
    if(validateLinks){
      absolutePath=path;
    }else {
      absolutePath=relativeToAbsolute(filePath); //convierte una ruta relativa a absoluta
      
    }

    isValidPath (absolutePath)
         .then((isValid)=>{
          console.log('la ruta es válida:', isValid); //valida si la ruta existe(es valida)
          resolve(isValid);
         })
         .catch((err)=>{
          console.log ("la ruta no es válida",err);
          reject(err);
         });
        
        isFile(absolutePath)
          .then((isFile)=>{
            if(isFile){
              console.log("es archivo")
              resolve(isFile);
            }else{
              console.log("es directorio")
              getFilesInDirectory(absolutePath)
              .then((filePaths)=>{
                console.log("archivos disponibles");
                console.log(filePaths)
                resolve(filePaths); // Resuelve la promesa con el resultado obtenido
            })              
              .catch((error)=>{
                console.log("Error:No tiene archivos de extensión .md", error);
                reject(error); // Rechaza la promesa con el error obtenido

              });
            };
          })
          .catch((error)=>{
            console.log("Error:no es archivo", error);
            reject(error); // Rechaza la promesa con el error obtenido
          });
       
         
  });
  
}



mdLinks(filePath)
.then((res)=>console.log(res))
.catch((err)=>console.log(err));


/*module.exports = () => {
  // ...
};*/
