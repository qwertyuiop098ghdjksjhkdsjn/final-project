
import axios from "axios";
const url = "https://sf-final-project-be.herokuapp.com/api/"; 

//axios запрос
//функция для регистрации

const ID = "455d818e-c352-4064-80bb-09a867e83ac9";

export async function signUp ({email, password, firstName, lastName, approved}) {
  try { 
   return await axios.post (url + "auth/sign_up", {email, password, clientId: ID, firstName, lastName, approved})
  }
   catch (error) {
    console.log(error)
    return error
  }
}

//сделали функцию асинхронной, слово await означает, что будем ждать когда выполнится действие axios.post (url + .... 
//и только потом весь основной код. Использовали try catch, потому что функция асинхронная.  
//То есть catch поймает ошибку только после того, когда запрос выполнится.
// у axios всегда пишется метод (в данном случае это post); у post запроса всегда 2 аргумента (url и данные, которые передаем)


//fetch запрос (то же самое, только другой метод)

// fetch (url + "auth/sign_up", {body: {email, password, clientId, firstName, lastName, approved}}).then(response=> response.json()).then(console.log(response))


//функция для авторизации

export async function singIn ({email, password}) {
  try {
    const response = await axios.post(url + "auth/sign_in", {email, password})
    return response.data
  }
  catch (error) {
    console.log(error)
    return error.response.data
  }
}

//функция, для отправки сообщений Create Case (public)

export async function report ({licenseNumber, ownerFullName, type, color, date, description}) {
  try {
    const response = await axios.post( url + "public/report", {licenseNumber, ownerFullName, type, clientId: ID, color, date, description}) 
    return response.data
  }
  catch (error) {
    console.log(error)
  }
}

//запрос для получения списка всех сотрудников 
//это get запрос

export async function getAllOfficers (token) {
 return await fetch (url + "officers/", {headers: {Authorization: "Bearer" + " " + token}}).then(response=> response.json())
}

//запрос на удаление сотрудника

export async function deleteOfficer (token, id) {
  return await fetch (url + "officers/" + id, {method: "Delete", headers: {Authorization: "Bearer" + " " + token}}).then(response => 
    response.json())
}

//запрос на получение одного сотрадуника 

export async function getOneOfficer (token, id) {
  return await fetch (url + "officers/" + id, {headers: {Authorization: "Bearer" + " " + token}}).then(response=> response.json())
 }
 

 //функция, кот сохраняет инфу об изменениях сотрудника

 export async function saveOfficer (token, id, data) {
  try {
    const response = await axios.put( url + "officers/" + id, data, {headers: {Authorization: "Bearer" + " " + token}}) 
    return response.data
  }
  catch (error) {
    console.log(error)
  }
  }

//функция для проверки токена (чтобы один раз войти в аккаунт и не вылетали данные при перезагрузке)

export async function tokenValidate (token) {
  return await fetch (url + "auth/", {headers: {Authorization: "Bearer" + " " + token}}).then(response=> response.json())
 }
 

 //запрос сообщение для кражи для админов Create Case (private)

 export async function reportAdmin (token, {licenseNumber, ownerFullName, type, color, date, description, officer}) {
  const data = {licenseNumber, ownerFullName, type, color, date, description, officer}

  if(officer == "") {
    delete data.officer
  }

  try {
    const response = await axios.post( url + "cases", data, {headers: {Authorization: "Bearer" + " " + token}}) 
    return response.data
  }
  catch (error) {
    console.log(error)
  }
}


//Запрос для получения всех сообщений о краже

export async function getAllReports (token) {
  return await fetch (url + "cases/", {headers: {Authorization: "Bearer" + " " + token}}).then(response => response.json())
}


//запрос на удаление сообщения о краже 


export async function deleteCase (token, id) {
  return await fetch(url + "cases/" + id, {method: "Delete", headers: {Authorization: "Bearer" + " " + token}}).then(response => response.json())
}

//запрос на получение информации из сообщения

export async function getOneCase (token, id) {
  return await fetch(url + "cases/" + id, {headers: {Authorization: "Bearer" + " " + token}}).then(response => response.json())
}

//кнопка сохранить

export async function save (token, id, data) {
try {
  const response = await axios.put( url + "cases/" + id, data, {headers: {Authorization: "Bearer" + " " + token}}) 
  return response.data
}
catch (error) {
  console.log(error)
}
}