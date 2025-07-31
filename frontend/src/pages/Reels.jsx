import React, { useState } from 'react';
import { Search, Play, Heart, Share, MessageCircle, Eye } from 'lucide-react';
import { mockReels, mockGenres } from '../data/mock';
import ContentPlayer from '../components/ContentPlayer';
import { useContentPlayer } from '../hooks/useContentPlayer';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const Reels = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const { isPlayerOpen, currentContent, currentContentType, openPlayer, closePlayer } = useContentPlayer();

  const handlePlayReel = (reel) => {
    openPlayer(reel, 'reel');
  };

  // Filter and sort reels
  const filteredReels = mockReels
    .filter(reel => {
      const matchesSearch = reel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           reel.creator.toLowerCase().includes(searchQuery.toLowerCase());
      // For demo, we'll use entertainment as default category
      const matchesGenre = selectedGenre === 'all' || true;
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'views':
          return parseInt(b.views.replace(/[^\d]/g, '')) - parseInt(a.views.replace(/[^\d]/g, ''));
        case 'likes':
          return parseInt(b.likes.replace(/[^\d]/g, '')) - parseInt(a.likes.replace(/[^\d]/g, ''));
        case 'duration':
          return b.duration.localeCompare(a.duration);
        case 'trending':
        default:
          return parseInt(b.views.replace(/[^\d]/g, '')) - parseInt(a.views.replace(/[^\d]/g, ''));
      }
    });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-900/50 to-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Reels</h1>
          <p className="text-gray-400 text-lg">
            Short-form entertainment that keeps you engaged and entertained
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search reels or creators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-red-500"
            />
          </div>

          {/* Category Filter */}
          <Select value={selectedGenre} onValueChange={setSelectedGenre}>
            <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all" className="text-white hover:bg-gray-700">All Categories</SelectItem>
              {mockGenres.reels.map((genre) => (
                <SelectItem key={genre} value={genre} className="text-white hover:bg-gray-700">
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort By */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="trending" className="text-white hover:bg-gray-700">Trending</SelectItem>
              <SelectItem value="views" className="text-white hover:bg-gray-700">Most Viewed</SelectItem>
              <SelectItem value="likes" className="text-white hover:bg-gray-700">Most Liked</SelectItem>
              <SelectItem value="duration" className="text-white hover:bg-gray-700">Duration</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredReels.length} of {mockReels.length} reels
          </p>
        </div>

        {/* Reels Grid */}
        {filteredReels.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredReels.map((reel) => (
              <Card key={reel.id} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden group cursor-pointer" onClick={() => handlePlayReel(reel)}>
                <div className="relative aspect-[9/16] overflow-hidden">
                  <img
                    src={reel.thumbnail}
                    alt={reel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      size="lg"
                      className="bg-red-600 hover:bg-red-700 text-white rounded-full w-16 h-16"
                    >
                      <Play className="w-6 h-6" />
                    </Button>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-black/70 text-white border-none text-xs">
                      {reel.duration}
                    </Badge>
                  </div>

                  {/* Content Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
                    <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                      {reel.title}
                    </h3>
                    <p className="text-gray-300 text-xs mb-2">
                      by {reel.creator}
                    </p>
                    
                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-gray-300">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{reel.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-3 h-3" />
                          <span>{reel.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-400 hover:text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      Like
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-400 hover:text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Comment
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-400 hover:text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Share className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-lg mb-4">No reels found</div>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
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

export default Reels;