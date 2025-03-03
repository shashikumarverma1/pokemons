"use client";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [data, setData] = useState<any>({});
const [Loading , setLoading] = useState<boolean>(true);
  useEffect(() => {
      async function fetchData() {
          const response = await fetch('/api/trade', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          if (response.status ==200) {
              const result = await response.json();
              setData(result);
              setLoading(false);
          } else {
              console.error('Failed to fetch data:', response.statusText);
              setLoading(false);
          }
      }

      fetchData();
  }, []);

{
  Loading && <p>Loading...</p>
}

  return (
      <div>
          <h1>Price Data</h1>
          <p>Price: {data.message}</p>
          <p>Stop-Loss: {data.sl}</p>
      </div>
  );
}
