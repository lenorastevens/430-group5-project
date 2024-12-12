"use client";

import { useEffect, useState } from "react";
import styles from './page.module.css';  

interface Artisan {
  artisan_id: number;
  artisan_firstname: string;
  artisan_lastname: string;
  artisan_bio: string;
}


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
    <div className='main-body'>
      <div className={styles.container}>
        <h1 className={styles.title}>Artisans</h1>

        {loading && <p className={styles.loading}>Loading artisans...</p>}

        {error && <p className={styles.error}>Error: {error}</p>}

        {!loading && !error && artisans.length === 0 && (
          <p className={styles.empty}>No artisans found.</p>
        )}

        {!loading && !error && artisans.length > 0 && (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Bio</th>
                </tr>
              </thead>
              <tbody>
                {artisans.map((artisan) => (
                  <tr key={artisan.artisan_id}>
                    <td>{artisan.artisan_firstname}</td>
                    <td>{artisan.artisan_lastname}</td>
                    <td>{artisan.artisan_bio}</td>
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

