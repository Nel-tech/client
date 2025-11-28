// "use client";

// import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
// import { useRouter, useParams } from "next/navigation";
// import { EditTrackDetails } from "../../Components/EditTrackDetails";

// export default function EditTrack() {
//   const { trackid } = useParams();
//   const router = useRouter();

//   const closeModal = () => {
//     router.back(); 
//   };

//   return (
//     <Dialog defaultOpen onOpenChange={closeModal}>
//        <DialogTitle>Edit Track</DialogTitle>
//     <DialogDescription>Make changes to your track details.</DialogDescription>
//       <DialogContent className="sm:max-w-[425px]">
//         <EditTrackDetails trackid={trackid as string} />
//       </DialogContent>
//     </Dialog>
//   );
// }
