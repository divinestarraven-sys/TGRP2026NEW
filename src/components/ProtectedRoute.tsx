import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingScreen from './LoadingScreen';

const TIER_LEVEL: Record<string, number> = { seed: 0, mycelium: 1, canopy: 2 };

interface Props {
  children: React.ReactNode;
  requiredTier?: 'seed' | 'mycelium' | 'canopy';
}

export default function ProtectedRoute({ children, requiredTier }: Props) {
  const { user, entitlement, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingScreen />;

  if (!user) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (requiredTier && requiredTier !== 'seed') {
    const userLevel = entitlement ? TIER_LEVEL[entitlement.tier] ?? 0 : 0;
    const requiredLevel = TIER_LEVEL[requiredTier] ?? 0;
    const isPaid = entitlement?.status === 'active';

    if (!isPaid || userLevel < requiredLevel) {
      const upgradePath = requiredTier === 'canopy' ? '/canopy-membership' : '/mycelium-membership';
      return <Navigate to={upgradePath} replace />;
    }
  }

  return <>{children}</>;
}
