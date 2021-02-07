export const validateEmail = (email: string): boolean => {
    if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        return false;
    }
    return true;
};
