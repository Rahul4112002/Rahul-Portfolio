# Admin Panel - Setup Instructions

## Overview
Complete admin panel for managing portfolio projects via GitHub repositories integration.

## Features
✅ Secure login with session-based authentication
✅ Fetch all GitHub repositories
✅ Add projects to portfolio from GitHub repos
✅ Image upload with validation (JPG, PNG, WebP, max 5MB)
✅ Category selection matching portfolio
✅ Real-time project addition
✅ Rate limiting on login attempts
✅ CSRF protection via HTTP-only cookies
✅ Admin action logging

## Access Routes
- **Local Dev**: http://localhost:3000/admin
- **Production**: https://rahul4112.me/admin

## Default Credentials
- **Username**: `admin`
- **Password**: `admin123`

⚠️ **IMPORTANT**: Change these in production!

## Environment Variables

Add these to your `.env.local` file:

```env
# Admin Panel Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9

# Optional: GitHub Personal Access Token (for higher API rate limits)
GITHUB_TOKEN=your_github_personal_access_token_here
```

### Generate New Password Hash

To change the admin password, run this in Node.js:

```javascript
const crypto = require('crypto');
const password = 'your_new_password';
const hash = crypto.createHash('sha256').update(password).digest('hex');
console.log(hash);
```

Then update `ADMIN_PASSWORD_HASH` in `.env.local`.

## How to Use

### 1. Login
1. Navigate to `/admin`
2. Enter username and password
3. Click "Sign In"

### 2. View GitHub Repositories
- All your repos are displayed as cards
- Filter by language or search by name
- See repo stats (stars, language, last updated)

### 3. Add Project to Portfolio
1. Click "Add to Portfolio" on any repo card
2. Fill in the form:
   - **Title**: Auto-filled from repo name (editable)
   - **Description**: Auto-filled from repo description (editable, required)
   - **Category**: Select from dropdown (required)
   - **Live Link**: Optional deployment URL
   - **Source Link**: Auto-filled with GitHub URL (editable, required)
   - **Image**: Upload project screenshot (optional, max 5MB)
3. Click "Add Project"
4. Project is saved and appears in portfolio immediately

### 4. Logout
Click the "Logout" button in the header

## Security Features

### Authentication
- Password hashing with SHA-256
- HTTP-only cookies (prevents XSS)
- Secure flag in production
- SameSite: strict (prevents CSRF)
- Session expiry: 24 hours

### Rate Limiting
- Max 5 login attempts before temporary block
- 1-second delay on failed login (prevents brute force)

### Input Validation
- All inputs sanitized and validated
- URL validation for links
- Image type and size validation
- Required field enforcement

### Admin Action Logging
All admin actions are logged with:
- Username
- Action performed
- Timestamp

## API Endpoints

### Authentication
- `POST /api/admin/login` - Login with username/password
- `GET /api/admin/verify` - Check authentication status
- `POST /api/admin/logout` - Logout and clear session

### Data
- `GET /api/admin/github-repos` - Fetch GitHub repositories (auth required)
- `GET /api/admin/categories` - Get project categories (auth required)
- `POST /api/admin/projects` - Add new project (auth required, multipart/form-data)
- `GET /api/admin/projects` - Get all admin-added projects

## File Storage

### Uploaded Images
- Saved to: `public/uploads/projects/`
- Filename format: `{project-title}-{timestamp}.{ext}`
- Accessible at: `/uploads/projects/{filename}`

### Project Data
- Saved to: `data/admin-projects.json`
- Contains all projects added via admin panel

## Data Model

```typescript
Project {
  id: number,
  title: string,
  description: string,
  live_link: string | null,
  source_link: string,
  image_url: string | null,
  category: string,
  github_repo_id: number | null,
  created_at: string (ISO 8601)
}
```

## Production Deployment

### 1. Set Environment Variables in Vercel
```
ADMIN_USERNAME=your_username
ADMIN_PASSWORD_HASH=your_hashed_password
GITHUB_TOKEN=your_github_token (optional)
```

### 2. Database Integration (Recommended for Production)
Replace the JSON file storage in `/api/admin/projects/route.ts` with:
- PostgreSQL (Vercel Postgres)
- MongoDB
- Supabase
- PlanetScale

### 3. Image Storage (Recommended for Production)
Replace local file storage with:
- AWS S3
- Cloudinary
- Vercel Blob Storage
- Supabase Storage

### 4. Session Storage (Recommended for Production)
Replace in-memory sessions in `/api/admin/login/route.ts` with:
- Redis (Upstash)
- Database sessions
- JWT tokens

## Troubleshooting

### Login Issues
- Check credentials match environment variables
- Clear browser cookies
- Check console for error messages

### Image Upload Fails
- Ensure `public/uploads/projects/` directory exists
- Check file size (must be < 5MB)
- Verify file type (JPG, PNG, WebP only)

### GitHub API Rate Limit
- Add `GITHUB_TOKEN` to `.env.local`
- Generate token at: https://github.com/settings/tokens
- Permissions needed: `public_repo` (read access)

### Projects Not Appearing
- Check `data/admin-projects.json` exists
- Verify permissions on data directory
- Check browser console for errors

## Future Enhancements (Optional)

- [ ] Edit existing projects
- [ ] Delete projects
- [ ] Bulk operations
- [ ] Project analytics
- [ ] Multi-user support
- [ ] Audit log viewer
- [ ] Image optimization
- [ ] Drag & drop image upload
- [ ] Project preview before adding
- [ ] Export projects as JSON

## Support

For issues or questions, check the logs:
- Browser Console (F12)
- Server Logs (Vercel Logs or terminal)
- Admin action logs (server console)
