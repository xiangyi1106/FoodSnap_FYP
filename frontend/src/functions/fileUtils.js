export const validateFileType = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4'];
    if (!validTypes.includes(file.type)) {
        return false;  // Invalid file type
    }
    return true;  // Valid file type
};

export const validateImageType = (file) => {
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
        return false;  // Invalid file type
    }
    return true;  // Valid file type
};

export const validatePhoneNumber = (phone) => {
    const cleanedPhone = phone.replace(/-/g, ''); // Remove hyphens for validation
    if (cleanedPhone.startsWith('011')) {
        return /^[0-9]{11}$/.test(cleanedPhone); // 011 + 8 digits
    } else if (cleanedPhone.startsWith('01')) {
        return /^[0-9]{10}$/.test(cleanedPhone); // 7 or 8 digits for other prefixes
    } else {
        return false;
    }

};

export const validatePostalCode = (postalCode) => /^[0-9]{5}$/.test(postalCode);

export const validateLatitude = (latitude) => {
    const lat = parseFloat(latitude);
    return !isNaN(lat) && lat >= -90 && lat <= 90;
};

export const validateLongitude = (longitude) => {
    const lon = parseFloat(longitude);
    return !isNaN(lon) && lon >= -180 && lon <= 180;
};

export const validateWebsite = (url) => {
    try {
        const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/.*)?$/;
        return urlPattern.test(url);
    } catch (e) {
        return false;  // If invalid URL, it'll throw an error
    }
};

export const validatePriceRange = (priceRange) => {
    // Regex to match the pattern RM<number>-<number> and capture both the minimum and maximum prices
    const priceRangeRegex = /^RM(\d+)-(\d+)$/;

    const match = priceRange.match(priceRangeRegex);

    if (match) {
        // Extract the minimum and maximum prices
        const minPrice = parseInt(match[1], 10); // First capture group (minimum price)
        const maxPrice = parseInt(match[2], 10); // Second capture group (maximum price)

        // Ensure the maximum price is greater than the minimum price
        if (maxPrice > minPrice) {
            return true;  // Valid price range
        } else {
            return false;  // Maximum price should be greater than minimum price
        }
    } else {
        return false;  // Invalid format
    }
};