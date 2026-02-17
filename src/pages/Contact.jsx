import { useState, useRef } from 'react';

function Contact() {
    const formRef = useRef(null);
    const form2Ref = useRef(null);
    const mainRef = useRef(null);
    
    const [user, setUser] = useState({
        fname: "", 
        femail: "", 
        fmsg: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const PostData = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        const { fname, femail, fmsg } = user;
        
        try {
            const res = await fetch("http://localhost:5001/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fname, 
                    femail, 
                    fmsg
                })
            });
            
            const data = await res.json();
            
            if (res.ok) {
                // Hide form and show success message
                if (formRef.current) formRef.current.style.display = 'none';
                if (form2Ref.current) form2Ref.current.style.display = 'flex';
                if (mainRef.current) mainRef.current.style.margin = "200px 0 250px 0";
                
                // Reset form
                setUser({ fname: "", femail: "", fmsg: "" });
            } else {
                setError(data.message || "Something went wrong");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setError("Failed to submit form. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className='contact-main' ref={mainRef}>
            <div className="formdiv">
                <form method="POST" onSubmit={PostData}>
                    <h1 className="formh1">Contact Us</h1>
                    
                    <div id="form" ref={formRef}>
                        <p>Let us know how we can help you and our team will be in touch as soon as possible!</p>
                        
                        {error && (
                            <div className="error-message" style={{
                                color: 'red', 
                                marginBottom: '10px',
                                padding: '10px',
                                backgroundColor: '#ffebee',
                                borderRadius: '5px'
                            }}>
                                {error}
                            </div>
                        )}
                        
                        <div className="formdesign" id="name">
                            <input 
                                type="text" 
                                name="fname" 
                                required 
                                placeholder="Your Name" 
                                className="place" 
                                value={user.fname}
                                onChange={handleInputs}
                                disabled={isSubmitting}
                            />
                            <b><span className="formerror"></span></b>
                        </div>
                        
                        <div className="formdesign" id="email">
                            <input 
                                type="email" 
                                name="femail" 
                                required 
                                placeholder="Email" 
                                className="place" 
                                value={user.femail}
                                onChange={handleInputs}
                                disabled={isSubmitting}
                            />
                            <b><span className="formerror"></span></b>
                        </div>
                        
                        <div className="formdesign" id="msg">
                            <textarea 
                                name="fmsg" 
                                required 
                                placeholder="Message" 
                                className="place" 
                                value={user.fmsg}
                                onChange={handleInputs}
                                disabled={isSubmitting}
                            />
                            <b><span className="formerror"></span></b>
                        </div>
                        
                        <button 
                            className="contact-but but" 
                            type="submit" 
                            disabled={isSubmitting}
                            style={{
                                opacity: isSubmitting ? 0.6 : 1,
                                cursor: isSubmitting ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                    
                    <div id="form2" ref={form2Ref} style={{
                        display: 'none',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        padding: '20px'
                    }}>
                        <h2 style={{ color: 'whitesmoke', marginBottom: '15px' }}>
                            Thank you for contacting us!
                        </h2>
                        <p style={{ fontSize: '16px', color: '#666' }}>
                            We've received your message and will get back to you as soon as possible.
                        </p>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Contact;
