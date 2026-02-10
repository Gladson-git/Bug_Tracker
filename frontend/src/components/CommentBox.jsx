export default function CommentBox() {
  return (
    <div>
      <textarea
        className="border border-gray-200 w-full rounded-lg p-3 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="3"
        placeholder="Add a comment..."
      ></textarea>

      <button className="mt-3 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm">
        ➤ Add Comment
      </button>
    </div>
  );
}
