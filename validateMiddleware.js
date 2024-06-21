// validationMiddleware.js

const countryPhonePatterns = {
    '1': /^\d{10}$/, 
    '44': /^\d{10}$/, 
    '91': /^\d{10}$/, 
    '61': /^\d{9}$/,  
    '86': /^\d{11}$/, 
    '81': /^\d{10}$/, 
    '27': /^\d{9}$/   
    
};

const validateFormData = (req, res, next) => {
    const { formType, name, countryCode, phoneNumber } = req.body;

    const nameRegex = /^[A-Za-z]+$/;
    const phoneRegex = countryPhonePatterns[countryCode];

    if (!name || !nameRegex.test(name)) {
        return res.status(400).send('Invalid name');
    }
    if (!countryCode || !countryPhonePatterns[countryCode]) {
        return res.status(400).send('Invalid country code');
    }
    if (!phoneNumber || !phoneRegex || !phoneRegex.test(phoneNumber)) {
        return res.status(400).send('Invalid phone number');
    }

    
    next();
};

module.exports = validateFormData;
