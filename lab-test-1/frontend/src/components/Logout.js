import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Logout = () => {
    const navigate = useNavigate();
    function logOut() {
        localStorage.removeItem('token');
        alert('Logged out successfully!');
        navigate('/login'); // Redirect to login page
    }
    return(
        <button type="submit" className="btn btn-danger" style={{ margin: '10px' }} onClick={logOut}>
        Logout
        </button>
    )
};

export default Logout;