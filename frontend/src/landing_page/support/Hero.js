import React from 'react';

function Hero() {
    return ( 
        <section className='container-fluid' id='supportHero'>
            <div className='p-5' id='supportWrapper'>
                <h4>Support Portal</h4>
                <a href=''>Track Tickets</a>
            </div>

            <div className='row p-3 m-3'>
                <div className='col-lg-6 p-5'>
                    <h1 className='fs-3 '>Search for an answer or browse help topics to create a tickets</h1>
                    <input placeholder='Eg: How do I open my account, How do i activate F&O...'/>
                    <br />
                    <a href=''>Track account opening</a>
                    <a href=''>Track segment activation</a>
                    <a href=''>Intraday margins</a>
                    <a href=''>kite user manual</a>
                </div>

                <div className='col-lg-6 p-5'>
                    <h1 className='fs-3'>Featured</h1>
                    <ol>
                        <li><a href='' style={{lineHeight: "3.5"}}>Current Takeovers and Delisting - January 2024</a></li>
                        <li><a href=''>Latest Intraday leverages - MIS & CO</a></li>
                    </ol>
                </div>
            </div>
        </section>
     );
}

export default Hero;