# Modern Portfolio Website

A beautiful, responsive portfolio website built with React.js, Tailwind CSS, and Three.js. Features smooth animations, modern design, and interactive elements.

## ✨ Features

- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Smooth Animations**: Powered by Framer Motion for engaging user experience
- **Three.js Background**: Interactive particle animation in the hero section
- **Modern UI**: Clean and professional design with Tailwind CSS
- **Component-Based**: Well-structured React components for maintainability
- **Supabase Backend**: Full backend integration with database
- **Dynamic Content**: Projects, skills, and experience loaded from database
- **Contact Form**: Functional contact form with Supabase storage
- **Admin Panel**: Easy content management interface
- **SEO Ready**: Optimized for search engines
- **Accessible**: Follows accessibility best practices

## 🚀 Tech Stack

- **React.js** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **Three.js** - 3D graphics library for animations
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Vite** - Build tool and development server

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation bar with smooth animations
│   ├── Hero.jsx            # Hero section with Three.js background
│   ├── Projects.jsx        # Projects showcase with cards
│   ├── Resume.jsx          # Skills, experience, and education
│   ├── Contact.jsx         # Contact form and information
│   ├── Footer.jsx          # Footer with social links
│   └── AnimatedBackground.jsx # Three.js particle animation
├── assets/                 # Static assets
├── App.jsx                 # Main application component
└── index.css              # Global styles
```

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase (Backend)**
   
   **Step 1: Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Sign up/Login and create a new project
   - Choose a project name and set a database password
   - Wait for the project to be created

   **Step 2: Get API Keys**
   - Go to your project dashboard
   - Navigate to Settings → API
   - Copy the **Project URL** and **Anon Public Key**

   **Step 3: Configure Environment Variables**
   - Open the `.env` file in your project root
   - Replace the placeholder values with your actual Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_public_key_here
   ```

   **Step 4: Set Up Database**
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Copy and paste the contents of `supabase-schema.sql`
   - Run the SQL script to create all tables and sample data

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🎨 Customization

### Personal Information
Update the following files with your information:

- **Hero Section** (`src/components/Hero.jsx`): Change name and description
- **Projects** (`src/components/Projects.jsx`): Add your own projects
- **Resume** (`src/components/Resume.jsx`): Update skills, experience, and education
- **Contact** (`src/components/Contact.jsx`): Update contact information and social links
- **Footer** (`src/components/Footer.jsx`): Update social media links

### Admin Panel (Optional)
The project includes an admin panel for easy content management:

1. **Add Admin Panel Route** (Optional):
   ```jsx
   // In App.jsx, add this route
   import AdminPanel from './components/AdminPanel';
   
   // Add this to your routes or create a separate admin page
   <Route path="/admin" element={<AdminPanel />} />
   ```

2. **Access Admin Panel**:
   - Navigate to `/admin` in your browser
   - Add new projects, skills, and experience
   - All changes are saved to Supabase automatically

3. **Features**:
   - Add new projects with images, links, and tech stack
   - Add new skills with categories
   - Add new work experience
   - Real-time form validation
   - Success/error feedback

### Styling
- Colors can be customized in the Tailwind classes throughout the components
- The Three.js particle animation can be modified in `AnimatedBackground.jsx`
- Global styles are in `src/index.css`

### Images
- Replace placeholder images in the projects section with your actual project screenshots
- Add your profile picture to the hero section if desired

## 📱 Responsive Design

The website is fully responsive and includes:
- Mobile-first design approach
- Responsive navigation with hamburger menu
- Adaptive grid layouts for projects
- Flexible typography scaling
- Touch-friendly interactive elements

## 🎯 Performance

- Optimized bundle size with Vite
- Lazy loading for Three.js components
- Efficient animations with Framer Motion
- Optimized images and assets
- Fast loading times

## 🚀 Deployment

The project is ready for deployment on various platforms:

### Vercel
```bash
npm run build
# Deploy the dist folder
```



### GitHub Pages
```bash
npm run build
# Deploy the dist folder to gh-pages branch
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help with customization, please open an issue on GitHub.

---

**Built with ❤️ using React, Tailwind CSS, and Three.js**
