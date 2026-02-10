export default function BugCard({ bug }) {
    const statusColor = {
        "Open": "bg-red-100 text-red-600",
        "In Progress": "bg-yellow-100 text-yellow-700",
        "Resolved": "bg-green-100 text-green-600"
    };

    const priorityColor = {
        "Low": "bg-gray-100 text-gray-600",
        "High": "bg-orange-100 text-orange-600",
        "Critical": "bg-red-100 text-red-600"
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5 
                    hover:shadow-md transition">

            <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-800">{bug.title}</h3>

                <div className="flex gap-2 text-xs">
                    <span className={`px-2 py-1 rounded-full ${statusColor[bug.status]}`}>
                        {bug.status}
                    </span>

                    <span className={`px-2 py-1 rounded-full ${priorityColor[bug.priority]}`}>
                        {bug.priority}
                    </span>
                </div>
            </div>

            <p className="text-sm text-gray-500 mt-2">
                Reported on {bug.date}
            </p>

            <button
                onClick={() => window.location.href = `/bugs/${bug.id}`}
                className="mt-3 text-blue-600 font-medium hover:underline"
            >
                View Details →
            </button>

        </div>
    );
}
