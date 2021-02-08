import Cookies from 'js-cookie';
export const getSession = (): string => {
    const jwt = Cookies.get('__session');
    let session;
    try {
        if (jwt) {
            const base64Url = jwt.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            session = JSON.parse(window.atob(base64));
        }
    } catch (error) {
        console.log(error);
    }
    return session;
};
export const logOut = (): void => {
    Cookies.remove('__session');
};

export const setSession = (session: string): void => {
    Cookies.set('__session', session);
};
