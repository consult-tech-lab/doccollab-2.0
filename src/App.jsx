import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { ThemeProvider } from '@/lib/ThemeContext';
import AppLayout from '@/components/layout/AppLayout';
import Home from '@/pages/Home';
import Features from '@/pages/Features';
import AmbientAI from '@/pages/AmbientAI';
import Session from '@/pages/Session';
import Compliance from '@/pages/Compliance';
import Devices from '@/pages/Devices';
import Learn from '@/pages/Learn';
import EvidenceTools from '@/pages/EvidenceTools';
import NotesVault from '@/pages/NotesVault';
import ClinicalWorkspace from '@/pages/ClinicalWorkspace';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/ambient-ai" element={<AmbientAI />} />
        <Route path="/session" element={<Session />} />
        <Route path="/compliance" element={<Compliance />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/evidence" element={<EvidenceTools />} />
        <Route path="/notes-vault" element={<NotesVault />} />
        <Route path="/workspace" element={<ClinicalWorkspace />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App