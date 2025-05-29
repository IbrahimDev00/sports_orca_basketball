'use client';

import { useEffect, useState } from 'react';
import { VideoText } from "@/components/magicui/video-text";

export default function Home() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <main className="min-h-screen bg-black text-white px-4 py-8 space-y-12">
      {/* VideoText Header */}
      <div className="relative w-full h-[500px] overflow-hidden flex items-center justify-center">
        <VideoText
          src="https://res.cloudinary.com/dqlzpikl5/video/upload/v1748492782/krheq8y5vasm7t310wrf.mp4"
          fontSize="8vw"
          className="w-full h-full"
        >
          NBA Live Scores
        </VideoText>
      </div>

      {/* Match List */}
      <section>
        <h2 className="text-3xl font-bold mb-4 text-center">Upcoming Matches</h2>

        {loading ? (
          <p className="text-center text-gray-400">Loading matches...</p>
        ) : matches.length === 0 ? (
          <p className="text-center text-red-400">No matches found for the selected date.</p>
        ) : (
          <ul className="space-y-4 max-w-2xl mx-auto">
            {matches.map((match) => (
              <li
                key={match.id}
                className="bg-gray-800 p-4 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between"
              >
                <div className="text-lg font-semibold">
                  {match.teams.home.name} vs {match.teams.away.name}
                </div>
                <div className="text-sm text-gray-400 mt-2 md:mt-0">
                  {new Date(match.date).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
