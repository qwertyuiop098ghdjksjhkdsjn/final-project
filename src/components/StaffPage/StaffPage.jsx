import { getOneOfficer } from "../../API/API";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {UserContext} from "../../context/context";
import {saveOfficer} from "../../API/API";
import styles from "./StaffPage.module.css";

function StaffPage () {

const [info, setInfo] = useState({});

const {id} = useParams();

const {token} = useContext(UserContext);

useEffect(() => {getOneOfficer(token, id).then(response =>{ setInfo(response.data); setFirstName(response.data.firstName); 
setLastName(response.data.lastName); setCheckbox(response.data.approved)})},
 []);


const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [checkbox, setCheckbox] = useState(false);

function saveButton () {

    const editedData = {};

    if(info.firstName !== firstName) {
        editedData.firstName = firstName
    }

    if(info.lastName !== lastName) {
        editedData.lastName = lastName
    }

    if(info.approved !== checkbox) {
        editedData.approved = checkbox
    }

    saveOfficer(token, id, editedData).then(() => alert("Успешно изменено"));
}
    
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <label htmlFor="firstName">Имя:</label>
                <input className={styles.input} id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            </div>
            <div className={styles.container}>
                <label htmlFor="lastName">Фамилия:</label>
                <input className={styles.input} id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/> 
            </div>
            <div className={styles.container}>Email: {info.email}</div>
            <div className={styles.container}>
                <label htmlFor="check">Подтверждение:</label>
                <input className={styles.check} id="check" type="checkbox" value={checkbox} checked={checkbox} onChange={(e) => setCheckbox(e.target.checked)}/>
            </div>
            <button className={styles.button} onClick={saveButton}>Сохранить</button>
        </div>
    )
}

export default StaffPage;