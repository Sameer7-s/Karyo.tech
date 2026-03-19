import React from "react";
import { Navbar } from "./Navbar";
import { StudioFooter } from "./StudioFooter";
import { ContactSection } from "./ContactSection";

export function ContactPage() {
    return (
        <div className="bg-[#05070F] min-h-screen text-white select-none selection:bg-[#3B82F6] selection:text-white flex flex-col">
            <Navbar />
            
            {/* Main Content Area mapping back to the showcase */}
            <main className="flex-1 pt-20">
                <ContactSection />
            </main>

            <StudioFooter />
        </div>
    );
}
