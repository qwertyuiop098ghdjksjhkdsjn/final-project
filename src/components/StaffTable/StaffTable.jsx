import {getAllOfficers, deleteOfficer} from "../../API/API";
import { UserContext } from "../../context/context";
import { useContext, useState, useEffect } from "react";
import styles from "./StaffTable.module.css";
import { useNavigate } from "react-router-dom";


function StaffTable () {

    const {token} = useContext(UserContext);

    const [allStaff, setAllStaff] = useState([]);

    const navigate = useNavigate();

    function navigation (id) {
        navigate("/staff/" + id)
    };

    useEffect( () => {
        getAllOfficers(token).then(response => setAllStaff(response.officers))
        console.log(allStaff)
    }, [])

    function deleteStaff (id) {
        deleteOfficer(token, id).then(() => setAllStaff( allStaff.filter(function(item){
            if (id == item._id) {
                return false
            } else {
                return true
            }
        })))
    } 

    return(
        <div>
            <table className={styles.table}>
                <tr>
                    <th>Имя:</th>
                    <th>Фамилия:</th>
                    <th>Email:</th>
                    <th>Подтвержение:</th>
                    <th>Действия</th>
                </tr>
            {allStaff.map((element) => <tr key={element._id}>
                <td>{element.firstName}</td> 
                <td>{element.lastName}</td>
                <td>{element.email}</td>
                <td>{element.approved? "да" : "нет"}</td>
                <td><button className={styles.button} onClick={() => deleteStaff(element._id)}>Удалить</button>
                 <button className={styles.button} onClick={() => navigation(element._id)}>Просмотреть</button></td>
            </tr>)}
            </table>

            <div className={styles.tableMobile}>
                {allStaff.map((element) => <div className={styles.elements} key={element._id}>
                    <p>Имя: {element.firstName}</p>
                    <p>Фамилия: {element.lastName}</p>
                    <p>Email: {element.email}</p>
                    <p>Подтвержение: {element.approved? "да" : "нет"}</p>
                    <div className={styles.buttons}><button className={styles.button} onClick={() => deleteStaff(element._id)}>Удалить</button>
                 <button className={styles.button} onClick={() => navigation(element._id)}>Просмотреть</button></div>
                </div>)}
            </div>
        </div>
    )
}

export default StaffTable;