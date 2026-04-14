import MobileNavBar from "./MobileNavBar";
import TuneIcon from "@mui/icons-material/Tune";
const Footer = () => {
  return (
    <>
      <MobileNavBar />

      <footer className="hidden md:block py-16 px-16 bg-surface-container-low border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="text-primary text-3xl font-bold mb-6">
              The Cinematic Heritage
            </div>
            <p className=" max-w-sm text-text">
              Preserving and celebrating the rich history of Egyptian cinema.
              From the pioneering classics of the 1920s to the bold narratives
              of today.
            </p>
          </div>
          <div>
            <h4 className="text-on-surface font-bold mb-4">PLATFORM</h4>
            <ul className="space-y-2 text-text text-sm">
              <li>
                <a className="hover:text-primary" href="#">
                  Discover
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href="#">
                  Masterclasses
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href="#">
                  Virtual Archive
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href="#">
                  Membership
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-on-surface font-bold mb-4">SUPPORT</h4>
            <ul className="space-y-2 text-text text-sm">
              <li>
                <a className="hover:text-primary" href="#">
                  Contact Us
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href="#">
                  Terms of Use
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href="#">
                  Accessibility
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between items-center max-w-7xl mx-auto mt-12 pt-8 text-text text-xs border-t border-outline-variant/10">
          <p>© 2026 Ahmed Esawy. All rights reserved.</p>
          <div className="flex space-x-6">
            <a className="hover:text-primary" href="#">
              Instagram
            </a>
            <a className="hover:text-primary" href="#">
              Twitter
            </a>
            <a className="hover:text-primary" href="#">
              Vimeo
            </a>
          </div>
        </div>
        {/* <!-- Floating Filter FAB --> */}
        <button className="fixed right-8 bottom-24 md:bottom-8 flex items-center justify-center w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all z-40">
          <TuneIcon />
        </button>
      </footer>
    </>
  );
};

export default Footer;
