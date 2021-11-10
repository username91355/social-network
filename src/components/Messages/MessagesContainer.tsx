import {Messages} from "./Messages";
import {connect} from "react-redux";
import {changeNewMessageArea, removeMessage, sendMessage} from "../../redux/reducers/messagesReducer";

const mapStateToPrpos = (state: any) => {
    return ({
        dialogs: state.messages.dialogs,
        messages: state.messages.messages,
        newMessageArea: state.messages.newMessageArea
    })
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        sendMessage: () => {
            dispatch(sendMessage())
        },
        removeMessage: (id: number) => {
            dispatch(removeMessage(id))
        },
        changeNewMessageArea: (text: string) => {
            dispatch(changeNewMessageArea(text))
        }
    }
}

export const MessagesContainer = connect(mapStateToPrpos, mapDispatchToProps)(Messages)