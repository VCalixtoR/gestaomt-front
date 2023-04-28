import Cst from './constants.js';

function isPageOnMobile(){
  let viewportWidth = document.documentElement.clientWidth;
  return viewportWidth <= Cst.VIEWPORT_CHANGE_SIZE;
}

function getJsonKeyTree(json){

  if(json == null){
    return '{}'
  }

  let primaryK = Object.keys(json);
  let first = true;

  let retString = '{';
  
  try{
    primaryK.forEach(pk => {

      if(isNaN(pk)){
        if(first){
          retString += pk;
          first = false;
        }
        else{
          retString += ', ' + pk;
        }

        let innerJson = getJsonKeyTree(json[pk]);
        if(innerJson != '{}'){
          retString += innerJson;
        }
      }
    });
    retString += '}';
  }
  catch(error){
    return 'getJsonKeyTree error: ' + error.message;
  }

  return retString;
}

function getDateString(date, dateDelim = '/'){
  
  // avoid timezone adding 3 hours in ms
  if(typeof date === "string"){
    date = new Date(Date.parse(date)+10800000);
  }
  
  if(date instanceof Date){
    return String(date.getDate()).padStart(2,'0') + dateDelim
      + String(date.getMonth()+1).padStart(2,'0') + dateDelim
      + String(date.getFullYear()).padStart(4,'0');
  }
}

function getDateTimeString(date, dateDelim = '/', hourDelim = ':', avoidTimezone=true){
  
  if(date == null || date == undefined || date == ''){
    return null;
  }

  // avoid timezoud adding 3 hours in ms
  if(avoidTimezone && typeof date === "string"){
    date = new Date(Date.parse(date)+10800000);
  }
  else if(typeof date === "string"){
    date = new Date(Date.parse(date));
  }

  if(date instanceof Date){
    return String(date.getDate()).padStart(2,'0') + dateDelim
      + String(date.getMonth()+1).padStart(2,'0') + dateDelim
      + String(date.getFullYear()).padStart(4,'0') + " "  
      + String(date.getHours()).padStart(2,'0') + hourDelim 
      + String(date.getMinutes()).padStart(2,'0') + hourDelim
      + String(date.getSeconds()).padStart(2,'0');
  }
}

function getCurrencyFormat(number){
  if(number == null){
    number = 0;
  }
  if(typeof number === "string"){
    number = Number(number);
  }
  return number.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

function getNumberFormatFromCurrency(currency){
  if(currency == null || currency == undefined || currency == ''){
    return null;
  }
  return Number(currency.replace(/[^\d,]+/g, '').replace(',', '.'));
}

function getNameFormated(name){
  let tmp = name.split(' ');
  return (tmp[0] + ' ' + (tmp[1] ? ' ' + tmp[1].charAt(0) + '.' + (tmp[2] ? ' ' + tmp[2].charAt(0) + '.' : '') : '')).slice(0, 15).trim();
}

function getTextWidth(txt, font) {
  let element = document.createElement('canvas');
  let context = element.getContext("2d");
  context.font = font;
  return context.measureText(txt).width;
}

export default{
  isPageOnMobile,
  getJsonKeyTree,
  getDateString,
  getDateTimeString,
  getCurrencyFormat,
  getNumberFormatFromCurrency,
  getNameFormated,
  getTextWidth
}