import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, Edit, Trash2, MapPin, Clock, Users, DollarSign, 
  Tag, AlertCircle, ShieldAlert, CheckCircle2, User, RefreshCw
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/landingComponents/Footer';
import DeleteModal from '../components/common/DeleteModal';
import { getExperienceById, deleteExperience } from '../services/api';

const ExperienceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Delete modal state
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getExperienceById(id);
        setExperience(data.experience);
      } catch (err) {
        console.error('Fetch experience by ID error:', err);
        setError(err.message || 'Experience not found.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchExperience();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteExperience(id);
      navigate('/experiences');
    } catch (err) {
      alert(err.message || 'Failed to delete experience');
    } finally {
      setIsDeleting(false);
      setIsDeleteOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-['Inter',sans-serif]">
      {/* Header Banner */}
      <div className="bg-[#0C5C39] relative pb-20 pt-6">
        <Navbar />
        <div className="max-w-5xl mx-auto px-8 pt-20 pb-4">
          <Link
            to="/experiences"
            className="inline-flex items-center gap-2 text-white/80 hover:text-[#d8a84e] text-sm font-medium mb-4 transition"
          >
            <ArrowLeft size={16} /> Back to All Experiences
          </Link>
          {experience && (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#d8a84e] text-gray-900 mb-3">
                  <Tag size={12} /> {experience.category}
                </span>
                <h1 className="font-['Cinzel',serif] text-3xl md:text-4xl font-bold text-white leading-tight">
                  {experience.title}
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to={`/experiences/edit/${experience._id}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 text-gray-900 text-sm font-semibold hover:bg-amber-300 transition shadow-md"
                >
                  <Edit size={16} /> Edit
                </Link>
                <button
                  type="button"
                  onClick={() => setIsDeleteOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition shadow-md"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl mx-auto px-8 -mt-10 mb-16 w-full z-10">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <RefreshCw className="animate-spin text-[#0C5C39] mb-4" size={32} />
            <p className="text-gray-500 font-medium text-sm">Loading experience details...</p>
          </div>
        )}

        {!loading && error && (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-md">
            <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
            <h2 className="text-2xl font-bold text-gray-900 mb-2 font-['Cinzel',serif]">Experience Not Found</h2>
            <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto">{error}</p>
            <Link
              to="/experiences"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0C5C39] text-white font-semibold text-sm hover:bg-emerald-900 transition"
            >
              <ArrowLeft size={16} /> Back to Experiences
            </Link>
          </div>
        )}

        {!loading && experience && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Main Details Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview Box */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h2 className="font-['Cinzel',serif] text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  About This Experience
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
                  {experience.description || 'No detailed description provided.'}
                </p>

                {/* Additional Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-100">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block mb-1">
                      Meeting Point
                    </span>
                    <span className="text-sm font-medium text-gray-800">
                      {experience.meetingPoint || 'To be communicated after booking'}
                    </span>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block mb-1">
                      Cancellation Policy
                    </span>
                    <span className="text-sm font-medium text-gray-800">
                      {experience.cancellationPolicy || 'Flexible cancellation policy'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Host Card */}
              {experience.host && (
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                  <h2 className="font-['Cinzel',serif] text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                    <User size={20} className="text-[#0C5C39]" /> Meet Your Local Host
                  </h2>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#0C5C39] text-white flex items-center justify-center font-bold text-xl uppercase shrink-0">
                      {experience.host.fullName?.[0] || 'H'}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{experience.host.fullName}</h3>
                      <p className="text-xs text-[#0C5C39] font-medium uppercase tracking-wider mb-2">
                        {experience.host.role} • {experience.host.email}
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {experience.host.bio || 'Local host passionate about sharing Nepal\'s heritage and culture.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Summary Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md sticky top-6">
                <div className="flex items-baseline justify-between pb-6 border-b border-gray-100">
                  <span className="text-sm text-gray-500 font-medium">Price</span>
                  <div className="flex items-center text-[#0C5C39] font-extrabold text-3xl">
                    <DollarSign size={24} />
                    <span>{experience.pricePerPerson}</span>
                    <span className="text-xs font-normal text-gray-400 ml-1">/ person</span>
                  </div>
                </div>

                <div className="py-6 space-y-4 text-sm text-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Clock size={18} className="text-[#d8a84e]" />
                      <span>Duration</span>
                    </div>
                    <span className="font-semibold text-gray-900">{experience.durationHours} Hours</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Users size={18} className="text-[#d8a84e]" />
                      <span>Max Group Size</span>
                    </div>
                    <span className="font-semibold text-gray-900">{experience.maxGuests} Guests</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500">
                      <ShieldAlert size={18} className="text-[#d8a84e]" />
                      <span>Difficulty</span>
                    </div>
                    <span className="font-semibold capitalize text-gray-900">{experience.difficulty || 'Easy'}</span>
                  </div>

                  {experience.location && (
                    <div className="flex items-start justify-between pt-2">
                      <div className="flex items-center gap-2 text-gray-500 shrink-0">
                        <MapPin size={18} className="text-[#d8a84e]" />
                        <span>Location</span>
                      </div>
                      <span className="font-semibold text-gray-900 text-right">
                        {experience.location.municipality}, {experience.location.district}
                        <br />
                        <span className="text-xs text-gray-500 font-normal">
                          {experience.location.province} Province
                        </span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                <div className="pt-4 border-t border-gray-100 text-center">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                    <CheckCircle2 size={14} /> Status: {experience.status || 'Active'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />

      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title={experience?.title || ''}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default ExperienceDetail;
