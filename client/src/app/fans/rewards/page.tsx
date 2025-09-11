import React from "react";
import { cn } from "@/lib/utils";

function RewardContent() {
  return (
    <div className="min-h-screen  text-white p-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Rewards</h1>
        <p className="text-gray-400">Track your balance and redeem your coins</p>
      </div>

      {/* Balance & Redeem Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
        {/* Balance Card */}
        <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-gray-800 shadow-lg flex flex-col justify-between">
          <h2 className="text-lg font-medium text-gray-400">Your Balance</h2>
          <div className="mt-6 text-6xl font-extrabold tracking-tight">
            2,450 <span className="text-4xl text-gray-400">c</span>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Keep streaming to unlock more rewards!
          </p>
        </div>

        {/* Redeem Options */}
        <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-gray-800 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Redeem</h2>
          <div className="space-y-4">
            {["MTN Airtime", "Glo Airtime", "Airtel Airtime"].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4  transition-colors"
              >
                <span className="text-white font-medium">{item}</span>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-all shadow-md hover:shadow-lg">
                  Redeem
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Transaction History</h2>

        <div className="overflow-hidden rounded-xl border border-gray-800 shadow-lg">
          {/* Table Header */}
          <div className="grid grid-cols-3 gap-4 py-3 px-4 bg-gray-900 text-gray-400 text-sm font-medium">
            <div>Date</div>
            <div>Description</div>
            <div className="text-right">Amount</div>
          </div>

          {/* Rows */}
          <div className="max-h-72 overflow-y-auto divide-y divide-gray-800">
            {[
              { date: "Aug 20, 2025", desc: "Redeemed MTN Airtime", amount: "-500", type: "debit" },
              { date: "Aug 18, 2025", desc: "Referral Bonus", amount: "+200", type: "credit" },
              { date: "Aug 15, 2025", desc: "Shared Track", amount: "+100", type: "credit" },
              { date: "Aug 10, 2025", desc: "Redeemed Glo Airtime", amount: "-300", type: "debit" },
              { date: "Aug 07, 2025", desc: "Shared Track", amount: "+150", type: "credit" },
            ].map((tx, idx) => (
              <div
                key={idx}
                className="grid grid-cols-3 gap-4 py-3 px-4 hover:bg-gray-800/50 transition"
              >
                <div className="text-gray-400">{tx.date}</div>
                <div>{tx.desc}</div>
                <div
                  className={cn(
                    "font-semibold text-right",
                    tx.type === "credit" ? "text-green-400" : "text-red-400"
                  )}
                >
                  {tx.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RewardContent;
