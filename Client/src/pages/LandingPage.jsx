// pages/LandingPage.jsx
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import Logo from '../assets/Logo.png'
import { 
  MapPin, Sun, Moon, Cloud, Map, Users, UserPlus, Calendar, 
  Navigation, Compass, Shield, Leaf, Wifi, ArrowRight, ChevronDown
} from 'lucide-react';

const LandingPage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Force dark mode on landing page load but remember user preference
  useEffect(() => {
    const originalTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    document.documentElement.classList.add('dark');
    
    return () => {
      if (originalTheme === 'light') {
        document.documentElement.classList.remove('dark');
      }
    };
  }, []);

  const features = [
    {
      title: "Weather Integration",
      description: "Real-time weather updates with wind direction, precipitation levels, and temperature forecasts for your routes.",
      icon: <Cloud className="h-8 w-8 text-green-400" />
    },
    {
      title: "Road Compatibility",
      description: "Discover bike-friendly roads, gravel paths, and off-road trails with user ratings for conditions and safety.",
      icon: <Map className="h-8 w-8 text-green-400" />
    },
    {
      title: "Community Data",
      description: "Report road obstructions, potholes, or unsafe areas and suggest route improvements to fellow cyclists.",
      icon: <Users className="h-8 w-8 text-green-400" />
    },
    {
      title: "Personalized Routes",
      description: "Get route recommendations based on your preferences with detailed elevation profiles and difficulty ratings.",
      icon: <Compass className="h-8 w-8 text-green-400" />
    },
    {
      title: "Social Features",
      description: "Share routes, photos, ride statistics and find nearby cyclists for group adventures.",
      icon: <UserPlus className="h-8 w-8 text-green-400" />
    },
    {
      title: "Eco-Friendly Focus",
      description: "Find sustainable travel routes that avoid high-traffic areas and reduce environmental impact while cycling.",
      icon: <Leaf className="h-8 w-8 text-green-400" />
    },
    {
      title: "Offline Navigation",
      description: "Access offline maps and turn-by-turn navigation for remote areas or long-distance rides.",
      icon: <Navigation className="h-8 w-8 text-green-400" />
    },
    {
      title: "Events & Groups",
      description: "Organize group rides or participate in local cycling events with our community calendar feature.",
      icon: <Calendar className="h-8 w-8 text-green-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Green gradient background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>

      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-black/70 border-b border-green-900/50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
          
             <img src={Logo} alt="Veloxa Logo" className="ml-2 h-8 w-auto" />
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-300"
            >
              {theme === 'dark' ? <Sun className="h-6 w-6 text-yellow-400" /> : <Moon className="h-6 w-6 text-gray-200" />}
            </button>
            <Link 
              to="/login" 
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="px-4 py-2 text-sm font-medium text-green-400 bg-transparent border border-green-600 rounded-lg hover:bg-green-900/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-28 overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: "1s"}}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
            Cycle Confidently with Veloxa
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-300">
            The ultimate companion for cycling enthusiasts. Smart routes, real-time weather, and a vibrant community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link 
              to="/register" 
              className="group px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-green-600 to-green-500 rounded-lg hover:shadow-xl hover:shadow-green-600/20 transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="flex items-center justify-center">
                Get Started 
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
            <a 
              href="#features" 
              className="group px-8 py-4 text-lg font-medium text-green-400 bg-green-900/30 backdrop-blur-sm border border-green-500/30 rounded-lg hover:bg-green-900/50 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="flex items-center justify-center">
                Explore Features
                <ChevronDown className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
            What Veloxa Offers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group p-6 bg-gray-900/80 backdrop-blur-sm border border-green-900/50 rounded-xl hover:border-green-500/50 shadow-lg transition-all duration-500 hover:shadow-green-500/20 hover:shadow-xl transform hover:-translate-y-1"
              >
                <div className="flex justify-center mb-6 bg-gray-800/50 p-4 rounded-full w-16 h-16 mx-auto group-hover:bg-green-900/50 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white text-center group-hover:text-green-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-center group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Showcase Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                Experience Veloxa in Action
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Discover how our platform transforms the way you plan, ride, and connect with fellow cyclists.
              </p>
            </div>
            
            <div className="bg-gray-900/80 backdrop-blur-sm border border-green-900/50 rounded-2xl shadow-2xl overflow-hidden hover:shadow-green-500/20 transition-all duration-500">
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="animate-pulse mb-4">
                    <MapPin className="h-16 w-16 text-green-500 mx-auto" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">App Demo</h3>
                  <p className="text-gray-400">Interactive app preview would appear here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 via-transparent to-green-900/10 pointer-events-none"></div>
        
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
            What Cyclists Are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Thompson",
                role: "Mountain Biker",
                quote: "Veloxa's offline navigation has been a game-changer for my trail rides. I never worry about losing my way!"
              },
              {
                name: "Sarah Chen",
                role: "Road Cyclist",
                quote: "The weather integration helps me plan perfect rides. The route recommendations are spot on for my preferences."
              },
              {
                name: "Marcus Johnson",
                role: "Daily Commuter",
                quote: "I love how the community reports hazards. It's made my daily commute safer and more enjoyable."
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="group p-8 bg-gray-900/80 backdrop-blur-sm border border-green-900/50 rounded-xl hover:border-green-500/50 transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-green-500/20 transform hover:-translate-y-1"
              >
                <p className="text-gray-300 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center group-hover:from-green-400 group-hover:to-green-500 transition-colors duration-300">
                    <span className="text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-white group-hover:text-green-400 transition-colors duration-300">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-900 to-green-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Enhance Your Cycling Experience?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-green-100/80">
            Join thousands of cyclists who are discovering better routes, connecting with the community, and riding smarter.
          </p>
          <Link 
            to="/register" 
            className="group inline-flex items-center px-8 py-4 text-lg font-medium text-green-900 bg-gradient-to-r from-green-400 to-green-300 rounded-lg hover:from-green-300 hover:to-green-200 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-green-400/30"
          >
            Create Your Account
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-green-900/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <MapPin className="h-6 w-6 text-green-500" />
                <span className="ml-2 text-xl font-bold">Veloxa</span>
              </div>
              <p className="text-gray-500">
                Your ultimate cycling companion for safer, smarter rides.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">Features</h3>
              <ul className="space-y-2 text-gray-500">
                <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">Weather Integration</li>
                <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">Route Recommendations</li>
                <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">Social Cycling</li>
                <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">Events & Groups</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">Company</h3>
              <ul className="space-y-2 text-gray-500">
                <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">About Us</li>
                <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">Blog</li>
                <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">Careers</li>
                <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">Legal</h3>
              <ul className="space-y-2 text-gray-500">
                <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">Terms of Service</li>
                <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">Privacy Policy</li>
                <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">Cookie Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-green-900/30 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Veloxa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;