'use client'

import { useArtistPermissions } from "@/lib/queries/track-queries";
import { ArtistTier } from "@/helper/mock";
import CampaignTierPage from "../../Components/CampaignModal"

function Promote() {
const { data: artist } = useArtistPermissions();
const currentTier = artist?.data?.tier as ArtistTier;
const previousPage = () => {

}

const UpgradeTier = () => {

}
  return (
    <div>
    <CampaignTierPage currentTier={currentTier} onBack={previousPage} onUpgrade={ UpgradeTier} />
    </div>
  )
}

export default Promote