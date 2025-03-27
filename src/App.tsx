import React from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Bio from "./components/bio";
import Projects from "./components/projects_section";
import Contact from "./components/contact";
import Footer from "./components/footer";

const App = () => {
  return (
    <div className="bg-custom-gray-100 text-custom-gray-900 dark:bg-custom-gray-900 dark:text-custom-gray-100 transition-colors duration-300">
      <Navbar />
      <main>
        <Hero />
        <Bio />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;