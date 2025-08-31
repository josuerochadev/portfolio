// src/App.tsx
import type React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import NotFound from "./pages/NotFound";
import LegalNotice from "./pages/LegalNotice";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const App: React.FC = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/mentions-legales" element={<LegalNotice />} />
			<Route path="/politique-confidentialite" element={<PrivacyPolicy />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default App;
