
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

export default{
  getJwtToken,
  setJwtToken,
  updateJwtToken,
  removeJwtToken
};