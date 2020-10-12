import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { actionsClick } from "../../../redux/actions/clicks/click";
import { AppStateType } from "../../../redux/reducers";


import { ClickModalType } from "../../../redux/reducers/clicks/click";


export const DialogFindPersonItem = (props: any) => {
  const clickOnPerson = useSelector(
    (state: AppStateType): ClickModalType => state.click
  );
  const { idPerson } = clickOnPerson;

  const dispatch = useDispatch();
  const {
    name,
    _id,
  } = props;

  const currentDialogs = _id === idPerson ? true : false;

  return (
    <div
      className={
        currentDialogs
          ? "chat__persons chat__persons--current"
          : "chat__persons"
      }
      onClick={() => {
        dispatch(actionsClick.clickOnDialogs(_id));
      }}
    >
      <div className="chat__ava-block">
        <img className="chat__ava-person" src="a.jpg" alt="ava" />
      </div>
      <div className="wrapper chat__info-person">
        <span className="parrent chat__name-person">{name}</span>
      </div>
    </div>
  );
};
