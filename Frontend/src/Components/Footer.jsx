import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#080b13] border-t border-slate-900/80">
      <footer className="footer xl:px-24 py-16 px-4 text-slate-400 max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="space-y-4">
          <span className="font-['Outfit'] text-2xl font-black tracking-tight leading-none text-white transition-colors duration-300">
            in<span className="bg-gradient-to-r from-green to-emerald-400 bg-clip-text text-transparent group-hover:from-emerald-400 group-hover:to-green transition-all duration-300">food</span>
          </span>
          <p className="my-5 md:w-56 text-sm leading-relaxed">
            Savor the artistry where every dish is a culinary masterpiece of flavor and hospitality.
          </p>
        </aside>
        <nav className="space-y-2">
          <h6 className="footer-title text-slate-200 font-bold uppercase tracking-wider text-xs">Useful links</h6>
          <a className="link link-hover hover:text-green transition-colors duration-300 text-sm">About us</a>
          <a className="link link-hover hover:text-green transition-colors duration-300 text-sm">Events</a>
          <a className="link link-hover hover:text-green transition-colors duration-300 text-sm">Blogs</a>
          <a className="link link-hover hover:text-green transition-colors duration-300 text-sm">FAQ</a>
        </nav>
        <nav className="space-y-2">
          <h6 className="footer-title text-slate-200 font-bold uppercase tracking-wider text-xs">Main Menu</h6>
          <a className="link link-hover hover:text-green transition-colors duration-300 text-sm">Home</a>
          <a className="link link-hover hover:text-green transition-colors duration-300 text-sm">Offers</a>
          <a className="link link-hover hover:text-green transition-colors duration-300 text-sm">Menus</a>
          <a className="link link-hover hover:text-green transition-colors duration-300 text-sm">Reservation</a>
        </nav>
        <nav className="space-y-2">
          <h6 className="footer-title text-slate-200 font-bold uppercase tracking-wider text-xs">Contact Us</h6>
          <a href="mailto:mir.saif.ali2004@gmail.com" className="link link-hover hover:text-green transition-colors duration-300 text-sm">mir.saif.ali2004@gmail.com</a>
          <a href="tel:+918649806002" className="link link-hover hover:text-green transition-colors duration-300 text-sm">+91 8649806002</a>
          <a className="link link-hover hover:text-green transition-colors duration-300 text-sm">Social Media Links</a>
        </nav>
      </footer>

      <div className="border-t border-slate-900/60 max-w-screen-2xl mx-auto"></div>

      <footer className="footer xl:px-24 py-8 px-4 items-center max-w-screen-2xl mx-auto text-slate-500 text-sm">
        <aside className="grid-flow-col items-center">
          <p>© {new Date().getFullYear()} infood. All rights reserved.</p>
        </aside>
        <nav className="grid-flow-col gap-5 md:place-self-center md:justify-self-end">
          <a className="hover:text-green transition-colors duration-300 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
            </svg>
          </a>
          <a className="hover:text-green transition-colors duration-300 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>
          <a className="hover:text-green transition-colors duration-300 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
