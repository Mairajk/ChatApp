export const sendMessage = async ({ messageText, sendTo, chatId, messages, setMessages }) => {
    try {

        const myId = 9
        const payload = {
            text: messageText,
            from: myId,
            to: sendTo,
            chatId,
        }
        await setMessages((prev) => [...prev, payload])
        console.log("messageText ----------------->", messageText);

        console.log("messages ---------------->", messages);

    } catch (error) {
        console.log("error ------------------->", error);
    }
}