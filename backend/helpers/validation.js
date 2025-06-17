exports.validateEmail = (email) => {
    // Convert email to lowercase before matching
    const lowerCaseEmail = String(email).toLowerCase();
    
    // Regular expression to validate email format
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/;
  
    // Check if the email matches the regular expression
    return emailRegex.test(lowerCaseEmail);
};

exports.validateLength = (text,min,max) => {
    if(text.length > max || text.length < min){
        return false;
    }
    return true;
};

exports.validateUsername = (username) => {
    return String(username)
    .match(/^[a-zA-Z][a-zA-Z0-9_.-]{5,29}$/);
}

exports.validateName = (name) => {
    return String(name)
    .match(/^[a-zA-Z\u4e00-\u9fff]{1,30}([_.-]?[a-zA-Z0-9\u4e00-\u9fff])*$/);
}

exports.validatePassword = (password) => {
    return String(password)
    .match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()-_=+{};:,<.>]).{8,30}$/);
}