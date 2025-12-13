import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Sparkles, Image as ImageIcon, Loader2, Download } from 'lucide-react';
import toast from 'react-hot-toast';

const ImageGenerator = ({ onImageGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { axios, token } = useAppContext();

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt) {
      toast.error('Please enter a description for the image.');
      return;
    }

    setLoading(true);
    setImage(null); // Clear previous image

    try {
      const { data } = await axios.post(
        '/api/ai/image/generate-image',
        { prompt },
        { headers: { Authorization: token } }
      );

      if (data && data.success) {
        setImage(data.imageUrl);
        toast.success('Image generated successfully!');
        if (onImageGenerated) onImageGenerated(data.imageUrl);
      } else {
        toast.error(data?.message || 'Failed to generate image.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Failed to generate image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-200 dark:border-gray-700 transition-colors duration-300 mt-10">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
          <Sparkles className="text-purple-500" /> AI Image Generator
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
          Describe your idea and generate a unique AI image.
        </p>
      </div>

      {/* Input Section */}
      <form onSubmit={handleGenerate} className="flex gap-3 mb-6">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="E.g., 'A futuristic city made of glass at sunset'"
          className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 disabled:opacity-50 transition-all duration-200"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <ImageIcon size={20} />}
          {loading ? 'Creating...' : 'Generate'}
        </button>
      </form>

      {/* Image Display Section */}
      <div className="aspect-video bg-gray-100 dark:bg-gray-900 rounded-xl flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-700 relative group transition-colors duration-300">
        {loading ? (
          <div className="text-center">
            <Loader2 className="w-10 h-10 text-purple-500 animate-spin mx-auto mb-2" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">AI is painting your image...</p>
          </div>
        ) : image ? (
          <>
            <img src={image} alt="Generated" className="w-full h-full object-contain" />
            <a
              href={image}
              target="_blank"
              download
              className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              title="Download Image"
            >
              <Download size={20} />
            </a>
          </>
        ) : (
          <div className="text-gray-400 dark:text-gray-500 flex flex-col items-center">
            <ImageIcon size={48} className="mb-2 opacity-20" />
            <p className="text-sm">No image generated yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;
