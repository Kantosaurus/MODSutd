import Link from 'next/link';

export default function Home() {

  return (
    <div className="min-h-screen bg-[#fcfbfa]">
      {/* Navigation */}
      <nav className="bg-white border-b-2 border-[#111110]">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-[#111110] tracking-[0.15em] uppercase">
                MODSutd
              </h1>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                href="/dashboard"
                className="text-[#111110] hover:text-[#dcbd8e] transition-colors uppercase tracking-[0.1em] text-sm font-semibold">
                Dashboard
              </Link>
              <Link
                href="/login"
                className="text-[#111110] px-6 py-2 border-2 border-[#111110] hover:bg-[#111110] hover:text-white transition-all duration-200 uppercase tracking-[0.1em] text-sm font-semibold">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-[#dcbd8e] hover:bg-[#c9a877] text-[#111110] px-6 py-2 transition-all duration-200 uppercase tracking-[0.1em] text-sm font-semibold">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-[1600px] mx-auto px-8 lg:px-16">
        <div className="pt-24 pb-32 lg:pt-32 lg:pb-48">
          <div className="max-w-4xl">
            <div className="inline-block mb-8 px-4 py-2 bg-[#111110] text-white text-xs uppercase tracking-[0.2em] font-semibold">
              Academic Excellence
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-[#111110] mb-8 leading-[0.95] tracking-tight uppercase">
              REDEFINING
              <br />
              <span className="text-[#dcbd8e]">MODULE</span>
              <br />
              MANAGEMENT
            </h1>
            <p className="text-xl sm:text-2xl text-[#111110] mb-12 max-w-2xl leading-relaxed opacity-80">
              A sophisticated platform for managing academic modules and student data at Singapore University of Technology and Design.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                href="/register"
                className="bg-[#111110] hover:bg-[#dcbd8e] hover:text-[#111110] text-white px-10 py-4 text-base font-semibold transition-all duration-200 uppercase tracking-[0.15em] border-2 border-[#111110] text-center">
                Get Started
              </Link>
              <a href="#features" className="bg-transparent text-[#111110] px-10 py-4 text-base font-semibold border-2 border-[#111110] hover:bg-[#111110] hover:text-white transition-all duration-200 uppercase tracking-[0.15em] text-center">
                Explore Features
              </a>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="py-24 border-t-2 border-[#111110]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            <div className="border-b-2 lg:border-b-0 lg:border-r-2 border-[#111110] p-12 hover:bg-white transition-all duration-300 group">
              <div className="mb-6">
                <div className="w-16 h-16 border-2 border-[#111110] flex items-center justify-center group-hover:bg-[#dcbd8e] transition-all duration-300">
                  <svg className="w-8 h-8 text-[#111110]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="square" strokeLinejoin="miter" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#111110] mb-4 uppercase tracking-[0.1em]">Course Management</h3>
              <p className="text-[#111110] opacity-70 leading-relaxed">Efficiently manage course information, prerequisites, and academic requirements with precision.</p>
            </div>

            <div className="border-b-2 lg:border-b-0 lg:border-r-2 border-[#111110] p-12 hover:bg-white transition-all duration-300 group">
              <div className="mb-6">
                <div className="w-16 h-16 border-2 border-[#111110] flex items-center justify-center group-hover:bg-[#dcbd8e] transition-all duration-300">
                  <svg className="w-8 h-8 text-[#111110]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="square" strokeLinejoin="miter" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#111110] mb-4 uppercase tracking-[0.1em]">Student Tracking</h3>
              <p className="text-[#111110] opacity-70 leading-relaxed">Track student enrollments, progress, and academic achievements systematically.</p>
            </div>

            <div className="p-12 hover:bg-white transition-all duration-300 group">
              <div className="mb-6">
                <div className="w-16 h-16 border-2 border-[#111110] flex items-center justify-center group-hover:bg-[#dcbd8e] transition-all duration-300">
                  <svg className="w-8 h-8 text-[#111110]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="square" strokeLinejoin="miter" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#111110] mb-4 uppercase tracking-[0.1em]">Smart Recommendations</h3>
              <p className="text-[#111110] opacity-70 leading-relaxed">AI-powered course recommendations based on prerequisites and academic history.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t-2 border-[#111110]">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-[#111110] text-sm uppercase tracking-[0.15em] font-semibold">
                &copy; 2024 MODSutd
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-[#111110] opacity-70 text-sm">
                Built with Next.js, TypeScript, and Tailwind CSS
              </p>
              <p className="text-[#111110] opacity-70 text-sm mt-1">
                Powered by PostgreSQL and Neo4j Graph Database
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
