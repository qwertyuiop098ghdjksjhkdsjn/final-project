import { useNavigate } from "react-router-dom";
import styles from "./MainPage.module.css";
import photo1 from "../../images/photo1.jpg";
import photo300 from "../../images/photo300.jpg"

function MainPage () {

    const navigate = useNavigate();

    function navigation () {
        navigate("/report")
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <p className={styles.text}>
                Velocity - сервис проката велосипедов. <br/> <br/>
                    Вам больше не нужно искать велосипед, чтобы отправиться на свою лучшую велопрогулку. <br/> <br/>
                    Просто арендуйте его у нас!   
                </p> 
            <div className={styles.inform}>
                <p>Если вы столкнулись с кражей велосипеда, оставьте заявку и мы решим этот вопрос.</p>
                <button className={styles.button} onClick={navigation}>Сообщить о краже</button>
            </div>
            </div>
            <div className={styles.images}>
                <img className={styles.photo1} src={photo1}/>
                <img className={styles.photo300} src={photo300}/>
            </div>
        </div>
    )
}

export default MainPage;