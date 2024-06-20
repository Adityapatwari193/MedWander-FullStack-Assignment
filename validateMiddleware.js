// validationMiddleware.js

const countryPhonePatterns = {
    '1': /^\d{10}$/, // Example: USA, Canada
    '44': /^\d{10}$/, // Example: UK
    '91': /^\d{10}$/, // Example: India
    // Add other country codes and their phone number patterns here
    '61': /^\d{9}$/,  // Example: Australia
    '86': /^\d{11}$/, // Example: China
    '81': /^\d{10}$/, // Example: Japan
    '27': /^\d{9}$/   // Example: South Africa
    // Add more as needed
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

    // If validation passes, proceed to the next middleware or route handler
    next();
};

module.exports = validateFormData;
