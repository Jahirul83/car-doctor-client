import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";


const Bookings = () => {
    const { user } = useContext(AuthContext);
    const url = `http://localhost:5000/bookings?email=${user.email}`;
    const [bookings, setBookings] = useState([]);

    
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => console.log(data));
    }, [])
    return (
        <div>

        </div>
    );
};

export default Bookings;