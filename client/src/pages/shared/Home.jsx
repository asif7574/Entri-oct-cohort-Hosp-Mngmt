import React from 'react'
import { LandingPage } from './LandingPage'

export const Home = () => {
  return (
    <div>
      

    <div>
      <section className="hero min-h-[50vh] bg-cover bg-center" style={{ backgroundImage: `url('https://source.unsplash.com/1600x900/?hospital,healthcare')` }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-white">
          <div>
          <h1 className="text-8xl font-bold mb-10  text-slate-600 items-center">
        Appolo Hospital
      </h1>
            <h1 className="text-5xl font-bold mb-4">World-Class Healthcare Services</h1>
            <p className="mb-6 text-lg">
              Providing trusted and compassionate care for your well-being.
            </p>
            <button className="btn btn-accent mr-4">Visit now</button>
            {/* <button className="btn btn-outline btn-info">Learn More</button> */}
          </div>
        </div>
      </section>

   
      <section className="py-12 bg-white">
        <h2 className="text-4xl text-center font-bold mb-8 text-primary">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
          {/* Card 1 */}
          <div className="card bg-base-100 shadow-lg">
            {/* <figure>
              <img src="https://source.unsplash.com/300x200/?doctor" alt="Doctors" />
            </figure> */}
            <div className="card-body">
              <h3 className="card-title">Expert Doctors</h3>
              <p>Highly trained professionals providing top-notch medical care.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Read More</button>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card bg-base-100 shadow-lg">
            {/* <figure>
              <img src="https://source.unsplash.com/300x200/?nurse,hospital" alt="Nursing" />
            </figure> */}
            <div className="card-body">
              <h3 className="card-title">24/7 Nursing Care</h3>
              <p>Compassionate and round-the-clock patient care services.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Read More</button>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card bg-base-100 shadow-lg">
            {/* <figure>
              <img src="https://source.unsplash.com/300x200/?pharmacy" alt="Pharmacy" />
            </figure> */}
            <div className="card-body">
              <h3 className="card-title">In-house Pharmacy</h3>
              <p>Access to medicines and prescriptions anytime, within the hospital.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Read More</button>
              </div>
            </div>
          </div>
        </div>
      </section>

  
      
    </div>
 

    </div>
  )
}
