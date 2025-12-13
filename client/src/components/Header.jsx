import React, { useRef } from 'react'
import { Search, X, Sparkles, ArrowRight } from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const Header = () => {
  const { setInput, input } = useAppContext()
  const inputRef = useRef()

  const onSubmitHandler = (e) => {
    e.preventDefault()
    const value = inputRef.current?.value ?? ''
    setInput(value)
  }

  const onClear = () => {
    setInput('')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <header className="relative px-6 pt-24 pb-28 sm:pt-32 sm:pb-28 overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">

      {/* Background */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br 
        from-purple-600 via-pink-400 to-orange-300 
        opacity-70 -z-10 pointer-events-none rounded-b-3xl"></div>

      {/* Glow Shapes */}
      <div className="absolute -top-32 -right-20 w-72 h-72 bg-purple-700/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-24 w-96 h-96 bg-pink-600/30 rounded-full blur-3xl"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full
            bg-indigo-700/80 backdrop-blur-sm text-white font-semibold">
          <Sparkles className="w-5 h-5 text-yellow-300" />
          <span className="text-xs font-bold tracking-widest uppercase">
            ✨ New: AI Power Added
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-6 
            text-slate-900 dark:text-white">
          Create Smarter <br className="hidden sm:block" />

          <span
            className="bg-clip-text text-transparent 
            bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-800
            font-extrabold"
          >
            Intelligent Blogging
          </span>{" "}
          Platform
        </h1>

        {/* Subtitle */}
        <p className="text-slate-800 dark:text-gray-200 text-lg sm:text-xl mb-10 max-w-2xl mx-auto font-semibold leading-relaxed">
          Your space to think out loud. Share what matters, write freely,
          and let our AI boost your creativity.
        </p>

        {/* Search Box */}
        <form onSubmit={onSubmitHandler} className="relative max-w-2xl mx-auto group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center">
            <Search className="h-6 w-6 text-slate-800/80 dark:text-gray-200" />
          </div>

          <input
            ref={inputRef}
            type="text"
            placeholder="Search for topics, ideas, or stories..."
            className="block w-full pl-14 pr-40 py-4 
              bg-white/80 dark:bg-gray-800/70 border border-white/60 dark:border-gray-700
              rounded-full text-gray-800 dark:text-white placeholder-gray-600 dark:placeholder-gray-300 font-medium
              focus:outline-none focus:ring-4 focus:ring-blue-400/50 focus:border-white/80
              backdrop-blur-md transition-all"
          />

          <div className="absolute inset-y-1.5 right-1.5">
            <button
              type="submit"
              className="h-full px-8 bg-gradient-to-r from-blue-600 to-indigo-600
                hover:from-blue-700 hover:to-indigo-700
                text-white rounded-full font-bold text-sm 
                transition-all flex items-center gap-2"
            >
              Search <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Clear Button */}
        {input && (
          <div className="mt-8">
            <button
              onClick={onClear}
              className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-full transition-all"
            >
              <X className="w-4 h-4" />
              Clear search results
            </button>
          </div>
        )}

      </div>
    </header>
  )
}

export default Header
