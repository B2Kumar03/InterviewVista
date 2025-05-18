import React from 'react';
import { Bot, MessageCircle, ShieldCheck, Users2 } from 'lucide-react';

const features = [
  {
    title: 'AI Interviewer',
    description: 'Simulates real interview scenarios with AI-generated questions.',
    icon: <Bot className="w-8 h-8 text-green-400" />,
  },
  {
    title: 'Real-time Feedback',
    description: 'Get instant analysis on your performance and speaking patterns.',
    icon: <MessageCircle className="w-8 h-8 text-green-400" />,
  },
  {
    title: 'Privacy First',
    description: 'Your recordings and data are private and never shared.',
    icon: <ShieldCheck className="w-8 h-8 text-green-400" />,
  },
  {
    title: 'Peer Practice',
    description: 'Join rooms with friends or peers for collaborative interviews.',
    icon: <Users2 className="w-8 h-8 text-green-400" />,
  },
];

const FeaturesCard = () => {
  return (
    <section className="bg-[#0B1120] py-16 px-6 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
        Powerful Features to Boost Your Prep
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-[#0B1120] border border-gray-800 rounded-xl p-6 text-center hover:shadow-xl transition duration-300 hover:-translate-y-1"
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-400 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesCard;
