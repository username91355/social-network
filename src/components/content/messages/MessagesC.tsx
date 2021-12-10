import { connect } from "react-redux";
import Messages from "./Messages";
import {changeNewMessageArea, sendMessage, setDialogsTC} from "../../../redux/reducers/messages-reducer";
import {getMyName, getMyPhoto } from "../../../utils/selectors/messages-selector";
import {AppStateType} from "../../../redux/store";

const mapStateToProps = (state: AppStateType) => {
    return {
        dialogs: state.messages.dialogs,
        authUserPhoto: getMyPhoto(state),
        authUserName: getMyName(state),
        messages: state.messages.messages,
        newMessageText: state.messages.newMessageText
    }
}

export default connect(mapStateToProps, {
    changeNewMessageArea,
    sendMessage,
    setDialogsTC
})(Messages)