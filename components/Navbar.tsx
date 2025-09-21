import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link'
import React from 'react'
import MobileNavbar from './MobileNavbar';
import DesktopNavbar from './DesktopNavbar';
import { syncUser } from '@/actions/user';

const Navbar = async () => {
    const user = await currentUser();
    if (user) await syncUser();

    return (
        <nav className='className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50"'>
            <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
                <Link href={"/"} className="text-xl font-bold text-primary font-mono tracking-wider">FlickSpot</Link>
            </div>
            <DesktopNavbar />
            <MobileNavbar />
            </div>
        </div>
        </nav>
    )
}

export default Navbar