
const files = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    checked: true,    
    title: "Terminator",   
    extension: "txt", 
    fileSize: 43234,
    modifiedDate: "2018-01-03T19:04:28.809Z",    
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    checked: true, 
    title: "Die Hard",     
    extension: "zip", 
    fileSize: 253234,
    modifiedDate: "2018-04-03T19:04:28.809Z",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    checked: false,
    title: "Get Out",
    extension: "tar", 
    fileSize: 1114,
    modifiedDate: "2019-01-03T19:04:28.809Z",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    checked: true,
    title: "Trip to Italy",
    extension: "tar", 
    fileSize: 1114,
    modifiedDate: "2019-01-03T19:04:28.809Z",
  }  
];

export function getFiles() {
  return files;
}

export function getFile(id) {
  return files.find(m => m._id === id);
}

export function saveFile(file) {
  let fileInDb = files.find(m => m._id === file._id) || {};
  fileInDb.checked = file.checked;
  fileInDb.title = file.title;
  fileInDb.extension = file.extension;
  fileInDb.fileSize = file.fileSize;
  fileInDb.modifiedDate = Date.now().toString();

  if (!fileInDb._id) {
    fileInDb._id = Date.now().toString();
    files.push(fileInDb);
  }
  return fileInDb;
}

export function deleteFile(id) {
  let fileInDb = files.find(m => m._id === id);
  files.splice(files.indexOf(fileInDb), 1);
  return fileInDb;
}
