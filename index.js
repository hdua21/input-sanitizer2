class InputSanitizer {
    // Sanitizes a string input
    static sanitizeString(input) {
        return input
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    }

    // Validates if the input matches a specified pattern (e.g., email, alphanumeric)
    static validate(input, pattern) {
        const regex = new RegExp(pattern);
        return regex.test(input);
    }

    // Sanitize each property of an object
    static sanitizeObject(obj) {
        const sanitizedObj = {};
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'string') {
                sanitizedObj[key] = InputSanitizer.sanitizeString(value);
            } else if (typeof value === 'object') {
                sanitizedObj[key] = InputSanitizer.sanitizeObject(value); // Recursively sanitize objects
            } else {
                sanitizedObj[key] = value;
            }
        }
        return sanitizedObj;
    }
}

module.exports = InputSanitizer;