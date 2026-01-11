import React from 'react';

function Awards() {
    return ( 
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-lg-6 col-md-6 col-12 p-5'>
                    <img src='media/images/largestBroker.svg' />
                </div>
                <div className='col-lg-6 col-md-6 col-12 p-5 mt-3'>
                    <h1>Largest stocks broker in India</h1>
                    <p className='mb-5'>2+ millon Zerodha clients contribute to over 15% of all 
                        volumes in India daily by trading and investing in:</p>
                        <div className='row'>
                            <div className='col-6'>
                                <ul>
                            <li>
                                <p>Features and options</p>
                            </li>
                            <li>
                                <p>Commodity derivatives</p>
                            </li>
                            <li>
                                <p>Currency derivatives</p>
                            </li>
                        </ul>
                            </div>
                            <div className='col-6'>
                                <ul>
                            <li>
                                <p>Stocks &IPOs</p>
                            </li>
                            <li>
                                <p>Direct mutual funds</p>
                            </li>
                            <li>
                                <p>Bonds and Govt. Securities</p>
                            </li>
                        </ul>
                            </div>
                        </div>
                        
                </div>
            </div>
        </div>
    );
}

export default Awards;