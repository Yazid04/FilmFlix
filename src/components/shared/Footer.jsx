import React, {useId} from 'react'
import {RiFacebookCircleFill, RiCopyrightLine} from 'react-icons/ri'
import {AiFillTwitterCircle, AiFillInstagram, AiFillGithub, AiFillGoogleCircle} from 'react-icons/ai'
import logo from '../assets/logo.png'
import logoLight from '../assets/logoLight.png'
import { useGlobalContext } from '../context/context'


export const Footer = () => {
    const date = new Date().getFullYear();
    const {theme} = useGlobalContext();
    const socialMediaIcons = [
      {
        id: useId(),
        icon: (<RiFacebookCircleFill />),
      },
      {
        id: useId(),
        icon: (<AiFillGithub />),
      },
      {
        id: useId(),
        icon: (<AiFillInstagram />),
      },
      {
        id: useId(),
        icon: (<AiFillTwitterCircle />),
      },
      {
        id: useId(),
        icon: (<AiFillGoogleCircle />),
      },
    ]
  return (
    <section className={`w-full h-min py-5 ${theme === 'dark' ? 'bg-navbar text-PrimaryTextClr' : 'bg-cardsBg text-PrimaryTextClr'} max-w-[85rem] mx-auto mt-10 grid place-content-center`}>
       <div className='w-min h-min px-3'>
         <div className='flex items-center gap-x-3 min-w-[18rem] justify-around my-4'>
            {socialMediaIcons.map(({icon, id}) => {
              return (
                <button key={id} className='cursor-pointer text-4xl outline-none hover:transition-all hover:text-[#aaaaaa]'>
                  {icon}
                </button>
              )
            })}            
         </div>
         <div className='md:flex md:w-min'>
         <div className='min-w-[18rem] h-min grid grid-cols-2 grid-rows-2 text-center gap-5 my-4'>
             <li className='list-none'><button>Privacy & Terms</button></li>
             <li className='list-none'><button>Contact Us</button></li>
             <li className='list-none'><button>Support</button></li>
             <li className='list-none'><button>FAQ</button></li>
         </div>
         <div className={`h-24 mb-4 md:w-72 md:h-32`}>
           <img className='w-full h-full' src={theme === 'dark' ? logo : logoLight} alt='FilmFlix logo' />
         </div>
         </div>
         <div className='flex items-center justify-center h-10'>
           <RiCopyrightLine className='h-full' />
           <p>Copyright {date}. All rights reserved.</p>
        </div>
       </div>
    </section>
  )
}
