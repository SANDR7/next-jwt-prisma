const apiMessage = (message = '', success = true, error = false) => {
    return {
        message,
        success,
        error
    }
}

export default apiMessage;

