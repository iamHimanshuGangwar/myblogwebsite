import React from 'react'
import { assets, footer_data } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Footer = () => {
  const { theme } = useAppContext()

  const footerBg = theme === 'dark'
    ? 'bg-gray-900 border-t border-gray-800'
    : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'

  const textColor = theme === 'dark' ? 'text-gray-100' : 'text-white'
  const mutedText = theme === 'dark' ? 'text-gray-400' : 'text-white/90'
  const glowColor = theme === 'dark' ? 'bg-gray-700/10' : 'bg-white/10'

  return (
    <footer className={`relative ${footerBg} ${textColor} pt-16 pb-8 px-6 md:px-16 lg:px-24 xl:px-32 overflow-hidden transition-colors duration-300`}>

      {/* Glow shapes */}
      <div className={`absolute -top-32 -right-20 w-72 h-72 ${glowColor} rounded-full blur-3xl animate-pulse`}></div>
      <div className={`absolute -bottom-40 -left-24 w-96 h-96 ${glowColor} rounded-full blur-3xl animate-pulse`}></div>

      {/* Logo and tagline */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <img 
          className={`w-32 sm:w-44 cursor-pointer transition-all ${
            theme === 'dark' ? 'brightness-100' : 'brightness-0 invert'
          }`} 
          src={assets.logo} 
          alt="logo" 
        />
      
      </div>

      {/* Links sections */}
      <div className="flex flex-wrap justify-between mt-10 gap-10">
        {footer_data.map((section, index) => (
          <div key={index}>
            <h3 className={`text-base font-semibold mb-4 ${textColor}`}>{section.title}</h3>
            <ul className={`space-y-2 text-sm ${mutedText}`}>
              {section.links.map((link, i) => (
                <li key={i}>
                  <a 
                    href="#" 
                    className={`hover:${textColor} transition-colors duration-300`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom copyright */}
      <p className={`w-full text-center ${mutedText} mt-10 text-sm md:text-base`}>
        © 2025 AiBlog - All Rights Reserved
      </p>
    </footer>
  )
}

export default Footer
