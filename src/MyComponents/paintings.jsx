import React, { useEffect, useState } from "react";
import axios from "axios";

function Paintings() {
  const [data, setData] = useState([]);
  const [dynamicModules, setDynamicModules] = useState([]);

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

  useEffect(() => {
    // Use data to dynamically import modules
    const loadDynamicModules = async () => {
      try {
        const modules = await Promise.all(
          data.map(async (item) => {
            const dynamicModule = await import(`../Images/UploadedImages/${item.fimg}`);
            return dynamicModule.default;
          })
        );

        setDynamicModules(modules);
      } catch (error) {
        console.error('Error loading dynamic modules:', error);
      }
    };

    loadDynamicModules();
  }, [data]);

  return (
    <>
      {data.map((item, index) => (
        <div className="projects-main-demo" key={item._id}>
          <img src={dynamicModules[index]} alt="" />
          <div className="projects-main-demo-content">
            <h3 className="projects-main-demo-content-h3">{item.fname}</h3>
            <div className="projects-main-demo-content-div">
                {item.femail}
                <br />
                Prize: {item.fmsg}-/Rs
            </div>
            {/* <div className="projects-main-demo-content-div">Prize: {item.fmsg}</div> */}
            <a href={item.projectUrl}>
              <button className="projects-main-demo-content-btn">
                Purchase
              </button>
            </a>
          </div>
        </div>
      ))}
    </>
  );
}

export default Paintings;

