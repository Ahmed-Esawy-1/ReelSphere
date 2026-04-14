import React from "react";

const page = () => {
  return (
    <div className="bg-background text-on-background min-h-screen relative overflow-x-hidden">
      {/* <!-- Hero Background Section --> */}
      <div className="fixed inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-40"
          data-alt="Interior of a majestic vintage Egyptian cinema hall with ornate architecture, red velvet seats, and a large glowing screen in a dim moody atmosphere"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_l33g_0Ij1aMAvZOKe__TBAEaX6gvT28ZX534Qs0MymMykUHSiZQ3DAXCm_DAaQ89KQZBKVbQfxY_WeroicTy9GgAqWb7UDz6U90qLEAXOcVm9LCAtbrYBAkPjLmIj7YHMx-M6yYd8kL-w2lSkpt3ptYQ72x9G4TZghHWMRWuuFWwu27pjGxO3Xrfq4KH-XT72JrmoY_gC0uvTf3ELt7WKbLjch7m3qraV8Qk52MWqH8HMZ-v19aIChcqB1jy28V5sNKAjfRJerE"
        />
        <div className="absolute inset-0 cinematic-overlay"></div>
      </div>
      {/* <!-- Top Navigation (Shared Component Logic - Suppression applied as this is a login screen, but using Brand Logo for Identity) --> */}
      <nav className="relative z-10 flex justify-between items-center w-full px-6 py-8">
        <div className="text-2xl font-serif text-primary-fixed-dim italic tracking-tight">
          The Cinematic Heritage
        </div>
        <div>
          <span
            className="material-symbols-outlined text-primary"
            data-icon="help_outline"
          >
            help_outline
          </span>
        </div>
      </nav>
      {/* <!-- Main Content Area --> */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 pt-12 pb-24 min-h-[calc(100vh-120px)]">
        {/* <!-- Header Text --> */}
        <div className="text-center mb-10 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-on-background mb-4 leading-tight">
            Welcome back to{" "}
            <span className="italic text-primary">Al-Fanous Cinema</span>
          </h1>
          <p className="text-on-surface-variant font-body text-lg max-w-md mx-auto">
            Step into the golden era of storytelling. Sign in to access your
            private archive.
          </p>
        </div>
        {/* <!-- Login Form Container --> */}
        <div className="glass-panel w-full max-auto max-w-md rounded-xl p-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-outline-variant/20">
          <form action="#" className="space-y-6">
            {/* <!-- Username/Email Field --> */}
            <div className="space-y-2">
              <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant font-semibold ml-1">
                Username or Email
              </label>
              <div className="relative">
                <span
                  className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline"
                  data-icon="mail"
                >
                  mail
                </span>
                <input
                  className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 focus:border-primary focus:ring-0 text-on-surface py-3 pl-11 pr-4 transition-colors duration-300"
                  placeholder="Enter your email"
                  type="text"
                />
              </div>
            </div>
            {/* <!-- Password Field --> */}
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant font-semibold ml-1">
                  Password
                </label>
                <a
                  className="text-xs text-primary font-body hover:text-primary-fixed transition-colors"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <span
                  className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline"
                  data-icon="lock"
                >
                  lock
                </span>
                <input
                  className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant/30 focus:border-primary focus:ring-0 text-on-surface py-3 pl-11 pr-4 transition-colors duration-300"
                  placeholder="••••••••"
                  type="password"
                />
                <span
                  className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline cursor-pointer hover:text-on-surface-variant transition-colors"
                  data-icon="visibility"
                >
                  visibility
                </span>
              </div>
            </div>
            {/* <!-- Remember Me --> */}
            <div className="flex items-center space-x-2">
              <input
                className="w-4 h-4 rounded bg-surface-container border-outline-variant text-primary focus:ring-primary focus:ring-offset-background"
                id="remember"
                type="checkbox"
              />
              <label
                className="text-sm text-on-surface-variant font-body"
                htmlFor="remember"
              >
                Remember me for 30 days
              </label>
            </div>
            {/* <!-- Primary Action --> */}
            <button
              className="w-full py-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-sm tracking-widest uppercase hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-primary-container/20"
              type="submit"
            >
              Sign In
            </button>
          </form>
          {/* <!-- Divider --> */}
          <div className="flex items-center my-8">
            <div className="flex-grow h-[1px] bg-outline-variant/20"></div>
            <span className="px-4 text-[10px] font-label uppercase tracking-widest text-outline">
              or continue with
            </span>
            <div className="flex-grow h-[1px] bg-outline-variant/20"></div>
          </div>
          {/* <!-- Social Logins --> */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-3 px-4 rounded-full bg-surface-container-high border border-outline-variant/20 hover:bg-surface-bright transition-colors group">
              <img
                className="w-5 h-5 opacity-80 group-hover:opacity-100"
                data-alt="Google colorful logo icon"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWU_mRYJgcFntSkAFGh1U3-A22o1uYQtojAV5SCLQrkbYwLsJ9cs2lmgYwl3CQHwOydt912FaL4-Mc5oyMILh1lfMJnIeFiutPk7hNm1TKROV7aUn5jX0sbf8dU3Mgtr7RuepiUKyGRCTBiM9f0VPg0gdiukpI7-IawMdC-UB21ITKi0leRSdvibP7gDDzQ2ufrc3lq6oYTdvgoRerYzQyaHplFxmhT4tBKh2zzg7taedDhegtWiPVAmSVwlGoeqThdzblXi2tiWA"
              />
              <span className="text-xs font-semibold tracking-wide text-on-surface">
                Google
              </span>
            </button>
            <button className="flex items-center justify-center gap-3 py-3 px-4 rounded-full bg-surface-container-high border border-outline-variant/20 hover:bg-surface-bright transition-colors group">
              <svg
                className="w-5 h-5 text-[#1877F2] fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
              </svg>
              <span className="text-xs font-semibold tracking-wide text-on-surface">
                Facebook
              </span>
            </button>
          </div>
        </div>
        {/* <!-- Footer Link --> */}
        <div className="mt-8 text-center">
          <p className="text-on-surface-variant font-body">
            Don't have an archive yet?
            <a
              className="text-primary font-bold ml-1 hover:underline underline-offset-4"
              href="#"
            >
              Register
            </a>
          </p>
        </div>
      </main>
      {/* <!-- Bottom Navigation Shell (Suppressing BottomNavBar as per transactional screen rule, but keeping aesthetic anchors) --> */}
      <footer className="relative z-10 px-6 py-12 text-center text-[10px] font-label uppercase tracking-widest text-outline">
        © 2024 The Cinematic Heritage. All Rights Reserved.
      </footer>
      {/* <!-- Decorative Grain Texture Overlay --> */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
    </div>
  );
};

export default page;
