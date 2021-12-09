import { connect } from "react-redux";
import Messages from "./Messages";
import {changeNewMessageArea, sendMessage, setDialogsTC} from "../../../redux/reducers/messages-reducer";
import {getMyPhoto} from "./messages-selector";

const mapStateToProps = (state: any) => {
    return {
        dialogs: state.messages.dialogs,
        authUserPhoto: getMyPhoto(state),
        messages: state.messages.messages,
        newMessageText: state.messages.newMessageText
    }
}

export default connect(mapStateToProps, {
    changeNewMessageArea,
    sendMessage,
    setDialogsTC
})(Messages)