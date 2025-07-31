import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Heart, Clock, Share, BookOpen, Eye, ThumbsUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Dialog, DialogContent } from './ui/dialog';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';

const ContentPlayer = ({ content, contentType, isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { user, addToFavorites, removeFromFavorites, addToWatchLater } = useAuth();

  const isFavorite = user?.favorites?.includes(content?.id);

  useEffect(() => {
    if (isOpen && contentType === 'reel') {
      // Auto-play reels
      setIsPlaying(true);
    }
  }, [isOpen, contentType]);

  if (!content) return null;

  const handleFavoriteClick = () => {
    if (!user) return;
    
    if (isFavorite) {
      removeFromFavorites(content.id);
    } else {
      addToFavorites(content.id);
    }
  };

  const handleWatchLaterClick = () => {
    if (!user) return;
    addToWatchLater(content.id);
  };

  const renderMoviePlayer = () => (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
      {/* Video Player */}
      <div className="relative w-full aspect-video">
        <iframe
          src={content.trailer}
          title={content.title}
          className="w-full h-full"
          frameBorder="0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
      
      {/* Movie Info */}
      <div className="p-6 text-white">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">{content.title}</h2>
            <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
              <span>{content.year}</span>
              <span>•</span>
              <span>{content.duration}</span>
              <span>•</span>
              <Badge className="bg-yellow-600 text-white">
                ⭐ {content.rating}
              </Badge>
            </div>
            <p className="text-gray-300 text-sm mb-4">{content.description}</p>
            <Badge variant="secondary" className="bg-gray-800 text-gray-300">
              {content.genre}
            </Badge>
          </div>
          
          {/* Action Buttons */}
          {user && (
            <div className="flex space-x-2">
              <Button
                onClick={handleFavoriteClick}
                variant="outline"
                size="sm"
                className={`${
                  isFavorite ? 'bg-red-600 text-white' : 'border-gray-600 text-white'
                }`}
              >
                <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                {isFavorite ? 'Favorited' : 'Add to Favorites'}
              </Button>
              <Button
                onClick={handleWatchLaterClick}
                variant="outline"
                size="sm"
                className="border-gray-600 text-white"
              >
                <Clock className="w-4 h-4 mr-2" />
                Watch Later
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderAnimePlayer = () => (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
      {/* Video Player */}
      <div className="relative w-full aspect-video">
        <iframe
          src={content.trailer}
          title={content.title}
          className="w-full h-full"
          frameBorder="0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
      
      {/* Anime Info */}
      <div className="p-6 text-white">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">{content.title}</h2>
            <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
              <span>{content.year}</span>
              <span>•</span>
              <span>{content.episodes} episodes</span>
              <span>•</span>
              <Badge className={`${
                content.status === 'Ongoing' ? 'bg-green-600' : 'bg-blue-600'
              } text-white`}>
                {content.status}
              </Badge>
              <Badge className="bg-yellow-600 text-white">
                ⭐ {content.rating}
              </Badge>
            </div>
            <p className="text-gray-300 text-sm mb-4">{content.description}</p>
            <Badge variant="secondary" className="bg-gray-800 text-gray-300">
              {content.genre}
            </Badge>
          </div>
          
          {/* Action Buttons */}
          {user && (
            <div className="flex space-x-2">
              <Button
                onClick={handleFavoriteClick}
                variant="outline"
                size="sm"
                className={`${
                  isFavorite ? 'bg-red-600 text-white' : 'border-gray-600 text-white'
                }`}
              >
                <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                {isFavorite ? 'Favorited' : 'Add to Favorites'}
              </Button>
              <Button
                onClick={handleWatchLaterClick}
                variant="outline"
                size="sm"
                className="border-gray-600 text-white"
              >
                <Clock className="w-4 h-4 mr-2" />
                Watch Later
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderBookReader = () => (
    <div className="w-full h-full bg-gray-900 rounded-lg overflow-hidden">
      {/* Book Reader Header */}
      <div className="bg-gray-800 p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">{content.title}</h2>
            <p className="text-gray-400">by {content.author}</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm">
              Page {currentPage} of {Math.ceil(content.pages / 10)}
            </span>
            {user && (
              <Button
                onClick={handleFavoriteClick}
                variant="outline"
                size="sm"
                className={`${
                  isFavorite ? 'bg-red-600 text-white' : 'border-gray-600 text-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Book Content */}
      <div className="flex h-full">
        {/* Book Pages */}
        <div className="flex-1 p-8 bg-gray-100 text-gray-900 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">Chapter {currentPage}</h3>
            <div className="prose prose-lg">
              <p className="mb-4">
                {content.description}
              </p>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="mb-4">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p className="mb-4">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
              <p className="mb-4">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
              </p>
            </div>
          </div>
        </div>

        {/* Reading Controls */}
        <div className="w-64 bg-gray-800 p-4 text-white">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Book Details</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Year: {content.year}</div>
                <div>Pages: {content.pages}</div>
                <div>Genre: {content.genre}</div>
                <div className="flex items-center">
                  Rating: <Badge className="ml-2 bg-yellow-600 text-white">
                    ⭐ {content.rating}
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Navigation</h4>
              <div className="flex space-x-2">
                <Button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  size="sm"
                  variant="outline"
                  className="flex-1 border-gray-600 text-white"
                >
                  Previous
                </Button>
                <Button
                  onClick={() => setCurrentPage(Math.min(Math.ceil(content.pages / 10), currentPage + 1))}
                  disabled={currentPage === Math.ceil(content.pages / 10)}
                  size="sm"
                  variant="outline"
                  className="flex-1 border-gray-600 text-white"
                >
                  Next
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Reading Progress</h4>
              <Progress value={(currentPage / Math.ceil(content.pages / 10)) * 100} className="mb-2" />
              <p className="text-xs text-gray-400">
                {Math.round((currentPage / Math.ceil(content.pages / 10)) * 100)}% complete
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReelPlayer = () => (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
      {/* Reel Video Player */}
      <div className="relative w-full h-full flex items-center justify-center">
        <iframe
          src={content.video}
          title={content.title}
          className="w-full max-w-md aspect-[9/16]"
          frameBorder="0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
        
        {/* Reel Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
          <div className="max-w-md mx-auto">
            <h3 className="text-white font-semibold text-lg mb-2">{content.title}</h3>
            <p className="text-gray-300 text-sm mb-4">by {content.creator}</p>
            
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">{content.views}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">{content.likes}</span>
                </div>
              </div>
              
              {user && (
                <div className="flex space-x-2">
                  <Button
                    onClick={handleFavoriteClick}
                    size="sm"
                    variant="ghost"
                    className={`${
                      isFavorite ? 'bg-red-600 text-white' : 'text-white hover:bg-white/20'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (contentType) {
      case 'movie':
        return renderMoviePlayer();
      case 'anime':
        return renderAnimePlayer();
      case 'book':
        return renderBookReader();
      case 'reel':
        return renderReelPlayer();
      default:
        return <div className="text-white p-8">Unknown content type</div>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] bg-gray-900 border-gray-800 p-0">
        <div className="relative w-full h-full">
          {/* Close Button */}
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 z-50 bg-black/50 text-white hover:bg-black/70"
          >
            <X className="w-4 h-4" />
          </Button>
          
          {/* Content */}
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContentPlayer;