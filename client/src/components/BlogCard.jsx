import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const BlogCard = ({ blog = {} }) => {
  const { title, description, category, image, _id, createdAt } = blog;
  const navigate = useNavigate();

  const createMarkup = (htmlContent) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = htmlContent;
    const text = tmp.textContent || tmp.innerText || "";
    return text.slice(0, 120) + "...";
  }

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className="group cursor-pointer flex flex-col h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 dark:hover:border-blue-600"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-video">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={image}
          alt={title}
        />
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h5 className="mb-3 text-xl font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-500 group-hover:to-pink-500 transition-all duration-300">
          {title}
        </h5>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-grow line-clamp-3 font-medium">
          {description ? createMarkup(description) : "No description available."}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
          <div className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 group/btn">
            Read Article
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1.5" />
          </div>
          {createdAt && (
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogCard
