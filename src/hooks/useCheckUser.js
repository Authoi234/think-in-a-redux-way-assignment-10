import { useSelector } from 'react-redux';

const useCheckUser = () => {
    const auth = useSelector((state) => state.auth);

    if (auth?.accessToken && auth?.user) {
        return true;
    } else {
        return false;
    }
};

export default useCheckUser;