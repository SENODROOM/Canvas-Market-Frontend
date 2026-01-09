import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Section(props) {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };
    return (
        <>
            <h2 className="section-header1" onClick={handleClick}>
                <div className='section-header-h'>
                    {props.heading}
                </div>
                <div className='section-header-a'>
                    <i className={`fas fa-chevron-circle-down ${isActive ? 'arrow-rotate' : ''}`}></i>

                </div>
            </h2>
            <div
                className={`section-content ${isActive ? 'section-content-allow' : ''}`}
            >
                {props.data.map((item, index) => {
                    const isLast = index === props.data.length - 1;
                    return (
                        
                        <div className="section-content-section" key={index}>
                            <h3 className={`sub-header`}>
                                {props.id}.{index + 1} {item.h1}:
                            </h3>
                            <p className={`${isLast ? 'margin-bottom-30' : ''}`}>
                                {item.p}
                            </p>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Section;
