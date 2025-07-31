import React from 'react';
import { Edit, Heart, Clock, History, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockMovies, mockAnime, mockBooks } from '../data/mock';
import ContentCard from '../components/ContentCard';
import ContentPlayer from '../components/ContentPlayer';
import { useContentPlayer } from '../hooks/useContentPlayer';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const Profile = () => {
  const { user } = useAuth();
  const { isPlayerOpen, currentContent, currentContentType, openPlayer, closePlayer } = useContentPlayer();

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to view your profile</h2>
          <Button variant="outline" onClick={() => window.location.href = '/login'}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  // Get user's favorite content
  const favoriteMovies = mockMovies.filter(movie => user.favorites.includes(movie.id));
  const favoriteAnime = mockAnime.filter(anime => user.favorites.includes(anime.id));
  const favoriteBooks = mockBooks.filter(book => user.favorites.includes(book.id));
  
  // Get watch later content
  const watchLaterContent = [...mockMovies, ...mockAnime].filter(item => 
    user.watchLater.includes(item.id)
  );

  const handlePlayContent = (content, type) => {
    openPlayer(content, type);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-red-600 text-white text-2xl">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
              <p className="text-gray-400 mb-4">{user.email}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <div>
                  <span className="font-semibold text-white">{user.favorites.length}</span> Favorites
                </div>
                <div>
                  <span className="font-semibold text-white">{user.watchLater.length}</span> Watch Later
                </div>
                <div>
                  <span className="font-semibold text-white">{user.watchHistory.length}</span> Watched
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="favorites" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800 mb-8">
            <TabsTrigger value="favorites" className="data-[state=active]:bg-red-600">
              <Heart className="w-4 h-4 mr-2" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="watchlater" className="data-[state=active]:bg-red-600">
              <Clock className="w-4 h-4 mr-2" />
              Watch Later
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-red-600">
              <History className="w-4 h-4 mr-2" />
              History
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-red-600">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-8">
            {(favoriteMovies.length > 0 || favoriteAnime.length > 0 || favoriteBooks.length > 0) ? (
              <>
                {favoriteMovies.length > 0 && (
                  <section>
                    <h3 className="text-xl font-semibold mb-4">Favorite Movies</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {favoriteMovies.map((movie) => (
                        <ContentCard
                          key={movie.id}
                          content={movie}
                          type="movie"
                          onPlay={(content) => handlePlayContent(content, 'movie')}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {favoriteAnime.length > 0 && (
                  <section>
                    <h3 className="text-xl font-semibold mb-4">Favorite Anime</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {favoriteAnime.map((anime) => (
                        <ContentCard
                          key={anime.id}
                          content={anime}
                          type="anime"
                          onPlay={(content) => handlePlayContent(content, 'anime')}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {favoriteBooks.length > 0 && (
                  <section>
                    <h3 className="text-xl font-semibold mb-4">Favorite Books</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {favoriteBooks.map((book) => (
                        <ContentCard
                          key={book.id}
                          content={book}
                          type="book"
                          onPlay={(content) => handlePlayContent(content, 'book')}
                        />
                      ))}
                    </div>
                  </section>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
                <p className="text-gray-400">Start adding content to your favorites!</p>
              </div>
            )}
          </TabsContent>

          {/* Watch Later Tab */}
          <TabsContent value="watchlater">
            {watchLaterContent.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {watchLaterContent.map((content) => (
                  <ContentCard
                    key={content.id}
                    content={content}
                    type={content.episodes ? 'anime' : 'movie'}
                    onPlay={(content) => handlePlayContent(content, content.episodes ? 'anime' : 'movie')}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Clock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nothing to watch later</h3>
                <p className="text-gray-400">Add movies and anime to watch later!</p>
              </div>
            )}
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            {user.watchHistory.length > 0 ? (
              <div className="space-y-4">
                {user.watchHistory.map((historyItem, index) => {
                  const content = [...mockMovies, ...mockAnime].find(item => item.id === historyItem.contentId);
                  if (!content) return null;
                  
                  return (
                    <Card key={index} className="bg-gray-900 border-gray-800">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={content.thumbnail}
                            alt={content.title}
                            className="w-16 h-24 object-cover rounded cursor-pointer"
                            onClick={() => handlePlayContent(content, historyItem.contentType)}
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-white">{content.title}</h4>
                            <p className="text-gray-400 text-sm">
                              Watched on {new Date(historyItem.watchedAt).toLocaleDateString()}
                            </p>
                            <div className="mt-2">
                              <div className="flex items-center space-x-2">
                                <div className="flex-1 bg-gray-700 rounded-full h-2">
                                  <div 
                                    className="bg-red-600 h-2 rounded-full"
                                    style={{ width: `${historyItem.progress}%` }}
                                  />
                                </div>
                                <span className="text-xs text-gray-400">{historyItem.progress}%</span>
                              </div>
                            </div>
                          </div>
                          <Button
                            onClick={() => handlePlayContent(content, historyItem.contentType)}
                            size="sm"
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Continue
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <History className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No watch history</h3>
                <p className="text-gray-400">Your watch history will appear here!</p>
              </div>
            )}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={user.name}
                      className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
                      readOnly
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Auto-play next episode</span>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">High quality streaming</span>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Email notifications</span>
                    <input type="checkbox" className="toggle" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
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

export default Profile;