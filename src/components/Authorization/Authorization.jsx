
import styles from "./Authorization.module.css";
import { singIn } from "../../API/API";
import { useContext, useState } from "react";
import { UserContext } from "../../context/context";
import { useNavigate } from "react-router-dom";


function Authorization () {
    
    const {setUser, setToken} = useContext(UserContext);

    const [email, setEmail] = useState ("");
    const [password, setPassword] = useState ("");

    const navigation = useNavigate();

    function submit () {
        singIn({email, password}).then(response => {
           console.log(response)
            if(response.status == "OK"){
                localStorage.setItem ("token", response.data.token);  //сохраняет токен в localStorage
            setUser (response.data.user);  //функция, которая сохраняет данные о пользователе в контексте 
            setToken(response.data.token); //функция, которая сохраняет токен в контексте
            navigation("/"); 
            } else {
                alert(response.message)
            }
        })
    }

    return (
        <div className={styles.background}>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                <input placeholder="E-mail" className={styles.input} onChange={(e) => setEmail(e.target.value)} required/>
                <input placeholder="Пароль" className={styles.input} onChange={(e) => setPassword(e.target.value)} required type="password"/>
                <button className={styles.button} onClick={submit}>Войти</button>
            </form>
        </div>
    )
}

export default Authorization;