import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import { mockMovies, mockAnime, mockBooks, mockReels } from '../data/mock';
import ContentCard from '../components/ContentCard';
import ContentPlayer from '../components/ContentPlayer';
import { useContentPlayer } from '../hooks/useContentPlayer';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Home = () => {
  const [currentFeatured, setCurrentFeatured] = useState(0);
  const { isPlayerOpen, currentContent, currentContentType, openPlayer, closePlayer } = useContentPlayer();
  
  // Get featured content
  const featuredContent = [
    ...mockMovies.filter(item => item.featured),
    ...mockAnime.filter(item => item.featured),
    ...mockBooks.filter(item => item.featured),
    ...mockReels.filter(item => item.featured)
  ];

  const nextFeatured = () => {
    setCurrentFeatured((prev) => (prev + 1) % featuredContent.length);
  };

  const prevFeatured = () => {
    setCurrentFeatured((prev) => (prev - 1 + featuredContent.length) % featuredContent.length);
  };

  const currentItem = featuredContent[currentFeatured];

  const handlePlayFeatured = () => {
    if (!currentItem) return;
    
    // Determine content type based on properties
    let contentType = 'movie';
    if (currentItem.episodes) contentType = 'anime';
    else if (currentItem.author) contentType = 'book';
    else if (currentItem.creator) contentType = 'reel';
    
    openPlayer(currentItem, contentType);
  };

  const handlePlayContent = (content, type) => {
    openPlayer(content, type);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        {currentItem && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${currentItem.backdrop || currentItem.thumbnail})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            
            <div className="relative h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl">
                  <div className="flex items-center space-x-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-red-500" />
                    <span className="text-red-500 font-semibold text-sm uppercase tracking-wide">
                      Featured Today
                    </span>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
                    {currentItem.title}
                  </h1>
                  
                  <p className="text-gray-200 text-lg mb-6 leading-relaxed drop-shadow">
                    {currentItem.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 mb-8">
                    <Button 
                      onClick={handlePlayFeatured}
                      size="lg"
                      className="bg-red-600 hover:bg-red-700 text-white px-8"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      {currentItem.author ? 'Read Now' : currentItem.creator ? 'Watch Reel' : 'Play Now'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-white/30 text-white hover:bg-white/10 px-8"
                    >
                      More Info
                    </Button>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              {featuredContent.length > 1 && (
                <>
                  <button
                    onClick={prevFeatured}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextFeatured}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {featuredContent.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFeatured(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentFeatured ? 'bg-red-500' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Trending Movies */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Trending Movies</h2>
            <Link to="/movies" className="text-red-500 hover:text-red-400 font-medium">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {mockMovies.slice(0, 6).map((movie) => (
              <ContentCard
                key={movie.id}
                content={movie}
                type="movie"
                onPlay={(content) => handlePlayContent(content, 'movie')}
              />
            ))}
          </div>
        </section>

        {/* Popular Anime */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Popular Anime</h2>
            <Link to="/anime" className="text-red-500 hover:text-red-400 font-medium">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {mockAnime.slice(0, 6).map((anime) => (
              <ContentCard
                key={anime.id}
                content={anime}
                type="anime"
                onPlay={(content) => handlePlayContent(content, 'anime')}
              />
            ))}
          </div>
        </section>

        {/* Featured Books */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Books</h2>
            <Link to="/books" className="text-red-500 hover:text-red-400 font-medium">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {mockBooks.slice(0, 6).map((book) => (
              <ContentCard
                key={book.id}
                content={book}
                type="book"
                onPlay={(content) => handlePlayContent(content, 'book')}
              />
            ))}
          </div>
        </section>

        {/* Trending Reels */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Trending Reels</h2>
            <Link to="/reels" className="text-red-500 hover:text-red-400 font-medium">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mockReels.slice(0, 4).map((reel) => (
              <Card key={reel.id} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors cursor-pointer group" onClick={() => handlePlayContent(reel, 'reel')}>
                <div className="relative aspect-[9/16] overflow-hidden rounded-t-lg">
                  <img
                    src={reel.thumbnail}
                    alt={reel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-sm font-medium line-clamp-2 drop-shadow">
                      {reel.title}
                    </p>
                    <p className="text-gray-300 text-xs drop-shadow">
                      by {reel.creator}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Content Player Modal */}
      <ContentPlayer
        content={currentContent}
        contentType={currentContentType}
        isOpen={isPlayerOpen}
        onClose={closePlayer}
      />
    </div>
  );
};

export default Home;