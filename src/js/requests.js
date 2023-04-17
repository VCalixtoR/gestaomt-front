var shajs = require('sha.js')

const base_url = `${process.env.VUE_APP_SERVICE_URL}`

async function baseRequestFBody(headers, endpoint){

  var vreturn = {};

  try{

    vreturn['response'] = await fetch(`${base_url}${endpoint}`, headers).then((response) => {
      return response;
    }).catch(error => {
      throw new Error('Could not reach backend', {cause: error});
    });

    vreturn['status'] = vreturn['response'].status;
    vreturn['statusText'] = vreturn['response']['statusText'];

    let vreturnOk = vreturn['response'].ok;

    if(vreturn['response']){
      vreturn['response'] = await vreturn['response'].text();
    }
    if(vreturn['response']){
      vreturn['response'] = JSON.parse(vreturn['response']);
    }
    
    if(vreturnOk){
      vreturn['ok'] = true;
      return vreturn;
    }

    vreturn['ok'] = false;
    vreturn['location'] = `Return in ${endpoint}`;

    return vreturn;
  }
  catch(error){
    vreturn['ok'] = false;
    vreturn['location'] = `Exception in ${endpoint}`;
    vreturn['message'] = error.message;
    vreturn['error'] = error;

    if(endpoint=='auth-with-token'){
      vreturn['status'] = 401;
    }

    return vreturn;
  }
}

async function doLoginAuthentication(userMail, userPass){

  // password encrypted with SHA-256 algorithm to store in bd
  let userPassHash = shajs('sha256').update(userPass).digest('hex');
  let auth = window.btoa(`${userMail}:${userPassHash}`);
  
  var myHeaders = {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Basic ${auth}`
    }
  }

  let vreturn = await baseRequestFBody(myHeaders, 'auth-with-login');
  return vreturn;
}

async function doTokenAuthentication(old_jwt){
  
  var myHeaders = {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${old_jwt}`
    }
  }

  let vreturn = await baseRequestFBody(myHeaders, 'auth-with-token');
  return vreturn;
}

async function deleteAuthToken(token_jwt, args){

  var myHeaders = {
    method: 'DELETE',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token_jwt}`,
    }
  }

  let vreturn = await baseRequestFBody(myHeaders, `auth-with-token`);
  return vreturn;
}

async function createUser(token_jwt, args){

  let user_name = args[0];
  let user_type = args[1];
  let user_birth_date = args[2];
  let user_cpf = args[3];
  let user_gender = args[4];
  let user_mail = args[5];
  let user_phone_num = args[6];
  let user_hash_password = shajs('sha256').update(args[7]).digest('hex');

  var myHeaders = {
    method: 'PUT',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'user_name': user_name,
      'user_type': user_type,
      'user_birth_date': user_birth_date,
      'user_cpf': user_cpf,
      'user_gender': user_gender,
      'user_mail': user_mail,
      'user_phone_num': user_phone_num,
      'user_hash_password': user_hash_password
    })
  }

  let vreturn = await baseRequestFBody(myHeaders, 'user');
  return vreturn;
}

async function getUser(token_jwt, args){

  let user_id = args[0];

  var myHeaders = {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token_jwt}`,
    }
  }

  var querystring = `?user_id=${user_id}`;

  let vreturn = await baseRequestFBody(myHeaders, `user${querystring}`);
  return vreturn;
}

async function getUsers(token_jwt, args){

  var myHeaders = {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token_jwt}`,
    }
  }

  let vreturn = await baseRequestFBody(myHeaders, `users`);
  return vreturn;
}

async function getPendingUsers(token_jwt, args){

  var myHeaders = {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token_jwt}`,
    }
  }

  let vreturn = await baseRequestFBody(myHeaders, `users/pending`);
  return vreturn;
}

async function allowUser(token_jwt, args){

  let user_id = args[0];

  var myHeaders = {
    method: 'PATCH',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token_jwt}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'user_id': user_id
    })
  }

  let vreturn = await baseRequestFBody(myHeaders, `user/pending`);
  return vreturn;
}

async function rejectUser(token_jwt, args){

  let user_id = args[0];

  var myHeaders = {
    method: 'DELETE',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token_jwt}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'user_id': user_id
    })
  }

  let vreturn = await baseRequestFBody(myHeaders, `user/pending`);
  return vreturn;
}

