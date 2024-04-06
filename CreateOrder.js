import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./CreateOrder.css";



const steps = ['Product Details', 'Add Address', 'Review Order'];

export default function CreateOrder(cart, purchaseCount) {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());

    const [formData, setFormData] = useState({
        name: "",
        contactNumber: "",
        city: "",
        landmark: "",
        street: "",
        state: "",
        zipCode: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        console.log(formData);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle form submission here, such as sending data to a backend server
        console.log(formData);
        // Reset the form after submission
        setFormData({
            name: "",
            contactNumber: "",
            city: "",
            landmark: "",
            street: "",
            state: "",
            zipCode: ""
        });
    };


    useEffect(() => {
        async function loadadress() {

        }

    })

    const isStepOptional = (step) => {

    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            handlePlaceOrder(); // Update 'path-to-your-page' with the actual path
        } else {
            let newSkipped = skipped;
            if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
            }

            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    const renderproductDetails = () => {
        return (

            <div >
                <div className='detail'>
                    {cart && (
                        <>

                            <img className="image" src={cart.cart.imageURL} />

                            <div>
                                <h2>{cart.cart.name}</h2>

                                <h3>Price: {cart.cart.price}/-</h3>
                                {cart.cart.manufacturer && (
                                    <p> Manufacturer: {cart.cart.manufacturer}</p>
                                )}

                                <p> Description: {cart.cart.description}</p>
                                <p> Quantity: {cart.purchaseCount}</p>
                                <h3>Total: {cart.purchaseCount * cart.cart.price}</h3>

                            </div>



                        </>
                    )}
                </div>
            </div>


        )

    }


    const renderStepContent = () => {

        // STEP-1 showing details of product selected by user 
        if (activeStep === 0) {
            return renderproductDetails();
        }

        // STEP-2 ADDRESS
        if (activeStep === 1) {
            return (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="contactNumber">Contact Number:</label>
                    <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="landmark">Landmark:</label>
                    <input
                        type="text"
                        id="landmark"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleChange}
                    />

                    <label htmlFor="street">Street:</label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="state">State:</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="zipCode">Zip Code:</label>
                    <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Submit</button>
                </form>
            );
        }


        // STEP-3 conform order 
        if (activeStep === 2) {
            return (
                <>
                    {renderproductDetails()}
                    <p>
                        name: "{formData.name}",
                        contactNumber: "{formData.contactNumber}",
                        city: "{formData.city}",
                        landmark: "{formData.landmark}",
                        street: "{formData.street}",
                        state: "{formData.state}",
                        zipCode: "{formData.zipCode}"
                    </p>
                </>
            );
        }
    };

    async function handlePlaceOrder() {

        const { name, contactNumber, city, landmark, street, state, zipCode } = formData;

        // Define the address object to be sent in the POST request body
        const addressData = {
            name,
            contactNumber,
            city,
            landmark,
            street,
            state,
            zipCode,
        };

        console.log("adress",addressData);

        const accessToken = localStorage.getItem('accessToken');

        // Ensure the token exists before proceeding
        if (!accessToken) {
            console.error('Access token not found.');
            return;
        }

        fetch('http://localhost:3001/api/v1/addresses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ 
                name,
                contactNumber,
                city,
                landmark,
                street,
                state,
                zipCode, }),
        })
            .then(response => response.json())
            .then(data => {
                // save the data to local storage 
                const accessTocken = data.accessTocken
                localStorage.setItem('accessTocken', accessTocken);
                alert("ordered")
            })
            .catch(error => {
                // Handle the error
                console.error('Error posting address:', error.message);
            });

    }


    return (
        <div className='stepper'>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepOptional(index)) {
                            labelProps.optional = (
                                <Typography variant="caption">Optional</Typography>
                            );
                        }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {isStepOptional(activeStep) && (
                                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                    Skip
                                </Button>
                            )}

                            <Button onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>
            <div className='centre'>
                {renderStepContent()}
            </div>
        </div>
    );
}