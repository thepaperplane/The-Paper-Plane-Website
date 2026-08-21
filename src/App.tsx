import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PreLoader } from "./components/PreLoader";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { AIChatbotWidget } from "./components/AIChatbotWidget";
import { PageTransition } from "./components/PageTransition";

import { Home } from "./pages/Home";
import { ServicesPage } from "./pages/ServicesPage";
import { AboutPage } from "./pages/AboutPage";
import { NewsPage } from "./pages/NewsPage";
import { KnowledgePage } from "./pages/KnowledgePage";
import { CalendarPage } from "./pages/CalendarPage";
import { ContactPage } from "./pages/ContactPage";
import { NotFoundPage } from "./pages/NotFoundPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const renderActivePage = () => {
    switch (activeTab) {
      case "home":
        return <Home setActiveTab={setActiveTab} />;
      case "services":
        return <ServicesPage setActiveTab={setActiveTab} />;
      case "about":
        return <AboutPage setActiveTab={setActiveTab} />;
      case "news":
        return <NewsPage />;
      case "knowledge":
        return <KnowledgePage />;
      case "calendar":
        return <CalendarPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <NotFoundPage onReturnHome={() => setActiveTab("home")} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-600 selection:text-white flex flex-col justify-between relative overflow-x-hidden">
        {/* Pre-Loading Sequence */}
        {!loadingComplete && (
          <PreLoader onComplete={() => setLoadingComplete(true)} />
        )}

        {loadingComplete && (
          <>
            {/* Header / Navbar */}
            <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Main Content with Route Micro-Interaction */}
            <main className="flex-1 relative z-10">
              <PageTransition key={activeTab}>
                {renderActivePage()}
              </PageTransition>
            </main>

            {/* Persistent AI Chatbot Widget */}
            <AIChatbotWidget />

            {/* Global Footer */}
            <Footer setActiveTab={setActiveTab} />
          </>
        )}
      </div>
    </QueryClientProvider>
  );
}
