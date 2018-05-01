export const login = (usernameP: string, passwordP: string) => {
   return {
    
        type: 'LOGIN',
        username: usernameP,
        password: passwordP
    };
    
};

export const logout = () => {
    return {
        type: 'LOGOUT'
    };
};

export const signup = () => {
    return {
        type: 'SIGNUP'
    };
};