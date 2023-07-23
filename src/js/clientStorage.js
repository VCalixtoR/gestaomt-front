
function removeJwtToken() {
  localStorage.removeItem('jwtLocal');
  sessionStorage.removeItem('jwtSession');
}

function setJwtToken(jwtToken, jwtKeep) {
  if(jwtKeep){
    window.localStorage.setItem('jwtLocal', jwtToken);
    window.sessionStorage.removeItem('jwtSession');
  }
  else{
    window.localStorage.removeItem('jwtLocal');
    window.sessionStorage.setItem('jwtSession', jwtToken);
  }
}

function updateJwtToken(jwtToken) {

  let jwtLocal = window.localStorage.getItem('jwtLocal');

  if(jwtLocal != null && jwtLocal != 'null'){
    window.localStorage.setItem('jwtLocal', jwtToken);
    window.sessionStorage.removeItem('jwtSession');
  }
  else{
    window.localStorage.removeItem('jwtLocal');
    window.sessionStorage.setItem('jwtSession', jwtToken);
  }
}

function getJwtToken() {

  let jwtLocal = window.localStorage.getItem('jwtLocal');
  let jwtSession = window.sessionStorage.getItem('jwtSession');

  return (
    jwtLocal != null && jwtLocal != 'null' ? jwtLocal : (
      jwtSession != null && jwtSession != 'null' ? jwtSession : null
  ));
}

function getSessionItem(label) {

  if(typeof label === 'string' && label != 'jwtLocal' && label != 'jwtSession'){
    let value = window.sessionStorage.getItem(label);
    return value != null && value != 'null' ? value : null;
  }
  else{
    console.log(`WARNING: invalid item label to get from session: ${label}`);
    return null;
  }
}

function setSessionItem(label, value) {

  if(typeof label === 'string' && label != 'jwtLocal' && label != 'jwtSession'){

    if(typeof value === 'string'){
      window.sessionStorage.setItem(label, value);
    }
    else{
      console.log(`WARNING: invalid item value type to store in session: ${typeof value}`);
    }
  }
  else{
    console.log(`WARNING: invalid item label to store in session: ${label}`);
  }
}

export default{
  getJwtToken,
  setJwtToken,
  updateJwtToken,
  removeJwtToken,
  getSessionItem,
  setSessionItem
};