async function getEmployees(token_jwt, args){

  var myHeaders = {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token_jwt}`,
    }
  }

  let vreturn = await baseRequestFBody(myHeaders, `employees`);
  return vreturn;
}

async function updateEmployee(token_jwt, args){

  let employee_id = args[0];
  let employee_active = args[1];
  let employee_comission = args[2];

  var myHeaders = {
    method: 'PATCH',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token_jwt}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'employee_id': employee_id,
      'active': employee_active,
      'comission': employee_comission
    })
  }

  let vreturn = await baseRequestFBody(myHeaders, `employee`);
  return vreturn;
}

async function getEmployeeSales(token_jwt, args){

  let employee_id = args[0];
  let limit = args[1];
  let offset = args[2];
  let start_date = (args[3] != null ? args[3] : '');
  let end_date = (args[4] != null ? args[4] : '');

  var myHeaders = {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token_jwt}`
    }
  }
  
  var querystring = `?employee_id=${employee_id}&limit=${limit}&offset=${offset}&start_date=${start_date}&end_date=${end_date}`;

  let vreturn = await baseRequestFBody(myHeaders, `employee/sales${querystring}`);
  return vreturn;
}

async function getEmployeeSalesSummary(token_jwt, args){

  let employee_id = args[0];
  let start_date = (args[1] != null ? args[1] : '');
  let end_date = (args[2] != null ? args[2] : '');

  var myHeaders = {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token_jwt}`
    }
  }
  
  var querystring = `?employee_id=${employee_id}&start_date=${start_date}&end_date=${end_date}`;

  let vreturn = await baseRequestFBody(myHeaders, `employee/sales/summary${querystring}`);
  return vreturn;
}

async function getClient(token_jwt, args){

  let client_id = args[0];

  var myHeaders = {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token_jwt}`
    }
  }

  var querystring = `?client_id=${client_id}`;

  let vreturn = await baseRequestFBody(myHeaders, `client${querystring}`);
  return vreturn;
}

async function getClients(token_jwt, args){

  let limit = args[0];
  let offset = args[1];
  let client_name = (args[2] != null ? args[2] : '');
  let children_name = (args[3] != null ? args[3] : '');
  let children_birth_month_day_start = (args[4] != null ? args[4] : '');
  let children_birth_month_day_end = (args[5] != null ? args[5] : '');
  let last_sale_date_start = (args[6] != null ? args[6] : '');
  let last_sale_date_end = (args[7] != null ? args[7] : '');

  var myHeaders = {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token_jwt}`
    }
  }

  var querystring = `?limit=${limit}&offset=${offset}&client_name=${client_name}&children_name=${children_name}&children_birth_month_day_start=${children_birth_month_day_start}&children_birth_month_day_end=${children_birth_month_day_end}&last_sale_date_start=${last_sale_date_start}&last_sale_date_end=${last_sale_date_end}`;

  let vreturn = await baseRequestFBody(myHeaders, `clients${querystring}`);
  return vreturn;
}

async function createClient(token_jwt, args){

  var jsonBody = {};
  jsonBody['client_name'] = args[0];
  if(args[1])
    jsonBody['client_cpf'] = args[1];
  if(args[2])
    jsonBody['client_gender'] = args[2];
  if(args[3])
    jsonBody['client_birth_date'] = args[3];
  if(args[4])
    jsonBody['client_cep'] = args[4];
  if(args[5])
    jsonBody['client_adress'] = args[5];
  if(args[6])
    jsonBody['client_city'] = args[6];
  if(args[7])
    jsonBody['client_neighborhood'] = args[7];
  if(args[8])
    jsonBody['client_state'] = args[8];
  if(args[9])
    jsonBody['client_number'] = args[9];
  if(args[10])
    jsonBody['client_complement'] = args[10];
  if(args[11])
    jsonBody['client_contacts'] = args[11];
  if(args[12])
    jsonBody['client_children'] = args[12];

  var myHeaders = {
    method: 'PUT',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token_jwt}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonBody)
  }

  let vreturn = await baseRequestFBody(myHeaders, 'client');
  return vreturn;
}

async function updateClient(token_jwt, args){

  var jsonBody = {};
  jsonBody['client_id'] = args[0];
  jsonBody['client_name'] = args[1];
  if(args[1])
    jsonBody['client_cpf'] = args[2];
  if(args[2])
    jsonBody['client_gender'] = args[3];
  if(args[3])
    jsonBody['client_birth_date'] = args[4];
  if(args[4])
    jsonBody['client_cep'] = args[5];
  if(args[5])
    jsonBody['client_adress'] = args[6];
  if(args[6])
    jsonBody['client_city'] = args[7];
  if(args[7])
    jsonBody['client_neighborhood'] = args[8];
  if(args[8])
    jsonBody['client_state'] = args[9];
  if(args[9])
    jsonBody['client_number'] = args[10];
  if(args[10])
    jsonBody['client_complement'] = args[11];
  if(args[11])
    jsonBody['client_contacts'] = args[12];
  if(args[12])
    jsonBody['client_children'] = args[13];
  
  var myHeaders = {
    method: 'PATCH',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token_jwt}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonBody)
  }
  
  let vreturn = await baseRequestFBody(myHeaders, `client`);
  return vreturn;
}

async function getProductInfo(token_jwt, _){

  var myHeaders = {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token_jwt}`
    }
  }

  let vreturn = await baseRequestFBody(myHeaders, `product/info`);
  return vreturn;
}

