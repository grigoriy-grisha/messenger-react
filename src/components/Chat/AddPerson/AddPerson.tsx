import React from "react"
import persons from "../../../static/SearchPerson/persons.svg";

interface props {
    onClickAddPersons: () => void
    isOpen: boolean
}

const AddPerson: React.FC<props> = ({onClickAddPersons, isOpen}) => { 
    return (
        <div className={isOpen ? "chat__add-diaogs chat__persons--current" : "chat__add-diaogs"} onClick={onClickAddPersons}>
          <span className="chat__name-person" >Добавить диалог</span>
          <img src={persons} alt="persons"/>
        </div>
    )
}

export default AddPerson