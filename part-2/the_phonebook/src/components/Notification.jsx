
const Notification = (msg) => {
    const msgStyle = {
        padding: "0.5rem 1rem 0.5rem 1rem",
        display: "flex",
        alignItems: "center",
        justifyContents: "center",
        fontSize: "0.9rem",
        border: "1px solid rgb(6, 106, 36)",
        backgroundColor: "rgb(6, 106, 36, 0.1)",
        color: "rgb(6, 106, 36)"
    }

    if (!msg.successMsg && !msg.errorMsg) {
        return null
    }
    if (msg.successMsg) {
        let style = {
            ...msgStyle,
            border: "1px solid rgb(6, 106, 36)",
            backgroundColor: "rgb(6, 106, 36, 0.1)",
            color: "rgb(6, 106, 36)"
        }

        return <div style={style}>{msg.successMsg}</div>
    }
    if (msg.errorMsg) {
        let style = {
            ...msgStyle,
            border: "1px solid rgb(192, 21, 21)",
            backgroundColor: "rgb(192, 21, 21, 0.1)",
            color: "rgb(192, 21, 21)"
        }

        return <div style={style}>{msg.errorMsg}</div>
    }

}

export default Notification