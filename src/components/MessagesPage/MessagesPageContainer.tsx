import { connect } from "react-redux";
import MessagesPage from "./MessagesPage";
import { changeMessageTextAreaAC, sendMessageAC } from '../../redux/reducers/MessagePageReduser'


let mapStateToProps = (state: any) => {

    return {
        messagesPage: state.messagesPage,
        allUsers: state.friendsPage.allUsers
    }
}

let mapDispatchToProps = (dispatch: any) => {
    return {

        sendMessage(userId: string, value: string) {
            dispatch(sendMessageAC(userId, value))
        },

        changeMessageTextArea(value: string) {
            dispatch(changeMessageTextAreaAC(value))
        }
    }
}

const MessagesPageContainer = connect(mapStateToProps, mapDispatchToProps)(MessagesPage)

export default MessagesPageContainer