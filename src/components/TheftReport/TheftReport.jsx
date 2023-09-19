import { useEffect, useState } from "react";
import styles from "./TheftReport.module.css";
import {report, reportAdmin} from "../../API/API";
import {getAllOfficers} from "../../API/API";
import { useContext } from "react";
import {UserContext} from "../../context/context";

function TheftReport () {

    const [license, setLicense] = useState ('');
    const [owner, setOwner] = useState ('');
    const [type, setType] = useState ('');
    const [color, setColor] = useState ('');
    const [date, setDate] = useState ('');
    const [description, setDescriptions] = useState ('');
    const [chosenOfficer, setChosenOfficer] = useState("");
    const [officers, setOfficers] = useState([]);

    const {token, user} = useContext(UserContext);  //хук useContext позволяет получать информацию из контекста. Получили оттуда токен. 
                                                    //в скобках указать объект контекста, который создавали. 

    useEffect(() => {    //хук useEffect нужен для того, чтобы функция вызывалась 1 раз при открытии данной страницы. 
       
       //проверка: если пользователь вошел, то функция должна вызываться.

        if (user?.approved) {
            getAllOfficers(token).then((response) => setOfficers(response.officers.filter((element) =>{
                if(element.approved) {
                    return true
                } else {
                    return false
                }
            })))
        }
    }, [user]);

   async function submit () {
    let result;

        if(user?.approved) {
         result = await reportAdmin(token, {licenseNumber: license, ownerFullName: owner, type, color, date, description, officer: chosenOfficer})
        } else{
         result = await report({licenseNumber: license, ownerFullName: owner, type, color, date, description});
        }


    console.log(result)
    
        if (result.status == "OK") {
            setLicense ('');
            setOwner('');
            setType ('');
            setColor('');
            setDate('');
            setDescriptions('');
            setChosenOfficer("");
            alert("Отправлено!")
        } else {
            alert("error!")
        }
    }

    console.log(officers)
    console.log(chosenOfficer)

    return (
        <div className={styles.background}>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                <input placeholder="licenseNumber" value={license} className={styles.input} onChange={(e) => setLicense (e.target.value)}/>
                <input placeholder="ownerFullName" className={styles.input} value={owner} onChange={(e) => setOwner (e.target.value)}/>
                <input placeholder="type: sport/ general" className={styles.input} value={type} onChange={(e) => setType (e.target.value)}/>
                <input placeholder="color" className={styles.input} value={color} onChange={(e) => setColor (e.target.value)}/>
                <input placeholder="date" className={styles.input} value={date} onChange={(e) => setDate (e.target.value)}/>
                <input placeholder="description" className={styles.input} value={description} onChange={(e) => setDescriptions (e.target.value)}/>
              { user && user?.approved && 
                <select className={styles.input} onChange={(e) => setChosenOfficer (e.target.value)}>
                    <option value="" selected disabled hidden>Choose here:</option>
                {officers.map((el) => <option value={el._id} key={el._id}>{el.firstName}</option>)}
                </select>}
                <button className={styles.button} onClick={submit}>Отправить</button>
            </form>
        </div> 
    )
}

export default TheftReport;