import { useContext } from 'react';
import GuestContext from '../context/Guest.provider';

const useGuest = () => {
	return useContext(GuestContext);
};

export default useGuest;
