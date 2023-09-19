import { useState } from "react";
import styles from "./Registration.module.css";
import {signUp} from "../../API/API"

function Registration () {

    function submit () {
        signUp({email, password, firstName: name, lastName: surname}).then(res => {
           console.log(res)
            if(res.data.status == "OK") {
                alert("Успешная регистрация")
            }
        })
        setEmail("")
        setPassword("")
        setName("")
        setSurname("")
    }

    //В ОБЪЕКТЕ!!!! если имя поля и значение совпадают по названию, то можно не дублировать значение. 
    //Если они разные, то надо написать имя поля: значение (например, firstName: name)

    const [email, setEmail] = useState ("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");


    return (
        <div className={styles.background}>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                <input onChange={(e)=> setEmail(e.target.value)} className={styles.input} value={email} placeholder="E-mail" required/>
                <input onChange={(e)=> setPassword(e.target.value)} className={styles.input}  value={password} placeholder="Пароль" required type="password"/>
                <input onChange={(e)=> setName(e.target.value)} className={styles.input}  value={name} placeholder="Имя"/>
                <input onChange={(e)=> setSurname(e.target.value)} className={styles.input}  value={surname} placeholder="Фамилия"/>
                <button className={styles.button} onClick={submit}>Зарегистрироваться</button>
            </form>
        </div>
    )
}

export default Registration;