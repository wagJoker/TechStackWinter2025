import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => (
  <footer className="bg-black text-white p-4">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex flex-col space-y-2">
        <h2 className="text-xl font-bold">ArtGalleryManager</h2>
        <p className="text-sm text-gray-300">Your go-to platform for managing and exploring exquisite art pieces.</p>
      </div>
      <div className="flex space-x-4">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <Facebook className="w-6 h-6 cursor-pointer hover:text-gray-300 transition-colors" />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <Twitter className="w-6 h-6 cursor-pointer hover:text-gray-300 transition-colors" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <Instagram className="w-6 h-6 cursor-pointer hover:text-gray-300 transition-colors" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;