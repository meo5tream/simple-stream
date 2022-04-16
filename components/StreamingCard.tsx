import Link from 'next/link';
import React from 'react';
import { Document } from 'swr-firestore-v9';
import { StreamingRoom } from '../types';

export default function StreamingCard({ title, id }: Document<StreamingRoom>) {
  return (
    <Link href={`/join/${id}`} passHref>
      <div className="flex flex-col items-center justify-center max-w-sm mx-auto border-2 rounded-lg shadow-lg cursor-pointer shadow-gray-300 hover:border-blue-300 transition-all hover:scale-110">
        <div
          className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
          style={{
            backgroundImage:
              'url(https://i.pcmag.com/imagery/roundups/06aZpvBQZ867G11u8zPWqox-5..v1595426570.jpg)',
          }}
        ></div>

        <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
          <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
            {title}
          </h3>

          <div className="px-3 py-2 italic text-center text-white bg-gray-200 dark:bg-gray-700">
            Creator@email.com
          </div>
        </div>
      </div>
    </Link>
  );
}
