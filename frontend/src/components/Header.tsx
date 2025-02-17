import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => (
  <nav className="bg-black p-4">
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
        <img 
          src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=24&h=24" 
          alt="logo" 
          className="rounded-full" 
        />
        <span className="text-white font-semibold">ArtGalleryManager</span>
      </Link>
    </div>
  </nav>
);

export default Header;