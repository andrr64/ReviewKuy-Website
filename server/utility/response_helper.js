export const serverBadRequest = (res, message) => 
    res.status(400).json({message });

export const serverConflict = (res, message) => 
    res.status(409).json({ message });

export const serverError = (res, message) => 
    res.status(500).json({message });

export const serverSuccess = (res, message, data) => 
    res.status(200).json({message, data });

export const serverCreated = (res, message, data) => 
    res.status(201).json({message, data });

export const serverNotFound = (res, message) => 
    res.status(404).json({ message });