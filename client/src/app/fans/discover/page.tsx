import DashboardHeader from '@/components/DashboardHeader';
import Carousel from '@/components/Caurosel';
import CardRow from '@/components/CardRow';
function Discover() {
  return (
    <div className="flex h-screen w-full  text-gray-200">
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header>
          <DashboardHeader />
        </header>

        {/* Scrollable Content */}
        <section className="flex-1  p-6">
          <h1 className="text-2xl font-bold mb-2 font-poppins">Discover</h1>
          <p className="text-gray-400 mb-6 font-poppins">
            Explore trending tracks, artists, and playlists curated for you.
          </p>

          <Carousel />

          <CardRow />
        </section>
      </main>
    </div>
  );
}

export default Discover;
