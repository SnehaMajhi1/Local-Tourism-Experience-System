import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertCircle, PlusCircle } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/landingComponents/Footer';
import { createExperience, getHosts, getLocations } from '../services/api';

const CreateExperience = () => {
  const navigate = useNavigate();

  const [hosts, setHosts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Cultural',
    host: '',
    location: '',
    pricePerPerson: '',
    durationHours: '',
    maxGuests: '',
    difficulty: 'easy',
    description: '',
    meetingPoint: '',
    cancellationPolicy: 'Cancel up to 24 hours in advance for a full refund.',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        setLoadingOptions(true);
        const [hostsRes, locationsRes] = await Promise.all([getHosts(), getLocations()]);
        
        const fetchedHosts = hostsRes.hosts || [];
        const fetchedLocations = locationsRes.locations || [];

        setHosts(fetchedHosts);
        setLocations(fetchedLocations);

        if (fetchedHosts.length > 0) {
          setFormData((prev) => ({ ...prev, host: fetchedHosts[0]._id }));
        }
        if (fetchedLocations.length > 0) {
          setFormData((prev) => ({ ...prev, location: fetchedLocations[0]._id }));
        }
      } catch (err) {
        console.error('Failed to load host or location dropdown options:', err);
        setServerError('Could not load host and location list. Please check backend connection.');
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchDropdownData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.host) newErrors.host = 'Please select a host';
    if (!formData.location) newErrors.location = 'Please select a location';
    if (!formData.pricePerPerson || Number(formData.pricePerPerson) < 0) {
      newErrors.pricePerPerson = 'Price per person must be a valid non-negative number';
    }
    if (!formData.durationHours || Number(formData.durationHours) <= 0) {
      newErrors.durationHours = 'Duration must be greater than 0';
    }
    if (!formData.maxGuests || Number(formData.maxGuests) <= 0) {
      newErrors.maxGuests = 'Max guests must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccessMessage('');

    if (!validateForm()) return;

    try {
      setSubmitting(true);

      const payload = {
        ...formData,
        pricePerPerson: Number(formData.pricePerPerson),
        durationHours: Number(formData.durationHours),
        maxGuests: Number(formData.maxGuests),
      };

      const result = await createExperience(payload);
      setSuccessMessage(result.message || 'Experience created successfully!');
      
      setTimeout(() => {
        navigate('/experiences');
      }, 1500);
    } catch (err) {
      console.error('Create experience submission error:', err);
      setServerError(err.message || 'Failed to create experience');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-['Inter',sans-serif]">
      {/* Header Container */}
      <div className="bg-[#0C5C39] relative pb-16 pt-6">
        <Navbar />
        <div className="max-w-4xl mx-auto px-8 pt-20 pb-4">
          <Link
            to="/experiences"
            className="inline-flex items-center gap-2 text-white/80 hover:text-[#d8a84e] text-sm font-medium mb-4 transition"
          >
            <ArrowLeft size={16} /> Back to Experiences
          </Link>
          <h1 className="font-['Cinzel',serif] text-3xl md:text-4xl font-bold text-white">
            Create New Experience
          </h1>
          <p className="text-white/80 text-sm mt-1">
            Fill in the details below to add a new authentic experience to the tourism marketplace.
          </p>
        </div>
      </div>

      {/* Main Form Container */}
      <main className="flex-1 max-w-4xl mx-auto px-8 -mt-8 mb-16 w-full z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {/* Feedback Banners */}
          {serverError && (
            <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-red-800 text-sm flex items-center gap-3">
              <AlertCircle className="shrink-0 text-red-600" size={20} />
              <span>{serverError}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 text-sm flex items-center gap-3">
              <CheckCircle className="shrink-0 text-emerald-600" size={20} />
              <span>{successMessage} Redirecting to list...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title & Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Experience Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Kathmandu Heritage Walk & Food Tasting"
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-800 placeholder-gray-400 focus:outline-hidden transition ${
                    errors.title ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-200 focus:border-[#0C5C39] focus:ring-1 focus:ring-[#0C5C39]'
                  }`}
                />
                {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-hidden focus:border-[#0C5C39] focus:ring-1 focus:ring-[#0C5C39]"
                >
                  <option value="Cultural">Cultural & Heritage</option>
                  <option value="Culinary & Culture">Culinary & Cooking</option>
                  <option value="Trekking & Adventure">Trekking & Outdoor</option>
                  <option value="Arts & Crafts">Arts & Pottery</option>
                  <option value="Village Life">Rural & Village Life</option>
                  <option value="Wellness">Wellness & Yoga</option>
                </select>
                {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
              </div>
            </div>

            {/* Host & Location Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Select Host <span className="text-red-500">*</span>
                </label>
                {loadingOptions ? (
                  <div className="text-xs text-gray-400 py-3">Loading hosts...</div>
                ) : (
                  <select
                    name="host"
                    value={formData.host}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-800 focus:outline-hidden transition ${
                      errors.host ? 'border-red-500' : 'border-gray-200 focus:border-[#0C5C39]'
                    }`}
                  >
                    {hosts.map((h) => (
                      <option key={h._id} value={h._id}>
                        {h.fullName} ({h.email})
                      </option>
                    ))}
                  </select>
                )}
                {errors.host && <p className="text-xs text-red-500 mt-1">{errors.host}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Select Location <span className="text-red-500">*</span>
                </label>
                {loadingOptions ? (
                  <div className="text-xs text-gray-400 py-3">Loading locations...</div>
                ) : (
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-800 focus:outline-hidden transition ${
                      errors.location ? 'border-red-500' : 'border-gray-200 focus:border-[#0C5C39]'
                    }`}
                  >
                    {locations.map((loc) => (
                      <option key={loc._id} value={loc._id}>
                        {loc.municipality}, {loc.district} ({loc.province})
                      </option>
                    ))}
                  </select>
                )}
                {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
              </div>
            </div>

            {/* Price, Duration, Max Guests & Difficulty Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Price ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="pricePerPerson"
                  value={formData.pricePerPerson}
                  onChange={handleChange}
                  placeholder="e.g. 40"
                  min="0"
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-800 focus:outline-hidden transition ${
                    errors.pricePerPerson ? 'border-red-500' : 'border-gray-200 focus:border-[#0C5C39]'
                  }`}
                />
                {errors.pricePerPerson && <p className="text-xs text-red-500 mt-1">{errors.pricePerPerson}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Duration (Hours) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="durationHours"
                  value={formData.durationHours}
                  onChange={handleChange}
                  placeholder="e.g. 4"
                  min="1"
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-800 focus:outline-hidden transition ${
                    errors.durationHours ? 'border-red-500' : 'border-gray-200 focus:border-[#0C5C39]'
                  }`}
                />
                {errors.durationHours && <p className="text-xs text-red-500 mt-1">{errors.durationHours}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Max Guests <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="maxGuests"
                  value={formData.maxGuests}
                  onChange={handleChange}
                  placeholder="e.g. 10"
                  min="1"
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-800 focus:outline-hidden transition ${
                    errors.maxGuests ? 'border-red-500' : 'border-gray-200 focus:border-[#0C5C39]'
                  }`}
                />
                {errors.maxGuests && <p className="text-xs text-red-500 mt-1">{errors.maxGuests}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Difficulty Level
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-hidden focus:border-[#0C5C39]"
                >
                  <option value="easy">Easy</option>
                  <option value="moderate">Moderate</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            {/* Meeting Point & Cancellation Policy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Meeting Point
                </label>
                <input
                  type="text"
                  name="meetingPoint"
                  value={formData.meetingPoint}
                  onChange={handleChange}
                  placeholder="e.g. In front of Kathmandu Durbar Square Ticket Counter"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-hidden focus:border-[#0C5C39]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Cancellation Policy
                </label>
                <input
                  type="text"
                  name="cancellationPolicy"
                  value={formData.cancellationPolicy}
                  onChange={handleChange}
                  placeholder="e.g. Free cancellation up to 24 hours before start"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-hidden focus:border-[#0C5C39]"
                />
              </div>
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Detailed Description
              </label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide an enticing description of what guests will do, learn, and experience..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-hidden focus:border-[#0C5C39]"
              ></textarea>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
              <Link
                to="/experiences"
                className="px-6 py-3 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#0C5C39] text-white text-sm font-semibold hover:bg-emerald-900 disabled:opacity-50 transition shadow-md"
              >
                <PlusCircle size={18} />
                {submitting ? 'Creating Experience...' : 'Create Experience'}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateExperience;
