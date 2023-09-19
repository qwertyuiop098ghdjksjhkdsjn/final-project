import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import {UserContext} from "./../../context/context";

function Header () {

    const navigate = useNavigate ();
    function Navigation () {
        navigate("/registration")
    }

    function navigationMain () {
        navigate("/")
    }

    function navigationAuthorization () {
        navigate("/authorization")
    }

    function navigationReport () {
        navigate("/allReports")
    }

    function navigationAllStuff () {
        navigate("/staff")
    }

    const {user, setUser, setToken} = useContext (UserContext);
   
    function exit () {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        navigationMain();
    }


    console.log(user);

    return (
        <header className={styles.header}>
            <button className={styles.button} onClick={navigationMain}>Главная</button>
            {/* <p>О нас</p>
            <p>Правила аренды</p>
            <p>Цены</p> */}
            {user?.approved && <button className={styles.button} onClick={navigationAllStuff}>Список сотрудников</button>}
            {/* <p>Отзывы</p> */}
            {/* <p>Контакты</p> */}
            {!user && <div className={styles.buttons}>
                <button className={styles.button} onClick={navigationAuthorization}>Авторизация</button>
                <button className={styles.button} onClick={Navigation}>Регистрация</button>
            </div>}
            {user?.approved && <button className={styles.button} onClick={navigationReport}>Сообщения о кражах</button>}
            {user && <button className={styles.button} onClick={exit}>Выйти</button>}
        </header>
    )
}

export default Header;