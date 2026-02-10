import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function BugDetails() {
  const { id } = useParams();

  const [bug, setBug] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // TEMP: logged in user id = 1 (John Doe)
  const userId = 1;

  useEffect(() => {
    // Load bug details
    API.get(`/bugs/${id}`)
      .then(res => setBug(res.data))
      .catch(err => console.error(err));

    // Load comments
    API.get(`/comments/${id}`)
      .then(res => setComments(res.data))
      .catch(err => console.error(err));
  }, [id]);

  // Add new comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    await API.post(`/comments/${id}`, {
      user_id: userId,
      comment: newComment
    });

    setNewComment("");

    // Reload comments
    const res = await API.get(`/comments/${id}`);
    setComments(res.data);
  };

  if (!bug) return <p className="p-8">Loading...</p>;

  return (
    <div className="bg-gray-50 min-h-screen p-8">

      {/* Back */}
      <button
        onClick={() => window.history.back()}
        className="text-sm text-gray-600 mb-4"
      >
        ← Back to Project
      </button>

      {/* Bug Card */}
      <div className="bg-white border rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-2">{bug.title}</h2>

        <div className="flex gap-2 mb-4">
          <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600">
            {bug.status}
          </span>
          <span className="px-3 py-1 text-xs rounded-full bg-orange-100 text-orange-600">
            {bug.priority}
          </span>
        </div>

        <h3 className="font-semibold mb-1">Description</h3>
        <p className="text-gray-600 mb-4">
          {bug.description || "No description provided."}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 border-t pt-4">
          <p>👤 Created By: {bug.created_by || "—"}</p>
          <p>🧑‍💻 Assigned To: {bug.assigned_to || "—"}</p>
          <p>📅 Created At: {new Date(bug.created_at).toDateString()}</p>
          <p>⏱ Last Updated: {new Date(bug.updated_at).toDateString()}</p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="font-semibold mb-4">
          Comments ({comments.length})
        </h3>

        {/* Add Comment */}
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full border rounded-lg p-3 text-sm mb-3"
        />

        <button
          onClick={handleAddComment}
          className="bg-slate-900 text-white px-4 py-2 rounded text-sm"
        >
          Add Comment
        </button>

        <hr className="my-4"/>

        {/* Comment List */}
        <div className="space-y-4">
          {comments.map(c => (
            <div key={c.id} className="border rounded-lg p-4">
              <div className="flex justify-between mb-1">
                <p className="font-medium">{c.user_name}</p>
                <span className="text-xs text-gray-400">
                  {new Date(c.created_at).toLocaleString()}
                </span>
              </div>
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                {c.role.toLowerCase()}
              </span>
              <p className="text-gray-600 mt-2">{c.comment}</p>
            </div>
          ))}

          {comments.length === 0 && (
            <p className="text-gray-500 text-sm">
              No comments yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
