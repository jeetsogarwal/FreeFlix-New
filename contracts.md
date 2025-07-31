# FreeFlix - API Contracts & Integration Plan

## Project Overview
FreeFlix is a modern streaming platform that provides access to movies, anime, books, and reels with user authentication and personalized features.

## Current Implementation Status
✅ **Frontend Complete** - All pages and components implemented with mock data
✅ **Authentication System** - Complete with React Context and localStorage
✅ **Responsive Design** - Mobile-first approach with dark theme
✅ **Content Management** - Cards, filters, search, and sorting functionality

## Mock Data Currently Used (in `/frontend/src/data/mock.js`)
- **Movies**: 4 sample movies with trailers, ratings, genres
- **Anime**: 3 sample anime with episodes, status, ratings  
- **Books**: 3 sample books with authors, pages, ratings
- **Reels**: 3 sample reels with creators, views, likes
- **User Data**: Mock user with favorites, watch later, history
- **Genres**: Categorized genres for all content types

## API Contracts Needed

### Authentication Endpoints
```
POST /api/auth/register
Body: { name, email, password }
Response: { success, user, token }

POST /api/auth/login  
Body: { email, password }
Response: { success, user, token }

GET /api/auth/me
Headers: { Authorization: "Bearer token" }
Response: { user }

POST /api/auth/logout
Response: { success }
```

### Content Endpoints
```
GET /api/movies?search&genre&sort&page
Response: { movies[], total, page, limit }

GET /api/movies/:id
Response: { movie }

GET /api/anime?search&genre&status&sort&page
Response: { anime[], total, page, limit }

GET /api/anime/:id  
Response: { anime }

GET /api/books?search&genre&author&sort&page
Response: { books[], total, page, limit }

GET /api/books/:id
Response: { book }

GET /api/reels?search&category&sort&page
Response: { reels[], total, page, limit }

GET /api/reels/:id
Response: { reel }
```

### User Preference Endpoints
```
POST /api/user/favorites
Body: { contentId, contentType }
Response: { success }

DELETE /api/user/favorites/:contentId
Response: { success }

GET /api/user/favorites
Response: { favorites[] }

POST /api/user/watch-later
Body: { contentId, contentType }
Response: { success }

GET /api/user/watch-later
Response: { watchLater[] }

POST /api/user/history
Body: { contentId, contentType, progress, duration }
Response: { success }

GET /api/user/history
Response: { history[] }
```

### Featured Content
```
GET /api/featured
Response: { featured[] }
```

## Database Schema (MongoDB)

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  avatar: String (URL),
  favorites: [{ contentId: ObjectId, contentType: String }],
  watchLater: [{ contentId: ObjectId, contentType: String }],
  watchHistory: [{
    contentId: ObjectId,
    contentType: String,
    progress: Number,
    duration: Number,
    watchedAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Movies Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  year: Number,
  genre: String,
  rating: Number,
  duration: String,
  thumbnail: String,
  backdrop: String,
  trailer: String,
  featured: Boolean,
  createdAt: Date
}
```

### Anime Collection  
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  year: Number,
  genre: String,
  rating: Number,
  episodes: Number,
  status: String, // "Ongoing" | "Completed"
  thumbnail: String,
  backdrop: String,
  trailer: String,
  featured: Boolean,
  createdAt: Date
}
```

### Books Collection
```javascript
{
  _id: ObjectId,
  title: String,
  author: String,
  description: String,
  year: Number,
  genre: String,
  rating: Number,
  pages: Number,
  thumbnail: String,
  preview: String,
  featured: Boolean,
  createdAt: Date
}
```

### Reels Collection
```javascript
{
  _id: ObjectId,
  title: String,
  creator: String,
  duration: String,
  views: String,
  likes: String,
  thumbnail: String,
  video: String,
  category: String,
  featured: Boolean,
  createdAt: Date
}
```

## Frontend Integration Plan

### Files to Update for Backend Integration

1. **Authentication Context** (`/frontend/src/contexts/AuthContext.jsx`)
   - Replace mock login/signup with actual API calls
   - Add JWT token management
   - Implement proper error handling

2. **Data Fetching Hooks** (New files to create)
   - `/frontend/src/hooks/useMovies.js`
   - `/frontend/src/hooks/useAnime.js` 
   - `/frontend/src/hooks/useBooks.js`
   - `/frontend/src/hooks/useReels.js`
   - `/frontend/src/hooks/useUser.js`

3. **API Service** (New file)
   - `/frontend/src/services/api.js` - Centralized API calls with axios

4. **Pages to Update**
   - `Home.jsx` - Replace mock data with API calls
   - `Movies.jsx` - Implement pagination and real filtering
   - `Anime.jsx` - Add real-time status updates
   - `Books.jsx` - Connect to book database
   - `Reels.jsx` - Implement real engagement features
   - `Profile.jsx` - Connect to user preferences API

## Current Frontend Features Working
- ✅ Responsive navigation with search
- ✅ User authentication flow (mock)
- ✅ Content browsing and filtering
- ✅ Favorites and watch later (localStorage)
- ✅ Profile management
- ✅ Featured content carousel
- ✅ Modern UI with hover effects
- ✅ Mobile-optimized design

## Next Steps for Backend Development
1. Set up MongoDB models for all collections
2. Implement JWT-based authentication
3. Create CRUD endpoints for all content types
4. Add user preference management
5. Implement search and filtering logic
6. Set up file upload for content management
7. Add pagination and performance optimization
8. Replace frontend mock data with real API calls

## Environment Variables Needed
```
# Backend (.env)
JWT_SECRET=your_jwt_secret_here
BCRYPT_SALT_ROUNDS=12
```

All frontend environment variables are already configured and should not be modified.