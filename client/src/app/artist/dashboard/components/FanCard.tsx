import { Fan } from '@/helper/type';
import Image from 'next/image';
import { Trophy } from 'lucide-react';
const FanCard = ({ fan }: { fan: Fan }) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
      <div className="relative">
        <Image
          src={fan.avatar}
          alt={fan.name}
          className="w-10 h-10 rounded-full object-cover"
          width={30}
          height={30}
        />
        {fan.rank <= 3 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">{fan.rank}</span>
          </div>
        )}
      </div>

      <div className="flex-1">
        <p className="font-medium text-foreground">{fan.name}</p>
        <p className="text-sm text-muted-foreground">{fan.shares} shares</p>
      </div>

      {fan.rank <= 3 && <Trophy className="h-4 w-4 text-yellow-500" />}
    </div>
  );
};

export default FanCard;
