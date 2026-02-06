import React, { useState, useEffect, useCallback } from 'react';
import { OSProvider, useOS } from './contexts/OSContext';
import { FileSystemProvider } from './contexts/FileSystemContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Desktop from './components/desktop/Desktop';
import Onboarding from './components/onboarding/Onboarding';
import IOSApp from './components/mobile/IOSApp';
import WelcomeApp from './components/apps/WelcomeApp';
import './index.css';

// Mobile detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobileDevice = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isSmallScreen = window.innerWidth < 768;
    return isMobileDevice || isSmallScreen;
  });

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileDevice = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// Inner component that can use OS context
const DesktopWithWelcome = ({ showLockScreen, onLockScreenComplete }) => {
  const { openWindow } = useOS();
  const [welcomeOpened, setWelcomeOpened] = useState(false);

  // Open WelcomeApp after lock screen
  const openWelcomeApp = useCallback((initialSlide = 0) => {
    const onboardingComplete = localStorage.getItem('onboardingComplete');
    if (onboardingComplete !== 'true' && !welcomeOpened) {
      setWelcomeOpened(true);
      openWindow({
        id: 'welcome',
        appId: 'welcome',
        title: 'Bienvenue',
        icon: '👋',
        isKioskMode: true, // Mode plein écran spécial
        initialSlide: initialSlide,
        defaultSize: { width: 900, height: 650 },
      });
    }
  }, [openWindow, welcomeOpened]);

  // When lock screen completes, open welcome app
  const handleLockScreenComplete = () => {
    onLockScreenComplete();
    // Small delay to ensure desktop is rendered
    setTimeout(() => {
      openWelcomeApp();
    }, 300);
  };

  return (
    <>
      <Desktop isOnboarding={false} />
      {showLockScreen && (
        <Onboarding onComplete={handleLockScreenComplete} />
      )}
    </>
  );
};

function App() {
  const isMobile = useIsMobile();
  const [showLockScreen, setShowLockScreen] = useState(true);

  useEffect(() => {
    const lockScreenPassed = localStorage.getItem('lockScreenPassed');
    if (lockScreenPassed === 'true') {
      setShowLockScreen(false);
    }
  }, []);

  const handleLockScreenComplete = () => {
    setShowLockScreen(false);
  };

  // Mobile Version - Show iOS-style interface
  if (isMobile) {
    return <IOSApp />;
  }

  // Desktop Version - Show macOS-style interface
  return (
    <OSProvider>
      <FileSystemProvider>
        <NotificationProvider>
          <DesktopWithWelcome
            showLockScreen={showLockScreen}
            onLockScreenComplete={handleLockScreenComplete}
          />
        </NotificationProvider>
      </FileSystemProvider>
    </OSProvider>
  );
}

export default App;
