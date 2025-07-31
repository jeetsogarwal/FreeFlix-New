import React from 'react';
import { Play, Heart, Clock, Star, Calendar, BookOpen, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const ContentCard = ({ content, type, onPlay }) => {
  const { user, addToFavorites, removeFromFavorites, addToWatchLater } = useAuth();
  
  const isFavorite = user?.favorites?.includes(content.id);
  const isWatchLater = user?.watchLater?.includes(content.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (!user) return;
    
    if (isFavorite) {
      removeFromFavorites(content.id);
    } else {
      addToFavorites(content.id);
    }
  };

  const handleWatchLaterClick = (e) => {
    e.stopPropagation();
    if (!user) return;
    
    addToWatchLater(content.id);
  };

  const handlePlayClick = (e) => {
    e.stopPropagation();
    onPlay(content);
  };

  const renderTypeSpecificInfo = () => {
    switch (type) {
      case 'movie':
        return (
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <Calendar className="w-3 h-3" />
            <span>{content.year}</span>
            <span>•</span>
            <span>{content.duration}</span>
          </div>
        );
      case 'anime':
        return (
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <Calendar className="w-3 h-3" />
            <span>{content.year}</span>
            <span>•</span>
            <span>{content.episodes} episodes</span>
          </div>
        );
      case 'book':
        return (
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <BookOpen className="w-3 h-3" />
            <span>{content.author}</span>
            <span>•</span>
            <span>{content.pages} pages</span>
          </div>
        );
      case 'reel':
        return (
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <Eye className="w-3 h-3" />
            <span>{content.views}</span>
            <span>•</span>
            <span>{content.duration}</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="group bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300 cursor-pointer overflow-hidden">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={content.thumbnail}
          alt={content.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            onClick={handlePlayClick}
            size="sm"
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <Play className="w-4 h-4 mr-1" />
            {type === 'book' ? 'Read' : 'Play'}
          </Button>
        </div>

        {/* Rating Badge */}
        {content.rating && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-black/70 text-yellow-400 border-none">
              <Star className="w-3 h-3 mr-1 fill-current" />
              {content.rating}
            </Badge>
          </div>
        )}

        {/* Action Buttons */}
        {user && (
          <div className="absolute top-2 right-2 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              onClick={handleFavoriteClick}
              size="sm"
              variant="ghost"
              className={`w-8 h-8 p-0 ${
                isFavorite 
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'bg-black/70 text-white hover:bg-black/90'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
            
            {type !== 'book' && (
              <Button
                onClick={handleWatchLaterClick}
                size="sm"
                variant="ghost"
                className={`w-8 h-8 p-0 ${
                  isWatchLater 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-black/70 text-white hover:bg-black/90'
                }`}
              >
                <Clock className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">
          {content.title}
        </h3>
        
        {renderTypeSpecificInfo()}
        
        <div className="mt-2">
          <Badge variant="secondary" className="text-xs bg-gray-800 text-gray-300 border-none">
            {content.genre}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentCard;