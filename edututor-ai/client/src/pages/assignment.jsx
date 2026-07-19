import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

const AssignmentPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const assignment = location.state?.assignment;

  if (!assignment) {
    return (
      <div className="text-center p-10 text-white bg-black min-h-screen">
        <h2 className="text-xl text-red-500">Assignment not found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 text-pink-400 underline">Go Back</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d1f] text-white p-8">
      <h1 className="text-3xl font-bold text-green-400 mb-4">{assignment.course}</h1>
      <div className="bg-[#222] p-6 rounded-lg border border-pink-500">
        <h2 className="text-xl mb-2 font-semibold">Assignment Details</h2>
        <p className="text-lg text-gray-300 mb-4">{assignment.assignment}</p>
        <p className="text-sm text-gray-400 mb-4">Due Date: {assignment.due}</p>

        <div className="mt-6">
          <textarea
            placeholder="Paste your solution or upload below..."
            className="w-full p-3 text-black rounded-md"
            rows={5}
          ></textarea>

          <div className="mt-4">
            <input type="file" className="text-pink-500" />
            <button className="ml-4 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentPage;
