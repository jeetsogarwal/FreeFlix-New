import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { mockAnime, mockGenres } from '../data/mock';
import ContentCard from '../components/ContentCard';
import ContentPlayer from '../components/ContentPlayer';
import { useContentPlayer } from '../hooks/useContentPlayer';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';

const Anime = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const { isPlayerOpen, currentContent, currentContentType, openPlayer, closePlayer } = useContentPlayer();

  const handlePlayContent = (content) => {
    openPlayer(content, 'anime');
  };

  // Filter and sort anime
  const filteredAnime = mockAnime
    .filter(anime => {
      const matchesSearch = anime.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           anime.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === 'all' || anime.genre.toLowerCase().includes(selectedGenre.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || anime.status.toLowerCase() === selectedStatus.toLowerCase();
      return matchesSearch && matchesGenre && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'year':
          return b.year - a.year;
        case 'episodes':
          return b.episodes - a.episodes;
        case 'name':
        default:
          return a.title.localeCompare(b.title);
      }
    });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900/50 to-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Anime</h1>
          <p className="text-gray-400 text-lg">
            Explore the best anime series and movies from Japan and beyond
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
              placeholder="Search anime..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-red-500"
            />
          </div>

          {/* Genre Filter */}
          <Select value={selectedGenre} onValueChange={setSelectedGenre}>
            <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all" className="text-white hover:bg-gray-700">All Genres</SelectItem>
              {mockGenres.anime.map((genre) => (
                <SelectItem key={genre} value={genre} className="text-white hover:bg-gray-700">
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all" className="text-white hover:bg-gray-700">All Status</SelectItem>
              <SelectItem value="ongoing" className="text-white hover:bg-gray-700">Ongoing</SelectItem>
              <SelectItem value="completed" className="text-white hover:bg-gray-700">Completed</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort By */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="name" className="text-white hover:bg-gray-700">Name</SelectItem>
              <SelectItem value="rating" className="text-white hover:bg-gray-700">Rating</SelectItem>
              <SelectItem value="year" className="text-white hover:bg-gray-700">Year</SelectItem>
              <SelectItem value="episodes" className="text-white hover:bg-gray-700">Episodes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredAnime.length} of {mockAnime.length} anime
          </p>
        </div>

        {/* Anime Grid */}
        {filteredAnime.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredAnime.map((anime) => (
              <div key={anime.id} className="relative">
                <ContentCard
                  content={anime}
                  type="anime"
                  onPlay={handlePlayContent}
                />
                {/* Status Badge */}
                <div className="absolute -top-2 -right-2">
                  <Badge 
                    className={`text-xs ${
                      anime.status === 'Ongoing' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    {anime.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-lg mb-4">No anime found</div>
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

export default Anime;