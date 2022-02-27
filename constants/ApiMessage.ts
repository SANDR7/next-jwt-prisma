const handleMessage = (message = '', success = true, error = false) => {
    return {
        message,
        success,
        error
    }
}

export default handleMessage;

