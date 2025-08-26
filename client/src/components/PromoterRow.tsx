import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PromoterRowProps } from '@/helper/helper';

const PromoterRow = ({
  avatar,
  username,
  streams,
  growth,
  rank,
}: PromoterRowProps) => (
  <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-3 hover:bg-white/10 transition-all duration-300 group">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="h-8 w-8 border border-orange-500/30">
            <AvatarImage src={avatar} alt={username} />
            <AvatarFallback className="bg-orange-500/20 text-white text-xs font-semibold font-poppins">
              {username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {rank <= 3 && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full flex items-center justify-center text-[8px] font-bold text-white">
              {rank}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-white text-sm font-medium font-poppins">
            {username}
          </span>
          <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-1000"
              style={{
                width: `${Math.min(parseInt(streams.replace(/[^\d]/g, '')) / 20, 100)}%`,
              }}
            />
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-white font-semibold text-sm font-poppins">
          {streams}
        </div>
        <div
          className={`text-xs font-medium font-poppins ${growth.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}
        >
          {growth}
        </div>
      </div>
    </div>
  </Card>
);

export default PromoterRow;
