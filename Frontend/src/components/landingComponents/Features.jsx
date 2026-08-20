import { CookingPot, Mountain, Palette, Sprout } from 'lucide-react'
import React from 'react'

const featuresData = [
    {
    title: "TRADITIONAL GURUNG VILLAGE EXPERIENCE",
    content: "Experience the traditional lifestyle, culture, and warm hospitality of the Gurung community while exploring a beautiful mountain village.",
    icon: Mountain,
    
    },
    {
        
    
    title: "SEL ROTI COOKING WORKSHOP",
    content: "Learn how to prepare authentic Nepali sel roti with local hosts and discover the traditional cooking techniques behind this beloved food.",
    icon: CookingPot,
    },

    {
      
    title: "RICE PLANTING EXPERIENCE IN NUWAKOT",
   content: "Join local farmers in Nuwakot and experience traditional rice planting while learning about Nepalese farming culture and rural life.",
    icon: Sprout,
    },
   
    {
    title: "POTTERY WORKSHOP IN BHAKTAPUR",
    content: "Discover the traditional pottery craft of Bhaktapur and create your own piece while learning from local artisans.",
    icon: Palette,
    },

   

]

const Features = () => {
  return ( //return lekhney betekai html tara {} leko vaney js suru huncha 
    <div className='px-20 py-24'>
    {/* heading */}
    <div>
        <h2 className='text-4xl font-bold text-center'>FEATURED EXPERIENCES</h2>

        {/* content */}
        <div className='grid grid-cols-4 gap-6 mt-20'> 
         {
           featuresData.map((feature, index)=>{
            return (
              <div className='border rounded p-4 
              border-grey-300'>
              <feature.icon/>

              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p> {feature.content}</p>
              </div>
            )
           })
         }
        </div> 
    </div>
    </div>
  )
}

export default Features