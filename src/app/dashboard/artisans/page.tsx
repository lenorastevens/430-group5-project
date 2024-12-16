"use client";

import { useEffect, useState } from "react";
import { Artisan } from "@/app/lib/definitions";

const fetchArtisans = async (): Promise<Artisan[]> => {
  const response = await fetch("/api/artisans");
  if (!response.ok) {
    throw new Error("Failed to fetch artisans");
  }
  return response.json();
};

const ArtisansPage = () => {
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    document.title = "Artisans";
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchArtisans();
        setArtisans(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="main-body">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold text-center mb-4">Artisans</h1>

        {loading && <p className="text-center">Loading artisans...</p>}

        {error && <p className="text-center text-red-500">Error: {error}</p>}

        {!loading && !error && artisans.length === 0 && (
          <p className="text-center">No artisans found.</p>
        )}

        {!loading && !error && artisans.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-2 border-ridge border-[#EAA037] shadow-lg">
              <thead>
                <tr className="bg-gradient-to-r from-[#EAA037] to-[#F1D5BD]">
                  <th className="text-white uppercase p-3 border-2 border-ridge border-[#EAA037]">First Name</th>
                  <th className="text-white uppercase p-3 border-2 border-ridge border-[#EAA037]">Last Name</th>
                  <th className="text-white uppercase p-3 border-2 border-ridge border-[#EAA037]">Bio</th>
                </tr>
              </thead>
              <tbody>
                {artisans.map((artisan) => (
                  // *****INCLUDE THE ONCLICK IN THE NEXT LINE
                  <tr key={artisan.artisan_id} className="hover:bg-[#805AD5]/10">
                    <td className="p-3 border-2 border-ridge border-[#EAA037]">{artisan.artisan_firstname}</td>
                    <td className="p-3 border-2 border-ridge border-[#EAA037]">{artisan.artisan_lastname}</td>
                    <td className="p-3 border-2 border-ridge border-[#EAA037]">{artisan.artisan_bio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtisansPage;
