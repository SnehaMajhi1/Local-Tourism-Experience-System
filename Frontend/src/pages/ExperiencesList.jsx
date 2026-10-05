import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Eye, Edit, Trash2, Clock, Users, DollarSign, MapPin, 
  Tag, Search, RefreshCw, AlertCircle, Compass 
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/landingComponents/Footer';
import DeleteModal from '../components/common/DeleteModal';
import { getExperiences, deleteExperience } from '../services/api';

const ExperiencesList = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');

  const fetchExperiencesData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getExperiences();
      setExperiences(data.experiences || []);
    } catch (err) {
      console.error('Failed to fetch experiences:', err);
      setError(err.message || 'Failed to load experiences. Please make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiencesData();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      await deleteExperience(deleteTarget._id);
      setExperiences((prev) => prev.filter((exp) => exp._id !== deleteTarget._id));
      setActionSuccess(`Successfully deleted "${deleteTarget.title}"`);
      setTimeout(() => setActionSuccess(''), 4000);
      setDeleteTarget(null);
    } catch (err) {
      alert(err.message || 'Failed to delete experience');
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter experiences based on search query and category
  const filteredExperiences = experiences.filter((exp) => {
    const matchesSearch = 
      exp.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.location?.municipality?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.location?.district?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'All' || exp.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(experiences.map((exp) => exp.category).filter(Boolean))];

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-['Inter',sans-serif]">
      {/* Navbar Container with Dark background */}
      <div className="bg-[#0C5C39] relative pb-20 pt-6">
        <Navbar />
        <div className="max-w-7xl mx-auto px-8 pt-24 pb-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-['Montserrat'] text-xs uppercase tracking-[0.25em] text-[#d8a84e]">
                Explore Local Nepal
              </span>
              <h1 className="font-['Cinzel',serif] text-3xl md:text-5xl font-bold text-white mt-1">
                Authentic Experiences
              </h1>
              <p className="text-white/80 mt-2 max-w-xl text-sm md:text-base">
                Browse, discover, and manage unique cultural and adventure activities hosted by local Nepalese hosts.
              </p>
            </div>
            <div>
              <Link
                to="/experiences/create"
                className="inline-flex items-center gap-2 rounded-xl bg-[#d8a84e] px-6 py-3.5 text-sm font-semibold text-[#0C5C39] shadow-lg hover:bg-yellow-400 transition transform hover:-translate-y-0.5"
              >
                <Plus size={18} strokeWidth={2.5} />
                Create New Experience
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-8 -mt-10 mb-16 w-full z-10">
        {/* Banner Alert Message */}
        {actionSuccess && (
          <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 text-sm flex items-center justify-between shadow-xs">
            <span>{actionSuccess}</span>
            <button onClick={() => setActionSuccess('')} className="text-emerald-600 hover:text-emerald-900">
              ✕
            </button>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by title, location, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-hidden focus:border-[#0C5C39] focus:ring-1 focus:ring-[#0C5C39]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-[#0C5C39] text-white font-semibold'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <RefreshCw className="animate-spin text-[#0C5C39] mb-4" size={32} />
            <p className="text-gray-500 font-medium text-sm">Loading experiences...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-16 px-6 bg-red-50 rounded-2xl border border-red-100 text-center">
            <AlertCircle className="text-red-500 mb-3" size={40} />
            <h3 className="text-lg font-bold text-red-900 mb-1">Failed to Load Experiences</h3>
            <p className="text-sm text-red-700 max-w-md mb-6">{error}</p>
            <button
              onClick={fetchExperiencesData}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 text-white font-medium text-sm hover:bg-red-700 transition"
            >
              <RefreshCw size={16} /> Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredExperiences.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 text-center p-8 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-[#0C5C39] mb-4">
              <Compass size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 font-['Cinzel',serif]">No Experiences Found</h3>
            <p className="text-gray-500 text-sm mt-2 max-w-md">
              {searchQuery || selectedCategory !== 'All'
                ? 'Try matching another search query or clearing your filter.'
                : 'No experiences have been added yet. Be the first to create one!'}
            </p>
            <Link
              to="/experiences/create"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0C5C39] text-white text-sm font-semibold hover:bg-emerald-900 transition shadow-sm"
            >
              <Plus size={18} /> Add New Experience
            </Link>
          </div>
        )}

        {/* Experiences Grid */}
        {!loading && !error && filteredExperiences.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExperiences.map((exp) => (
              <div
                key={exp._id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Header Tag / Banner */}
                <div className="p-6 pb-4 border-b border-gray-50 flex items-start justify-between bg-gradient-to-r from-emerald-50/50 to-amber-50/30">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0C5C39]/10 text-[#0C5C39]">
                    <Tag size={12} /> {exp.category}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider ${
                      exp.difficulty === 'easy'
                        ? 'bg-green-100 text-green-700'
                        : exp.difficulty === 'moderate'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {exp.difficulty || 'Easy'}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-['Cinzel',serif] text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#0C5C39] transition">
                      {exp.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {exp.description || 'No detailed description provided.'}
                    </p>

                    {/* Metadata items */}
                    <div className="space-y-2 text-xs text-gray-500 mb-6 bg-gray-50/80 p-3.5 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-[#d8a84e] shrink-0" />
                        <span className="font-medium text-gray-700 truncate">
                          {exp.location
                            ? `${exp.location.municipality}, ${exp.location.district}`
                            : 'Nepal'}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} className="text-gray-400" />
                          <span>{exp.durationHours} Hours</span>
                        </div>
                        
                        <div className="flex items-center gap-1.5">
                          <Users size={14} className="text-gray-400" />
                          <span>Max {exp.maxGuests} Guests</span>
                        </div>
                      </div>

                      {exp.host && (
                        <div className="pt-2 border-t border-gray-200/60 flex items-center justify-between text-gray-600">
                          <span>Host:</span>
                          <span className="font-semibold text-gray-800">{exp.host.fullName}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price & Action Buttons */}
                  <div>
                    <div className="flex items-baseline justify-between pt-2 pb-4 border-t border-gray-100">
                      <span className="text-xs text-gray-500 font-medium">Price per person</span>
                      <div className="flex items-center text-[#0C5C39] font-bold text-lg">
                        <DollarSign size={16} />
                        <span>{exp.pricePerPerson}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <Link
                        to={`/experiences/${exp._id}`}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-[#0C5C39] hover:text-white transition"
                        title="View Details"
                      >
                        <Eye size={14} /> View
                      </Link>

                      <Link
                        to={`/experiences/edit/${exp._id}`}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-amber-50 text-amber-800 text-xs font-semibold hover:bg-[#d8a84e] hover:text-gray-900 transition"
                        title="Edit Experience"
                      >
                        <Edit size={14} /> Edit
                      </Link>

                      <button
                        type="button"
                        onClick={() => setDeleteTarget(exp)}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold hover:bg-red-600 hover:text-white transition"
                        title="Delete Experience"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title={deleteTarget?.title || ''}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default ExperiencesList;
