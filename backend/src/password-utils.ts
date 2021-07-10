
/* Password requirements:
 * - at least 8 chars
 * - at most 24 chars
 * - at least 1 uppercase letter
 * - at least 1 lowercase letter
 * - at least 1 digit
 * - at least 1 special char
 */
function checkPasswordRequirements(password: string): boolean {
    return password.length >= 8 &&
        password.length <= 24 &&
        /[A-Z]/g.test(password) &&
        /[a-z]/g.test(password) &&
        /[0-9]/g.test(password) &&
        /[!@#\$%\^&\*\(\)_\+\-=]/g.test(password);
}

export function checkNewPassword(password: string, passwordRepeat: string): boolean {
    return password === passwordRepeat && checkPasswordRequirements(password);
}
