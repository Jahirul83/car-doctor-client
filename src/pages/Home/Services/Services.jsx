/* import { useEffect } from "react";
import { useState } from "react"; */
import useServices from "../../../hooks/useServices";
import ServiceCard from "./ServiceCard";

const Services = () => {
    const services = useServices();

    /* const [services, setServices] = useState([]);
    useEffect(() => {
        fetch('https://car-doctor-server-red-xi.vercel.app/services')
            .then(res => res.json())
            .then(data => setServices(data));

    }, []) */
    return (
        <div className="mt-4">
            <div className="text-center w-1/2 mx-auto">
                <h3 className="text-2xl font-bold text-orange-600">Our Services</h3>
                <h3 className="text-5xl">Our Service Area</h3>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable. </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    services.map(service => <ServiceCard
                    key={service._id}
                    service={service}
                    ></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;