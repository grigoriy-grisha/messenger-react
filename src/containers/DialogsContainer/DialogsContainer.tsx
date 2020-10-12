import { useDispatch, useSelector } from "react-redux";
import React, { useContext, useState } from "react";
import { SearchPerson } from "../../components/Chat/SearchPerson/SearchPerson";
import Fallback from "../../components/common/fallback";
import { DialogItem } from "../../components/Chat/DialogItem/DialogItem";
import { IDialogs, IFindPerson } from "../../types/dialogs/dialogs";
import socket from "../../utils/socket";
import {
  getDialogs,
  getPersons,
  actionDialogs,
} from "../../redux/actions/dialogs/dialogs";
import { elemT } from "../../utils/elemT";
import { UserContext } from "../../helpers/UserContext";
import AddPerson from "../../components/Chat/AddPerson/AddPerson";
import { DialogFindPersonItem } from "../../components/Chat/DialogFindPerson/DialogFindPersonItem";
import { actionsClick } from "../../redux/actions/clicks/click";
import {
  actionMessages,
  readMessage,
} from "../../redux/actions/messages/messages";
import { ClickModalType } from "../../redux/reducers/clicks/click";
import { DialogsModalType } from "../../redux/reducers/dialogs/dialogs";
import { AppStateType } from "../../redux/reducers";

const DialogsContainer = () => {
  let auth = useContext(UserContext);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const stateDialogs = useSelector(
    (state: AppStateType): DialogsModalType => state.dialogs
  );

  const stateCliks = useSelector(
    (state: AppStateType): ClickModalType => state.click
  );

  const { dialogs, isLoadedDialogs, findPersons } = stateDialogs;

  const { isFindModal } = stateCliks;
  const [items, setItems] = useState(dialogs);

  React.useEffect(() => {
    if (!isFindModal) {
      dispatch(getDialogs(auth.token));
      dispatch(actionDialogs.clearPersons());
    } else {
      setValue("");
    }
  }, [isFindModal, auth.token, dispatch]);

  React.useEffect(() => {
    if (!isFindModal) {
      
      if (dialogs.length) {
        const dialogsClone = dialogs;

        setItems((dialogs) =>
          dialogsClone.filter((item) => {
            return item.author._id === auth.userId
              ? item.partner.fullname.toLowerCase().includes(value)
              : item.author.fullname.toLowerCase().includes(value);
          })
        );
      }
    }
  }, [value, dialogs, isFindModal, auth]);

  React.useEffect(() => {
    setItems(dialogs);
  }, [dialogs]);

  React.useEffect(() => {
    dispatch(getDialogs(auth.token));
  }, [auth.token, dispatch]);

  React.useEffect(() => {
    dispatch(getDialogs(auth.token));

    socket.on("SERVER:DIALOG_CREATED", (data: any) => {
      dispatch(getDialogs(auth.token));

      if (data.author === auth.userId) {
        dispatch(actionsClick.clickOnDialogs(data.dialog._id));
      }
    });
    socket.on("SERVER:NEW_MESSAGE", (data: any) => {
      dispatch(actionDialogs.addMessageDialog(data));
    });
    socket.on("SERVER:MESSAGES_READED", (data: any) => {
      dispatch(readMessage(data, auth.userId));
    });

    return () => {
      socket.off("SERVER:NEW_MESSAGE", (data: any) => {
        dispatch(actionDialogs.addMessageDialog(data));
      });
    };
  }, [auth.token, dispatch, auth.userId]);

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.trim());
  };

  const onClickAddPersons = () => {
    dispatch(actionsClick.clickOnFindModal());
    dispatch(actionsClick.clickOnDialogs(""));
    dispatch(actionMessages.clearMessages());
  };

  const onSubmitFindUsers = (e: React.KeyboardEvent) => {
    if (isFindModal && e.keyCode === 13 && value) {
      dispatch(getPersons(value, auth.token));
      setValue("");
      setItems(dialogs);
    }
  };

  return (
    <div className="chat__dialogs">
      <AddPerson onClickAddPersons={onClickAddPersons} isOpen={isFindModal} />
      <SearchPerson
        onChangeSearchInput={onChangeSearchInput}
        value={value}
        onSubmitFindUsers={onSubmitFindUsers}
      />
      <div className="wrapper chat__dialog-wrapper">
        {!isFindModal ? (
          isLoadedDialogs ? (
            <Fallback />
          ) : !elemT(items).length ? (
            <h2 className="parrent">Нет диалогов</h2>
          ) : (
            elemT(items).map((item: IDialogs) => {
              return <DialogItem key={item._id} {...item} />;
            })
          )
        ) : isLoadedDialogs ? (
          <Fallback />
        ) : !elemT(findPersons).length ? (
          <h2 className="parrent">Нет диалогов</h2>
        ) : (
          elemT(findPersons).map((item: IFindPerson) => (
            <DialogFindPersonItem
              key={item._id}
              item={item}
              name={item.fullname}
              _id={item._id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DialogsContainer;
