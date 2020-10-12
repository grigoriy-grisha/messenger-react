import Fallback from "../../components/common/fallback";
import React, { useState, useRef, useContext, MouseEvent } from "react";
import { elemT } from "../../utils/elemT";
import { IMessages } from "../../types/messages/messages";
import { useSelector, useDispatch } from "react-redux";
import { Message } from "../../components/Chat/Message/Message";
import socket from "../../utils/socket";
import {
  actionMessages,
  getMessages,
  readMessage,
} from "../../redux/actions/messages/messages";
import { InputMessage } from "../../components/Chat/InputMessage/InputMessage";
import { addMessage } from "../../redux/actions/messages/messages";
import { UserContext } from "../../helpers/UserContext";
import { actionsClick } from "../../redux/actions/clicks/click";
import { setLastMessage, actionDialogs } from "../../redux/actions/dialogs/dialogs";
import { fetchApi } from "../../utils/api/fetchApi";
import { Toolbar } from "../../components/Chat/Toolbar/Toolbar";
import Modal from "../../components/Modal/Modal";
import { ClickModalType } from "../../redux/reducers/clicks/click";
import { MessagesModalType } from "../../redux/reducers/messages/messages";
import { AppStateType } from "../../redux/reducers";
const MessagesContainer = () => {
  const dispatch = useDispatch();
  // messages
  const messageRef = useRef<HTMLDivElement>(null);
  const auth = useContext(UserContext);

  const stateMessages = useSelector(
    (state: AppStateType): MessagesModalType => state.messages
  );
  const stateCliks = useSelector(
    (state: AppStateType): ClickModalType => state.click
  );
  const { idPerson, isFindModal } = stateCliks;
  const { messages, isLoadedMessages, activeMessage } = stateMessages;


  const [valueMessage, setValueMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

 
  React.useEffect(() => {
    socket.on("SERVER:NEW_MESSAGE", (data: any) => {
      if (data) {
        dispatch(addMessage(data, auth.userId, auth.token));
      }
    });

    socket.on("SERVER:MESSAGES_READED", (data: ISocketReadMessage) => {
      dispatch(actionDialogs.updateDialogRead(data, auth.userId));
      dispatch(readMessage(data, auth.userId));
    });

    return () => {
      socket.off("SERVER:NEW_MESSAGE", (data: any) => {
        dispatch(addMessage(data, auth.userId, auth.token));
      });
    };
  }, [auth.token, dispatch, auth.userId]);

  React.useEffect(() => {
    if (idPerson && !isFindModal) {
      dispatch(getMessages(idPerson, auth.token));
    }
  }, [idPerson, auth.token, dispatch, isFindModal]);

  React.useEffect(() => {
    if (messageRef.current) {
      
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [messages, isLoadedMessages]);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueMessage(e.target.value.trim());
  };
  const onsubmitMessage = () => {
    let postData = {};
    if (valueMessage) {
      if (isFindModal) {
        postData = {
          partner: idPerson,
          text: valueMessage,
        };
        console.log(postData);

        fetchApi("POST", auth.token, "dialogs", postData, "");
      } else {
        postData = {
          dialog_id: idPerson,
          text: valueMessage,
        };
        fetchApi("POST", auth.token, "messages", postData, "");
      }
    }
  };

  const handleSendMessage = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13 && idPerson) {
      onsubmitMessage();
      setValueMessage("");
      if (isFindModal) {
        dispatch(actionsClick.clickOnFindModal());
      }
    }
  };
  const handleMessage = (_id: string) => {
    if (!(activeMessage as string[]).includes(_id)) {
      dispatch(actionMessages.pushActiveMessage(_id));
    } else {
      dispatch(actionMessages.unPushActiveMessage(_id));
    }
  };

  const closeModal = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;
    (target.classList.contains("modal") ||
      target.classList.contains("modal__close") ||
      target.classList.contains("canceling")) &&
      setModalOpen(false);
    
  };

  const deleteMessage = () => {
    if (activeMessage.length) {
      const postData = {
        idArray: activeMessage,
        dialogId: idPerson,
      };
      fetchApi("DELETE", auth.token, "messages", postData, "");
      dispatch(actionMessages.deleteMessages());
      dispatch(setLastMessage(idPerson))
      dispatch(actionMessages.cleanActiveMessage());
      setModalOpen(false);
    }
  };
  return (
    <>
      {modalOpen && (
        <Modal closeModal={closeModal} deleteSome={deleteMessage} />
      )}
      <div className="chat__container">
        <Toolbar
          activeMessage={activeMessage}
          openDeleteMessage={() => setModalOpen(true)}
        />
        <div className="wrapper chat__dialog" ref={messageRef}>
          {idPerson ? (
            isLoadedMessages ? (
              <Fallback />
            ) : (
              elemT(messages).map((item: IMessages, index: number) => (
                <Message
                  key={`${item.createdAt}_${index}`}
                  read={item.read}
                  text={item.text}
                  createdAt={item.createdAt}
                  _idUser={item.user._id}
                  _id={item._id}
                  handleMessage={handleMessage}
                />
              ))
            )
          ) : (
            <h1 className="parrent">Откройте диалог</h1>
          )}
        </div>
        {idPerson && (
          <InputMessage
            onSubmit={onsubmitMessage}
            changeInput={changeInput}
            valueMessage={valueMessage}
            handleSendMessage={handleSendMessage}
          />
        )}
      </div>
    </>
  );
};

export default MessagesContainer;
