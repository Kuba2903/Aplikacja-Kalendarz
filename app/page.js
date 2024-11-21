'use client';

import Image from "next/image";
import LineChar from "./_components/LineChar";
import { AuthProvider } from './lib/AuthContext';

export default function Home() {
  const size = 1024;
  return (
    <div className="mx-auto">
      <svg viewBox="0 0 1024 1024" width="500" height="220">
        <line x1="0" y1="0" x2={size} y2={size} strokeWidth="10" stroke="red"></line>
        <circle cx={size/2} cy={size/2} r={size/2} fill="none" strokeWidth="10" stroke="blue"></circle>
        <rect x="100" y="100" width="512" height="512" strokeLinejoin="round" strokeWidth="100" stroke="white" fill="none" />
        <polygon points="100,10 150,190 50,190" ></polygon>
        <text x="100" y="200" fontSize="212" fill="white" >Hello world</text>
        <polyline points="100 100 340 100 567 123" fill="none" strokeWidth="10" stroke="blue"></polyline>
        <LineChar data={[5,2,1,5,43]}/>
      </svg>
    </div>
  );
}
