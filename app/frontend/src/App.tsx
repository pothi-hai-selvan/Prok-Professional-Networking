import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ui/ErrorBoundary';
import { LoadingSpinner } from './components/ui/CommonComponents';
import './App.css';

// Lazy load components for better performance
const AppContent = React.lazy(() => import('./routes'));

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                  <LoadingSpinner size="lg" />
                  <p className="mt-4 text-black dark:text-white">Loading...</p>
                </div>
              </div>
            }>
              <AppContent />
            </Suspense>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
