import { tierData } from "@/helper/mock";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { ArtistTier } from "@/helper/mock";

interface CampaignTierPageProps {
  currentTier: ArtistTier;
  onUpgrade: (tier: ArtistTier) => void;
  onBack: () => void;
}

function CampaignTierPage({
  currentTier,
  onUpgrade,
}: CampaignTierPageProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                Choose Your Campaign Tier
              </h1>
              <p className="text-zinc-400 text-sm mt-1">
                Upgrade to unlock more features and reach a wider audience
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {Object.entries(tierData).map(([tier, data], index) => {
            const isCurrent = tier === currentTier;
            const TierIcon = data.icon;

            return (
              <motion.div
                key={tier}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  relative
                  rounded-2xl
                  bg-zinc-900/60
                  backdrop-blur
                  border-2
                  ${isCurrent ? data.borderColor : "border-zinc-800"}
                  hover:border-opacity-100
                  transition-all
                  duration-300
                  overflow-hidden
                  group
                `}
              >
                {/* Hover Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${data.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                {/* Current Plan Badge */}
                {isCurrent && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge
                      className={`bg-gradient-to-r ${data.color} border-0 text-white text-xs font-semibold px-3 py-1.5`}
                    >
                      Current Plan
                    </Badge>
                  </div>
                )}

                <div className="relative p-6 lg:p-8 space-y-6">
                  {/* Tier Header */}
                  <div className="space-y-4">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${data.color} flex items-center justify-center shadow-lg`}
                    >
                      <TierIcon className="w-7 h-7 text-white" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {data.name}
                      </h3>
                      <p className="text-sm text-zinc-400 mt-1">
                        {data.budget === 0
                          ? "Free Forever"
                          : `₦${data.budget.toLocaleString()} Budget`}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 py-3 px-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                    <div className="text-center flex-1">
                      <p className="text-2xl font-bold text-white">
                        {data.maxUpload}
                      </p>
                      <p className="text-xs text-zinc-400 mt-1">Max Uploads</p>
                    </div>
                    <div className="w-px h-10 bg-zinc-700" />
                    <div className="text-center flex-1">
                      <p className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                        {tier === "BASIC"
                          ? "Low"
                          : tier === "PRO"
                          ? "Med"
                          : "High"}
                      </p>
                      <p className="text-xs text-zinc-400 mt-1">Feed Boost</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {data.features.map((feature, idx) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <div
                          key={idx}
                          className={`flex items-center gap-3 ${
                            feature.available ? "text-zinc-200" : "text-zinc-600"
                          }`}
                        >
                          {feature.available ? (
                            <div
                              className={`w-5 h-5 rounded-full bg-gradient-to-br ${data.color} flex items-center justify-center flex-shrink-0`}
                            >
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
                              <div className="w-2 h-2 bg-zinc-600 rounded-full" />
                            </div>
                          )}
                          <FeatureIcon className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm">{feature.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => onUpgrade(tier as ArtistTier)}
                    disabled={isCurrent}
                    className={`w-full h-12 rounded-xl font-semibold transition-all duration-300 ${
                      isCurrent
                        ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                        : `bg-gradient-to-r ${data.color} hover:shadow-lg hover:scale-105 text-white`
                    }`}
                  >
                    {isCurrent ? (
                      "Current Plan"
                    ) : (
                      <>
                        {tier === "BASIC" ? "Current Plan" : "Upgrade"}
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <div className="rounded-xl bg-zinc-900/60 border border-zinc-800/50 p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#ff6b35]/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-[#ff6b35]" />
            </div>
            <div className="text-sm text-zinc-400">
              <p className="font-medium text-zinc-300 mb-2 text-base">
                Pro Tip
              </p>
              <p className="leading-relaxed">
                Higher tiers give your music more visibility and unlock powerful
                analytics to grow your audience. Upgrade anytime to scale your
                reach and maximize engagement.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CampaignTierPage;