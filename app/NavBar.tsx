import Link from 'next/link';
import React from 'react';
import { FaBug } from "react-icons/fa6";

const NavBar = () => {
    const links = [
        { label: 'Dashboard', href: '/'},
        { label: 'Issues', href: '/issues'}
    ]
    return (
        <nav className='flex space-x-10 border-b mb-5 px-5 h-16 items-center'>
            <Link href={'/'}><FaBug/></Link>
            <ul className='flex space-x-10'>
                {
                    links.map(link => <Link 
                        key={link.href} 
                        className='text-zinc-500 hover:text-zinc-800 transition-colors' 
                        href={link.href}>{link.label}</Link>)
                }
            
            </ul>
        </nav>
    );
};

export default NavBar;