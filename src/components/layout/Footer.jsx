import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Column 1 - Your Account */}
        <div>
          <h4 className="text-white font-semibold text-base">Your Account</h4>
          <ul className="space-y-2 mt-2">
            <li><a href="./Signin" className="hover:underline text-sm">Sign up</a></li>
            <li><a href="./Signin" className="hover:underline text-sm">Log in</a></li>
            <li><a href="/help" className="hover:underline text-sm">Help</a></li>
          </ul>
        </div>

        {/* Column 2 - Groups */}
        <div>
          <h4 className="text-white font-semibold text-base">Groups</h4>
          <ul className="space-y-2 mt-2">
            <li><a href="/calendar" className="hover:underline text-sm">Calendar</a></li>
            <li><a href="/topic" className="hover:underline text-sm">Topic</a></li>
            <li><a href="/events" className="hover:underline text-sm">Cities</a></li>
            <li><a href="/events" className="hover:underline text-sm">Online events</a></li>
          </ul>
        </div>

        {/* Column 3 - About */}
        <div>
          <h4 className="text-white font-semibold text-base">About</h4>
          <ul className="space-y-2 mt-2">
            <li><a href="#" className="hover:underline text-sm">Blog</a></li>
            <li><a href="#" className="hover:underline text-sm">Meetup Pro</a></li>
            <li><a href="#" className="hover:underline text-sm">Apps</a></li>
          </ul>
        </div>

        {/* Column 4 - Social Icons & App Links */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-white font-semibold text-base">Follow Us</h4>
          <p className="text-gray-400 text-sm">Stay connected with us on social media.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-white">
              <FaFacebookF className="text-base" />
            </a>
            <a href="#" className="text-gray-500 hover:text-white">
              <FaTwitter className="text-base" />
            </a>
            <a href="#" className="text-gray-500 hover:text-white">
              <FaYoutube className="text-base" />
            </a>
            <a href="#" className="text-gray-500 hover:text-white">
              <FaInstagram className="text-base" />
            </a>
            <a href="#" className="text-gray-500 hover:text-white">
              <FaTiktok className="text-base" />
            </a>
          </div>

          <h4 className="text-white font-semibold text-base mt-4">Get it on</h4>
          <div className="flex space-x-2">
            <a href="#">
              <img
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Google Play"
                className="h-10 sm:h-8"
              />
            </a>
            <a href="#">
              <img
                src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg"
                alt="App Store"
                className="h-10 sm:h-8"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 text-center text-sm border-t border-gray-700 pt-4">
        <p>© Eventnow {new Date().getFullYear()}</p>
        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mt-2">
          <a href="#" className="hover:underline text-xs">Terms of service</a>
          <a href="#" className="hover:underline text-xs">Privacy policy</a>
          <a href="#" className="hover:underline text-xs">Cookies Settings</a>
          <a href="#" className="hover:underline text-xs">Help</a>
        </div>
      </div>

      {/* Custom CSS for Media Queries */}
      <style jsx>{`
        @media (max-width: 768px) {
          .py-6 {
            padding-top: 1.5rem;
            padding-bottom: 1.5rem;
          }
          .px-4 {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .gap-6 {
            gap: 1.5rem;
          }
          .text-base {
            font-size: 0.875rem;
          }
          .text-sm {
            font-size: 0.75rem;
          }
          .text-xs {
            font-size: 0.625rem;
          }
          .space-y-4 {
            gap: 0.75rem;
          }
          .space-x-4 {
            gap: 0.75rem;
          }
          .space-x-2 {
            gap: 0.5rem;
          }
          .h-10 {
            height: 2rem;
          }
          .mt-4 {
            margin-top: 0.75rem;
          }
          .mt-6 {
            margin-top: 1.5rem;
          }
          .pt-4 {
            padding-top: 1rem;
          }
        }
        @media (max-width: 640px) {
          .text-base {
            font-size: 0.75rem;
          }
          .text-sm {
            font-size: 0.625rem;
          }
          .text-xs {
            font-size: 0.5rem;
          }
          .h-10 {
            height: 1.75rem;
          }
          .space-x-4 {
            gap: 0.5rem;
          }
          .space-x-2 {
            gap: 0.25rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;