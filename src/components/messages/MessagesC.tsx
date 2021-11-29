import { connect } from "react-redux";
import Messages from "./Messages";

const mapStateToProps = (state: any) => {
    return {
        messages: state.profile.messages,
        dialogs: state.profile.dialogs
    }
}

export default connect(mapStateToProps, {})(Messages)