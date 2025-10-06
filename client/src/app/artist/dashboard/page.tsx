import ProtectedRoute from '@/middlewares/ProtectedRoutes';
import TropiqkArtistDashboard from './Artist';
function Dashboard() {
  return (
    <div>
      <ProtectedRoute allowedRoles={['Artist']}>
        <TropiqkArtistDashboard />
      </ProtectedRoute>
    </div>
  );
}

export default Dashboard;
