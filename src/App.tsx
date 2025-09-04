// src/App.tsx
import type React from "react";
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTopOnRouteChange from "./components/common/scroll-to-top-on-route-change";
// Lazy load pages for code splitting
const HomePage = lazy(() => import("./pages/home-page"));
const LegalNotice = lazy(() => import("./pages/legal-notice"));
const PrivacyPolicy = lazy(() => import("./pages/privacy-policy"));
const ProjectDetail = lazy(() => import("./pages/project-detail"));
const NotFound = lazy(() => import("./pages/not-found"));

const App: React.FC = () => {
	return (
		<>
			<ScrollToTopOnRouteChange />
			<Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-beige text-violet">Loading...</div>}>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/projet/:projectId" element={<ProjectDetail />} />
					<Route path="/mentions-legales" element={<LegalNotice />} />
					<Route path="/politique-confidentialite" element={<PrivacyPolicy />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
		</>
	);
};

export default App;
