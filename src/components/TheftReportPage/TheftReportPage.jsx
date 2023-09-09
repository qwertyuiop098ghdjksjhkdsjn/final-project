import styles from "./TheftRreportPage.module.css";
import { useParams } from "react-router-dom"
import { getOneCase, getAllOfficers } from "../../API/API";
import { useContext, useEffect, useState } from "react";
import {UserContext} from "../../context/context";
import {save} from "../../API/API";

function TheftReportPage () {

    const [info, setInfo] = useState({});  //та информация, которая приходит с сервера (нередактированная)

    const {token} = useContext(UserContext);

    const {id} = useParams ();

    //statuses

    let statusName = ["new", "in_progress", "done"];

    //состояния для инпутов

    const [license, setLicense] = useState ('');
    const [owner, setOwner] = useState ('');
    const [type, setType] = useState ('');
    const [color, setColor] = useState ('');
    const [date, setDate] = useState ('');
    const [description, setDescriptions] = useState ('');
    const [chosenOfficer, setChosenOfficer] = useState("");
    const [officers, setOfficers] = useState([]);
    const [status, setStatus] = useState("");
    const [resolution, setResolution] = useState("");

    useEffect(() => {
        getAllOfficers(token).then((response) => setOfficers(response.officers.filter((element) => {
            if(element.approved) {
                return true
            } else {
                return false
            }
        })));
        getOneCase(token, id).then(response => {setInfo(response.data); setLicense(response.data.licenseNumber); setOwner(response.data.ownerFullName);
             setType(response.data.type); setColor(response.data.color); setDate(response.data.date); 
             setDescriptions(response.data.description); setChosenOfficer(response.data.officer); setStatus(response.data.status); 
             setResolution(response.data.resolution)});
    }, []) 
    
    console.log(info)

    function saveButton () {

        const editedData = {};

        if (info.licenseNumber !== license) {
            editedData.licenseNumber = license
        }

        if(info.ownerFullName !== owner) {
            editedData.ownerFullName = owner
        }

        if(info.type !== type) {
            editedData.type = type
        }

        if(info.color !== color) {
            editedData.color = color
        }

        if(info.date != date) {
            editedData.date = date
        }

        if(info.status != status) {
            editedData.status = status
        }

        if(info.resolution != resolution) {
            editedData.resolution = resolution
        }

        // {
        //     "_id": "64eb2e223ef5fabb9277b252",
        //     "status": "new",
        //     "licenseNumber": "312443",
        //     "type": "sport",
        //     "ownerFullName": "Nastya",
        //     "clientId": "455d818e-c352-4064-80bb-09a867e83ac9",
        //     "createdAt": "2023-08-27T11:06:10.111Z",
        //     "updatedAt": null,
        //     "color": "red",
        //     "date": null,
        //     "officer": "64df454673ccfb1734df9d8c",
        //     "description": null,
        //     "resolution": null,
        //     "__v": 0
        // }

        
        save(token, id, editedData)
    }

    return(
        <div className={styles.container}>
           <input placeholder="license number" className={styles.input} required value={license} onChange={(e) => setLicense (e.target.value)}/>
           <input placeholder="name" className={styles.input} required value={owner} onChange={(e) => setOwner(e.target.value)}/>
           <input placeholder="type" className={styles.input} required value={type} onChange={(e) => setType(e.target.value)}/>
           <input placeholder="color" className={styles.input} value={color} onChange={(e) => setColor(e.target.value)}/>
           <input placeholder="date" className={styles.input} value={date} onChange={(e) => setDate(e.target.value)}/>
           <input placeholder="description" className={styles.input} value={description} onChange={(e) => setDescriptions(e.target.value)}/>
           <select className={styles.input} onChange={(e) => setChosenOfficer (e.target.value)}>
                    <option value="" selected disabled hidden>{officers.find((el) => {
                        if (el._id == chosenOfficer) {
                            console.log(el)
                            return true
                        } else {
                            return false
                        }
                    })?.firstName}</option>
                {officers.map((el) => <option value={el._id} key={el._id}>{el.firstName}</option>)}
                </select>

            <select className={styles.input} onChange={(e) => setStatus (e.target.value)}>
         <option value="" selected disabled hidden>{statusName.find((el) => {
                        if (el == status) {
                            console.log(el)
                            return true
                        } else {
                            return false
                        }
                    })}</option>

            {statusName.map((el) => <option value={el} key={el}>{el}</option>)}
            </select>

            { status == "done" &&
            <textarea className={styles.input} required value={resolution} onChange={(e) => setResolution(e.target.value)}/>
            }
            
           <button className={styles.button} onClick={saveButton}>Сохранить</button>

        </div>
    )
} 

export default TheftReportPage