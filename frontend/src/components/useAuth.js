import { useState, useEffect } from 'react';

function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
    // Implement your authentication logic here (e.g., check for a token in local storage)
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
        }, []);

return isAuthenticated;
}

export default useAuth;