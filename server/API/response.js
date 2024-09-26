export const serverResponse = (status, message, data) => {
    return {
        "status": status,
        "msg": message,
        "data": data
    };
}