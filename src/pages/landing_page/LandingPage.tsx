import React, { useState } from "react";
import NavBar from "../../components/NavBar.tsx";
import HeroPage from "./Hero.tsx";

export default function LandingPage() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-[#F4F6FC] text-slate-900">
        <NavBar dark={dark} onToggleTheme={setDark} />
        <HeroPage />
      </div>
    </div>
  );
}