import type React from "react";
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTopOnRouteChange from "./components/common/scroll-to-top-on-route-change";
import ErrorBoundary from "./components/common/error-boundary";
import SeoHead from "./components/common/seo-head";
import ThemeToggle from "./components/common/theme-toggle";
import { useTheme } from "./hooks/use-theme";
const HomePage = lazy(() => import("./pages/home-page"));
const LegalNotice = lazy(() => import("./pages/legal-notice"));
const PrivacyPolicy = lazy(() => import("./pages/privacy-policy"));
const ProjectDetail = lazy(() => import("./pages/project-detail"));
const NotFound = lazy(() => import("./pages/not-found"));

const App: React.FC = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<ErrorBoundary>
			<SeoHead />
			<ScrollToTopOnRouteChange />
			<ThemeToggle theme={theme} toggleTheme={toggleTheme} />
			<Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-beige dark:bg-dark-bg text-violet dark:text-beige">Loading...</div>}>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/projet/:projectId" element={<ProjectDetail />} />
					<Route path="/mentions-legales" element={<LegalNotice />} />
					<Route path="/politique-confidentialite" element={<PrivacyPolicy />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
		</ErrorBoundary>
	);
};

export default App;
