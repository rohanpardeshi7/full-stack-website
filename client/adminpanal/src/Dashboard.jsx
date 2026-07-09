import React from 'react'
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <Card 
        color="bg-purple-600" 
        title="Users" 
        value="26K" 
        percentage="(-12.4%)" 
        trend="↓"
      />
      <Card 
        color="bg-blue-600" 
        title="Product" 
        value="$6,200" 
        percentage="(40.9%)" 
        trend="↑"
      />
      <Card 
        color="bg-red-600" 
        title="Orders" 
        value="44K" 
        percentage="(-23.6%)" 
        trend="↓"
      />
      <Card 
        color="bg-yellow-400" 
        title="Category" 
        value="2.49%" 
        percentage="(84.7%)" 
        trend="↑"
      />
    </div>
  )
}

const Card = ({ color, title, value, percentage, trend, className }) => {
  return (
    <div className={`rounded-lg p-8 ${color} ${className} text-white`}>
      <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-semibold">{title}</h3>
        <button className="text-white">...</button>
      </div>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm mt-2">
        <span>{trend}</span> {percentage}
      </p>
    </div>
  );
};
