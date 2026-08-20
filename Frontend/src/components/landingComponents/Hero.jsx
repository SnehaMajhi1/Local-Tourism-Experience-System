
import React from 'react'

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero-nepal.png"
          alt="Nepal heritage architecture"
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Dark Overlay */}
       <div className="absolute inset-0 bg-black/55"></div> 
      

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-[1550px] px-8">

          <div className="max-w-[900px] text-left">

            {/* Main Heading */}
            <h1
              className="text-white"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '58px',
                fontWeight: '400',
                lineHeight: '1.15',
                letterSpacing: '0px',
              }}
            >
              EXPERIENCE NEPAL
              <br />
              THROUGH LOCAL EYES
            </h1>

            {/* Description */}
            <p
              className="mt-7 max-w-[700px] text-white"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '18px',
                fontWeight: '400',
                lineHeight: '1.7',
                letterSpacing: '0px',
              }}
            >
              Discover authentic experiences, culture, and warm hospitality from
              local hosts across the hills, valleys and villages of Nepal.
            </p>

          </div>

        </div>
      </div>

    </section>
  )
}

export default Hero