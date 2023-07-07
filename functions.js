const path = require ('path');
const fs= require ('fs');
const axios = require("axios");
//const { url } = require('inspector');
//const { match } = require('assert');


function isAbsolute(route){
    return path.isAbsolute(route)
}

function relativeToAbsolute (route){
    return path.resolve(route)
}
console.log(relativeToAbsolute)

function isValidPath(route) {
  return new Promise((resolve) => {
    fs.access(route, fs.constants.F_OK, (err) => {
      if (err) {
        resolve(false); // La ruta no es válida
      } else {
        resolve(true); // La ruta es válida
      }
    });
  });
}

function isFile(route) {
  return new Promise((resolve, reject) => {
    fs.stat(route, (error, stats) => {
      if (error) {
        reject(error); // Rechaza la promesa con el error
      } else if (stats.isFile()) {
        resolve(true); // Resuelve la promesa como true si es un archivo
      } else if (stats.isDirectory()) {
        resolve(false); // Resuelve la promesa como false si es un directorio
      }
    });
  });
}



function getFilesInDirectory(directoryPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        reject(err); // Rechaza la promesa si hay un error al leer el directorio
      } else {
        const filePaths = files.map((file) => path.join(directoryPath, file));  
        files.filter ((filePath)=>path.extname(filePath)===".md");//obtener archivos con extension ".md"   

        resolve(filePaths);
      }

    });
  });
}

function readFileMd(fileMd){
    return new Promise((resolve, reject) => {
      
       const links = []; 
        fs.readFile(fileMd, "utf8", (err,data)=>{
          if(err){
            reject("Error al leer el archivo")

          }else{
            //contiene links? extraelos...
            const regex = /\[(.*)\]\((https?:\/\/[\w\d./?=#]+)\)/g;
            const matches = data.matchAll(regex);
            console.log("aqui",matches);

              

              for (const match of matches) {
                const texto = match[1];
                const url = match[2];
                links.push({ texto, url });
                
              }
                console.log("esta es", links);
                return links;
              
          } resolve (links);
          console.log("Estos son los links:", links);
        })
    })
    
}











readFileMd("README.md");

module.exports = {
  isAbsolute,
  relativeToAbsolute,
  isValidPath,
  isFile,  
  getFilesInDirectory,
  readFileMd,
};