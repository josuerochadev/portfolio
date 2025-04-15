import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-darkgray text-beige py-6 px-4 text-center text-sm">
            <div className="flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto gap-4">
                {/* Name and rights */}
                <p className="text-xs">
                    &copy; {new Date().getFullYear()} Josué Xavier Rocha. All rights
                    reserved.
                </p>

                {/* Social links */}
                <div className="flex items-center gap-4 text-lg">
                    <a
                        href="https://github.com/josuexrocha"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="hover:text-orange transition-colors duration-300"
                    >
                        <FaGithub />
                    </a>
                    <a
                        href="https://linkedin.com/in/josuexrocha"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="hover:text-orange transition-colors duration-300"
                    >
                        <FaLinkedin />
                    </a>
                </div>
            </div>
        </footer>
    );
}
