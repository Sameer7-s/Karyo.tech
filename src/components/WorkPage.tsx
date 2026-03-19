import React from "react";
import { Navbar } from "./Navbar";
import { StudioFooter } from "./StudioFooter";
import { WorkProjectsShowcase } from "./WorkProjectsShowcase";

export function WorkPage() {
    return (
        <div className="bg-[#05070F] min-h-screen text-white select-none selection:bg-[#3B82F6] selection:text-white">
            <Navbar />
            
            {/* Main Content Area mapping back to the showcase */}
            <main className="pt-20">
                <WorkProjectsShowcase />
            </main>

            <StudioFooter />
        </div>
    );
}
