import { connect } from "react-redux";
import Messages from "./Messages";
import {changeNewMessageArea, sendMessage, setDialogsTC} from "../../redux/reducers/messages-reducer";

const mapStateToProps = (state: any) => {
    return {
        dialogs: state.messages.dialogs,
        messages: state.messages.messages,
        newMessageText: state.messages.newMessageText
    }
}

export default connect(mapStateToProps, {
    changeNewMessageArea,
    sendMessage,
    setDialogsTC
})(Messages)