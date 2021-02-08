export const getSession = (): string | null => {
    return localStorage.getItem('session_id');
};
export const logOut = (): void => {
    localStorage.removeItem('session_id');
};

export const setSession = (session: string): void => {
    localStorage.setItem('session_id', session);
};
