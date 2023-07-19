const {
  isAbsolute,
  relativeToAbsolute,
  isValidPath,
  isFile,
  getFilesInDirectory,
  readFileMd,  
  validateMd,
} = require("./functions.js");

const filePath = process.argv[2];



function mdLinks (path, options){
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
          if(!isValid){
            reject(new Error("La ruta no es válida"));
          }
          return isFile(absolutePath);
         })
         .then((isFile)=>{
          if(!isFile){
            console.log("Es directorio");
            return getFilesInDirectory(absolutePath);
          }
           console.log("Es archivo");
           return readFileMd(absolutePath);
         })
         .then((links)=>{
          if (options && options.validate) {
            return validateMd(links);
          }

          return links;  

         })
         .then((result)=>{
          resolve(result);
         })
         .catch((error)=>{
           reject(error);
         });        
         
  });
  
}


        

const result = mdLinks(filePath, { validate: false });
result
  .then((res) => {
    console.log("identificar aqui ****",res );
    return res;
  })
  .catch((err) => {
    //console.error(err);
    return err;
  });

module.exports = {
  mdLinks,
};
