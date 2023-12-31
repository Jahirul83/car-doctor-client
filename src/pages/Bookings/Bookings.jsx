import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import BookingRow from "./BookingRow";
// import axios from "axios";
import useAxiosSource from "../../hooks/useAxiosSource";
// import axios from "axios";


const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    const axiosSource = useAxiosSource();

    // const url = `https://car-doctor-server-red-xi.vercel.app/bookings?email=${user.email}`;
    const url = `/bookings?email=${user.email}`;

    useEffect(() => {

        axiosSource.get(url)
            .then(res => setBookings(res.data))


        /* axios.get(url, { withCredentials: true })
        .then(res=>{
            setBookings(res.data);
        })*/

        /*  fetch(url, { credentials: 'include' })
             .then(res => res.json())
             .then(data => setBookings(data)); */
    }, [url,axiosSource]);

    const handleBookingDelete = id => {
        const proceed = confirm("are you sure you want to delete this");
        if (proceed) {
            fetch(`https://car-doctor-server-red-xi.vercel.app/bookings/${id}`, {
                method: 'DELETE'

            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        alert('data deleted successful');
                        const remaining = bookings.filter(booking => booking._id !== id);
                        setBookings(remaining);
                    }
                });
        }
    }
    const handleBookingConfirm = id => {
        fetch(`https://car-doctor-server-red-xi.vercel.app/bookings/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'confirm' })

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    // update state
                    const remaining = bookings.filter(booking => booking._id !== id);
                    const updated = bookings.find(booking => booking._id === id);
                    updated.status = 'confirm'
                    const newBookings = [updated, ...remaining];
                    setBookings(newBookings);
                }
            });
    }
    return (
        <div>
            <h2 className="text-5xl">Bookings: {bookings.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            bookings.map(booking => <BookingRow
                                key={booking._id}
                                booking={booking}
                                handleBookingDelete={handleBookingDelete}
                                handleBookingConfirm={handleBookingConfirm}
                            ></BookingRow>)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Bookings;