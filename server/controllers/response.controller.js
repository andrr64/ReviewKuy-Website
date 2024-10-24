export const serverResponse = (pStatus, code, data= 'OK') => {
    return {
        status: pStatus,
        code,
        data
    }
}

export const serverInternalError = (res, msg = '') => {
    return res.status(500).json(serverResponse(false, 500, `Internal Server Error: ${msg}`));
}

export const serverNotFound = (res, msg='not found') => {    
    return res.status(404).json(serverResponse(false, 404, msg));
}

export const serverBadRequest = (res, data) => {
    return res.status(400).json(serverResponse(false, 400, `${data? data : 'Bad Request'}`));
}

export const serverOk = (res, data='OK') => {
    return res.status(200).json(serverResponse(true, 200, data));
}

export const serverCreatedOk = (res, data='CREATED') => {
    return res.status(201).json(serverResponse(true, 200, data))
}

export const serverForbidden = (res) => {
    return res.status(401).json(serverResponse(false, 401, `Forbidden: Unauthorized`))
}

export const serverNotAcceptable = (res, msg = 'Not Acceptable') => {
    return res.status(406).json(serverResponse(false, 406, msg))
}