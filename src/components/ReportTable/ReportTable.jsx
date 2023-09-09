import styles from "./ReportTable.module.css";
import { getAllReports, deleteCase } from "../../API/API";
import { UserContext } from "../../context/context";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function ReportTable () {

    const {token} = useContext(UserContext);
    getAllReports(token); 

    const [report, setReport] = useState([]);  //state для информации о сообщениях

    useEffect( () => {
        getAllReports(token).then(response => setReport(response.data));
    }, []);

    function deleteHandler (id) {
        deleteCase(token, id).then( () => setReport( report.filter(function(item) {
            if (id == item._id) {
                return false
            } else {
                return true
            }
        })))
    }

    const navigate = useNavigate();

    function navigation (id) {
        navigate("/cases/" + id)
    };

    return (
    <div>
        <table className={styles.table}>
        <tr>
            <th>Владелец</th>
            <th>Лицензионный номер</th>
            <th>Тип велосипеда</th>
            <th>Статус сообщения</th>
            <th>Дата</th>
            <th>Цвет</th>
            <th>Дата кражи</th>
            <th>Описание</th> 
            <th>Действия</th>
            </tr>
        {report.map( (element) => <tr key={element._id}>
    <td>{element.ownerFullName}</td>
    <td>{element.licenseNumber}</td>
    <td>{element.type}</td>  
    <td>{element.status}</td>
    <td>{element.createdAt}</td>
    <td>{element.color}</td>
    <td>{element.date}</td>
    <td>{element.description}</td>
    <td><button className={styles.button} onClick={() => deleteHandler(element._id)}>Удалить</button>
    <button className={styles.button} onClick={() => navigation(element._id)}>Просмотреть</button></td>
  </tr>)}
        </table>
        <div className={styles.tableMobile}> 
            {report.map( (element) => <div className={styles.elements} key={element._id}>
                <p>Владелец: {element.ownerFullName}</p>
                <p>Лицензионный номер: {element.licenseNumber}</p>
                <p>Тип велосипеда: {element.type}</p>
                <p>Статус сообщения: {element.status}</p>
                <p>Дата: {element.createdAt}</p>
                <p>Цвет: {element.color}</p>
                <p>Дата кражи: {element.date}</p>
                <p>Описание: {element.description}</p>
                <div className={styles.buttons}>
                <button className={styles.button} onClick={() => deleteHandler(element._id)}>Удалить</button>
    <button className={styles.button} onClick={() => navigation(element._id)}>Просмотреть</button></div>
            </div>)}
        
        </div>
       
    </div>
    )
}

export default ReportTable