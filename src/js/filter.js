

onProperty () {
    fetch("https://callboard-backend.herokuapp.com/call/specific/property")
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

onTransport () {
    fetch("https://callboard-backend.herokuapp.com/call/specific/transport")
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

onWork () {
    fetch("https://callboard-backend.herokuapp.com/call/specific/work")
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

onElectronics () {
    fetch("https://callboard-backend.herokuapp.com/call/specific/electronics")
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

onbusinessAndServices () {
    fetch("https://callboard-backend.herokuapp.com/call/specific/businessAndServices")
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

onRecreationAndSport () {
    fetch("https://callboard-backend.herokuapp.com/call/specific/recreationAndSport")
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}


onFree () {
    fetch("https://callboard-backend.herokuapp.com/call/specific/free")
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}


onTrade () {
   
    fetch("https://callboard-backend.herokuapp.com/call/specific/trade")
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}


