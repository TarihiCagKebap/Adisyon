import React from "react";

function DailyRevenue({ dailyRevenue }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Günlük Gelir</h1>

      <div className="w-96 bg-white p-6 rounded-lg shadow-lg">
        {Object.keys(dailyRevenue).length === 0 ? (
          <p className="text-lg text-gray-500">Henüz gelir kaydedilmedi.</p>
        ) : (
          <ul>
            {Object.entries(dailyRevenue).map(([date, amount]) => (
              <li key={date} className="text-lg">
                {date} → <span className="font-semibold">{amount}₺</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DailyRevenue;
