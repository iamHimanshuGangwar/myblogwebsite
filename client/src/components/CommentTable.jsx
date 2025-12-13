import React from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import Moment from 'moment'
import { Trash2, CheckCircle } from 'lucide-react'

const CommentTable = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id, name, content, isApproved } = comment
  const { axios } = useAppContext()

  const approveComment = async () => {
    try {
      const { data } = await axios.post('/api/admin/approve-comment', { id: _id })
      if (data && data.success) {
        toast.success(data.message || 'Comment approved')
        fetchComments()
      } else {
        toast.error(data?.message || 'Failed to approve comment')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Failed to approve comment')
    }
  }

  const deleteComment = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this comment?')
    if (!confirmed) return
    try {
      const { data } = await axios.post('/api/admin/delete-comment', { id: _id })
      if (data && data.success) {
        toast.success(data.message || 'Comment deleted')
        fetchComments()
      } else {
        toast.error(data?.message || 'Failed to delete comment')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Failed to delete comment')
    }
  }

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900 transition-colors">
      <td className="px-6 py-4 align-top">
        <div className="space-y-2">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase">Blog Title</p>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-1">
              {blog?.title || 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase">Commenter</p>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{name}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase">Comment</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 max-w-xs line-clamp-2">{content}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 align-top max-sm:hidden text-center">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {Moment(createdAt).format('MMM DD, YYYY')}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">{Moment(createdAt).format('hh:mm A')}</p>
      </td>
      <td className="px-6 py-4 align-top">
        <div className="flex items-center justify-end gap-3 flex-wrap">
          {!isApproved ? (
            <button
              onClick={approveComment}
              className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-full shadow hover:scale-105 transition-transform text-sm font-medium"
              title="Approve comment"
            >
              <CheckCircle size={16} />
              <span className="max-sm:hidden">Approve</span>
            </button>
          ) : (
            <span className="inline-flex items-center px-4 py-2 border border-green-600 bg-green-50 text-green-700 rounded-full text-sm font-medium">
              ✓ Approved
            </span>
          )}
          <button
            onClick={deleteComment}
            className="inline-flex items-center gap-1 px-4 py-2 bg-red-600 text-white rounded-full shadow hover:scale-105 transition-transform text-sm font-medium"
            title="Delete comment"
          >
            <Trash2 size={16} />
            <span className="max-sm:hidden">Delete</span>
          </button>
        </div>
      </td>
    </tr>
  )
}

export default CommentTable
