import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show back button on the home page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <div className="fixed top-20 left-4 z-40 lg:top-24 lg:left-8">
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate(-1)}
        className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-sm hover:bg-white gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>
    </div>
  );
}
