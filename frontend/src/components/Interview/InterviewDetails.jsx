'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const InterviewDetails = () => {
  const { id } = useParams();
  const [interview, setInterview] = useState(null);
  const parms=useParams()
  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/interview/${parms.id}`);
        console.log(res.data);
        setInterview(res.data.interview);
      } catch (err) {
        console.error('Error fetching interview:', err);
      }
    };
    fetchInterview();
  }, [id]);

  if (!interview) {
    return <div className="text-center mt-20 text-xl text-gray-500">Loading...</div>;
  }

  const chartData = [
    { name: 'Score', value: interview.score || 0 },
    { name: 'Remaining', value: 100 - (interview.score || 0) },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 bg-[] shadow-xl rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Interview Details</h2>

      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-lg"><strong>Company:</strong> {interview.company}</p>
          <p className="text-lg"><strong>Job Profile:</strong> {interview.jobProfile}</p>
          <p className="text-lg"><strong>Experience Level:</strong> {interview.experienceLevel}</p>
          <p className="text-lg"><strong>Status:</strong> <span className={`font-semibold ${interview.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>{interview.status}</span></p>
          <p className="text-lg"><strong>Date:</strong> {new Date(interview.date).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-lg"><strong>Skills:</strong> {interview.skills.join(', ')}</p>
          <p className="text-lg"><strong>Questions:</strong> {interview.questions.length}</p>
          <p className="text-lg"><strong>Answers:</strong> {interview.answers?.length || 0}</p>
        </div>
      </div>

      {/* Score Chart */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-center text-blue-800 mb-4">Performance Score</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <p className="text-center mt-2 text-lg font-medium text-gray-700">Score: {interview.score || 0}%</p>
      </div>

      {/* Feedback */}
      {interview.feedback && (
        <div className="mt-10 bg-gray-50 border-l-4 border-blue-700 p-6 rounded-lg shadow">
          <h4 className="text-xl font-bold text-blue-800 mb-2">Feedback</h4>
          <p className="text-gray-800">{interview.feedback}</p>
        </div>
      )}

      {/* Code Section */}
      {interview.code && (
        <div className="mt-10">
          <h4 className="text-xl font-bold text-blue-800 mb-2">Code Snippet</h4>
          <pre className="bg-black text-green-300 p-4 rounded overflow-auto max-h-60">
            <code>{interview.code}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default InterviewDetails;
