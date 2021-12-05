import { connect } from "react-redux";
import Messages from "./Messages";
import {changeNewMessageArea, sendMessage} from "../../redux/profile-reducer";

const mapStateToProps = (state: any) => {
    return {
        messages: state.profile.messages,
        dialogs: state.profile.dialogs,
        newMessageText: state.profile.newMessageText
    }
}

export default connect(mapStateToProps, {
    changeNewMessageArea,
    sendMessage
})(Messages)