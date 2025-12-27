import React, { useEffect, useState } from "react";
import axios from "axios";
import Paintings from "./paintings";

function Get() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1000/api/Products');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <main>
                <div className="bahubali">
                    <div className="about-mainheading mainheading">Get Paintings</div>
                    <div className="about-subheading subheading" id="sub">
                        <p>"Turn Your Money in Art"</p>
                    </div>
                </div>
                <div className="projects-main">
                    <Paintings />
                    {/* <Paintings /> */}
                </div>
            </main>
        </>
        // <div>
        //     <h1>Your Data:</h1>
        //     <ul>
        //         {data.map((item) => (
        //             <li id={item._id}>
        //                 {item.fname} - {item.femail} - {item.fmsg}
        //             </li>
        //         ))}
        //     </ul>
        // </div>
    );


}

export default Get;