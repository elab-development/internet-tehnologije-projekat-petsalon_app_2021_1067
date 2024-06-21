import { useState, useEffect } from 'react';
import axios from 'axios';

const useMusterije = (url) => {
    const [musterije, setMusterije] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const storedMusterije = sessionStorage.getItem('breeds');
            if (storedMusterije) {
                setMusterije(JSON.parse(storedMusterije));
                setLoading(false);
            } else {
                try {
                    const response = await axios.get(url);
                    setMusterije(response.data.slice(0, 9)); 
                    sessionStorage.setItem('breeds', JSON.stringify(response.data.slice(0, 9)));
                    setLoading(false);
                } catch (error) {
                    setError(error);
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [url]);

    return { musterije, setMusterije, loading, error };
};

export default useMusterije;
