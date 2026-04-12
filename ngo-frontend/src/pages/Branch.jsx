import { useParams, Link } from "react-router-dom";

function Branch() {
  const { id } = useParams();

  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-8">
        Branch {id} Management
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Admission */}
        <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition text-center">
          <h2 className="text-xl font-semibold mb-3">📥 Admission</h2>
          <p className="text-gray-500 mb-4">Register new patient</p>

          <Link to={`/branch/${id}/admission`}>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Open Form
            </button>
          </Link>
        </div>

        {/* Discharge */}
        <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition text-center">
          <h2 className="text-xl font-semibold mb-3">📤 Discharge</h2>
          <p className="text-gray-500 mb-4">Remove patient record</p>

          <Link to={`/branch/${id}/discharge`}>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
              Open Form
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Branch;