async function createProduct(token_jwt, args){
  
  var jsonBody = {};
  jsonBody['product_code'] = args[0];
  jsonBody['product_name'] = args[1];
  if(args[2])
    jsonBody['product_collection_ids'] = args[2];
  if(args[3])
    jsonBody['product_type_ids'] = args[3];
  jsonBody['customized_products'] = args[4];

  var myHeaders = {
    method: 'PUT',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token_jwt}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonBody)
  }

  let vreturn = await baseRequestFBody(myHeaders, 'product');
  return vreturn;

}

async function getProducts(token_jwt, args){

  let limit = args[0];
  let offset = args[1];

  var querystring = `?limit=${limit}&offset=${offset}`;

  if(args[2] != null && args[2] != '') querystring += `&product_code=${args[2]}`;
  if(args[3] != null && args[3] != '') querystring += `&product_name=${args[3]}`;
  if(args[4] != null && args[4] != '') querystring += `&product_color_id=${args[4]}`;
  if(args[5] != null && args[5] != '') querystring += `&product_other_id=${args[5]}`;
  if(args[6] != null && args[6] != '') querystring += `&product_size_id=${args[6]}`;
  if(args[7] != null && args[7] != '') querystring += `&product_collection_id=${args[7]}`;
  if(args[8] != null && args[8] != '') querystring += `&product_type_id=${args[8]}`;
  if(args[9] != null && args[9] != '') querystring += `&product_quantity_initial=${args[9]}`;
  if(args[10] != null && args[10] != '') querystring += `&product_quantity_final=${args[10]}`;
  if(args[11] != null && args[12] != '') querystring += `&product_price_initial=${args[11]}`;
  if(args[12] != null && args[11] != '') querystring += `&product_price_final=${args[12]}`;

  var myHeaders = {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token_jwt}`
    }
  }
  
  let vreturn = await baseRequestFBody(myHeaders, `products${querystring}`);
  return vreturn;
}

async function getEvents(token_jwt, args){

  let limit = args[0];
  let offset = args[1];
  let event_user_id = (args[2] != null ? args[2] : '');
  let event_name_id = (args[3] != null ? args[3] : '');
  let event_start_date_time = (args[4] != null ? args[4] : '');
  let event_end_date_time = (args[5] != null ? args[5] : '');

  var myHeaders = {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token_jwt}`
    }
  }

  var querystring = `?limit=${limit}&offset=${offset}&event_user_id=${event_user_id}&event_name_id=${event_name_id}&event_start_date_time=${event_start_date_time}&event_end_date_time=${event_end_date_time}`;

  let vreturn = await baseRequestFBody(myHeaders, `events${querystring}`);
  return vreturn;
}

export default{
  doLoginAuthentication,
  doTokenAuthentication,
  deleteAuthToken,
  getUser,
  getUsers,
  createUser,
  allowUser,
  rejectUser,
  getPendingUsers,
  getEmployees,
  updateEmployee,
  getEmployeeSales,
  getEmployeeSalesSummary,
  getClient,
  getClients,
  createClient,
  updateClient,
  getProductInfo,
  createProduct,
  getProducts,
  getEvents
}