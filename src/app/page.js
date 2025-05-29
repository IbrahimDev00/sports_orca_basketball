'use client';

import { useEffect, useState } from 'react';
import { VideoText } from "@/components/magicui/video-text";
import Image from 'next/image';

export default function Home() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch('/api/matches');
        const data = await res.json();
        setMatches(data);
      } catch (err) {
        console.error('Error fetching matches:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  // Pagination logic
  const matchesPerPage = 10;
  const totalPages = Math.ceil((matches?.length || 0) / matchesPerPage);
  const currentMatches = matches.slice(
    currentPage * matchesPerPage,
    (currentPage + 1) * matchesPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white px-4 py-8 space-y-12">
      {/* VideoText Header */}
      <div className="relative w-full h-[500px] overflow-hidden flex items-center justify-center">
        <VideoText
          src="https://res.cloudinary.com/dqlzpikl5/video/upload/v1748492782/krheq8y5vasm7t310wrf.mp4"
          fontSize="6vw"
          className="w-full h-full"
        >
          NBA Live Scores
        </VideoText>
      </div>

      {/* Match List */}
      <section className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Upcoming Matches</h2>
          
          {/* Pagination controls */}
          {!loading && matches.length > 0 && (
            <div className="flex items-center gap-4">
              <button 
                onClick={prevPage} 
                disabled={currentPage === 0}
                className={`p-2 rounded-full ${currentPage === 0 ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:bg-gray-800'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <span className="text-sm">
                {currentPage + 1} / {totalPages}
              </span>
              
              <button 
                onClick={nextPage}
                disabled={currentPage >= totalPages - 1}
                className={`p-2 rounded-full ${currentPage >= totalPages - 1 ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:bg-gray-800'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : matches.length === 0 ? (
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 rounded-xl text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xl text-gray-400">No matches found for the selected date.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentMatches.map((match) => (
                <div 
                  key={match.id}
                  className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-indigo-500"
                >
                  <div className="p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                  <div className="p-6">
                    <div className="flex flex-col space-y-6">
                      {/* Teams Container */}
                      <div className="flex justify-between items-center">
                        {/* Home Team */}
                        <div className="flex flex-col items-center text-center w-2/5">
                          <div className="bg-gray-700 h-16 w-16 rounded-full flex items-center justify-center mb-2 overflow-hidden">
                            {match.teams.home.logo ? (
                              <Image
                                src={match.teams.home.logo}
                                alt={`${match.teams.home.name} logo`}
                                width={48}
                                height={48}
                                className="object-contain"
                              />
                            ) : (
                              <span className="text-xl font-bold">{match.teams.home.name.slice(0, 3).toUpperCase()}</span>
                            )}
                          </div>
                          <h3 className="text-sm font-semibold">{match.teams.home.name}</h3>
                        </div>

                        {/* VS */}
                        <div className="flex flex-col items-center w-1/5">
                          <span className="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full">VS</span>
                        </div>

                        {/* Away Team */}
                        <div className="flex flex-col items-center text-center w-2/5">
                          <div className="bg-gray-700 h-16 w-16 rounded-full flex items-center justify-center mb-2 overflow-hidden">
                            {match.teams.away.logo ? (
                              <Image
                                src={match.teams.away.logo}
                                alt={`${match.teams.away.name} logo`}
                                width={48}
                                height={48}
                                className="object-contain"
                              />
                            ) : (
                              <span className="text-xl font-bold">{match.teams.away.name.slice(0, 3).toUpperCase()}</span>
                            )}
                          </div>
                          <h3 className="text-sm font-semibold">{match.teams.away.name}</h3>
                        </div>
                      </div>

                      {/* Time and Venue */}
                      <div className="pt-4 border-t border-gray-700 flex justify-between items-center">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-xs text-gray-400">{new Date(match.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-xs text-gray-400">{new Date(match.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom pagination for mobile */}
            <div className="md:hidden flex justify-center mt-8">
              <div className="flex items-center gap-4">
                <button 
                  onClick={prevPage} 
                  disabled={currentPage === 0}
                  className={`p-2 rounded-full ${currentPage === 0 ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:bg-gray-800'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <span className="text-sm">
                  {currentPage + 1} / {totalPages}
                </span>
                
                <button 
                  onClick={nextPage}
                  disabled={currentPage >= totalPages - 1}
                  className={`p-2 rounded-full ${currentPage >= totalPages - 1 ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:bg-gray-800'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}