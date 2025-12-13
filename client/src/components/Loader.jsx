import React from 'react'

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400">
      <div className="relative w-20 h-20">
        {/* Outer glowing circle */}
        <div className="absolute inset-0 rounded-full bg-white/20 animate-ping blur-xl"></div>

        {/* Main spinner */}
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-white animate-spin"></div>

        {/* Inner glow */}
        <div className="absolute inset-2 rounded-full bg-white/10"></div>
      </div>
    </div>
  )
}

export default Loader
