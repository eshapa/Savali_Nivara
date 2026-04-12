import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Target, TrendingUp, Users, Award, ShieldCheck, ArrowRight, Calendar, Phone, Mail, Globe, HandHeart, Microscope, X, ChevronLeft, ChevronRight, Maximize2, Newspaper, BookOpen, MapPin } from "lucide-react";

function About() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  const projects = [
    {
      id: 1,
      name: "Food, Medicine & Surgery",
      image: "/images/about1.jpg",
      description: "We cater more than 1.5 Lac people with essential food, medicine, and surgical support, ensuring critical healthcare reaches those in need.",
      detailedDescription: "Our medical outreach program operates 24/7 mobile health units that travel to remote villages and urban slums. We provide free consultations, medicines, and facilitate surgical interventions for those who cannot afford them. With over 300 successful surgeries and 500 health camps conducted across Maharashtra, we ensure no one is denied medical care due to financial constraints.",
      impact: "1.5 Lac+ People",
      locations: "Multiple Centers",
      icon: Microscope,
      achievements: "300+ Surgeries | 500+ Health Camps | 24/7 Medical Helpline"
    },
    {
      id: 2,
      name: "Family Reunification",
      image: "/images/about2.webp",
      description: "Thousands of individuals have been reunited with their families and safely sent to their native places, restoring hope and belonging.",
      detailedDescription: "Our dedicated team works tirelessly to trace and reunite homeless individuals with their families. Through collaboration with local authorities, railway police, and community networks, we have successfully reunited over 2,500 individuals with their loved ones. Each reunion is a story of hope, healing, and new beginnings.",
      impact: "Thousands Reunited",
      locations: "Across Maharashtra",
      icon: Heart,
      achievements: "2,500+ Reunited | 98% Success Rate | Family Counseling Support"
    },
    {
      id: 3,
      name: "Sawli Nivara Kendra",
      image: "/images/about3.jpeg",
      description: "More than a thousand people have been rehabilitated in our Sawli Nivara Kendra, which provides shelter and care to over 500 homeless individuals daily.",
      detailedDescription: "Sawli Nivara Kendra is our flagship shelter program offering safe accommodation, nutritious meals, medical care, and skill development. Currently serving 500+ individuals daily, our new 100-bed facility in Khed, Pune is under construction to expand our reach. We provide vocational training and counseling to help residents achieve independence.",
      impact: "500+ Daily Care",
      locations: "Multiple Shelters",
      icon: HandHeart,
      achievements: "1,000+ Rehabilitated | 100-Bed Facility Coming Soon | Vocational Training"
    },
    {
      id: 4,
      name: "Funeral Rites & Dignity",
      image: "/images/about4.webp",
      description: "We have performed over 1,100 funeral rites, ensuring every individual receives a dignified farewell regardless of their circumstances.",
      detailedDescription: "No one should leave this world without dignity. Our team ensures that every unclaimed individual receives proper last rites according to their faith and traditions. We work with religious leaders, local authorities, and community volunteers to conduct respectful ceremonies, honoring every life from beginning to end.",
      impact: "1,100+ Rites",
      locations: "All Centers",
      icon: ShieldCheck,
      achievements: "1,150+ Ceremonies | Multi-Faith Support | 24/7 Response Team"
    }
  ];

  const galleryImages = [
    { id: "G1", src: "/images/G1.jpg", alt: "Food Distribution" },
    { id: "G2", src: "/images/G2.jpg", alt: "Medical Camp" },
    { id: "G3", src: "/images/G3.jpg", alt: "Sawli Nivara Shelter" },
    { id: "G4", src: "/images/G4.webp", alt: "Women Empowerment" },
    { id: "G6", src: "/images/G6.webp", alt: "Education Program" },
    { id: "G7", src: "/images/G7.webp", alt: "Elderly Care" }
  ];

  const openProjectModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const openGalleryLightbox = (index) => {
    setCurrentGalleryIndex(index);
    setSelectedGalleryImage(galleryImages[index]);
    document.body.style.overflow = 'hidden';
  };

  const closeGalleryLightbox = () => {
    setSelectedGalleryImage(null);
    document.body.style.overflow = 'auto';
  };

  const nextGalleryImage = (e) => {
    e.stopPropagation();
    const nextIdx = (currentGalleryIndex + 1) % galleryImages.length;
    setCurrentGalleryIndex(nextIdx);
    setSelectedGalleryImage(galleryImages[nextIdx]);
  };

  const prevGalleryImage = (e) => {
    e.stopPropagation();
    const prevIdx = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentGalleryIndex(prevIdx);
    setSelectedGalleryImage(galleryImages[prevIdx]);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-r from-secondary to-secondary/90 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/images/about_bg.png"
            alt="About Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent"></div>

        <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Heart size={16} className="text-accent" />
            <span className="text-sm font-medium">Our Journey</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Real Life <span className="text-accent">Real People</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            A decade of compassion, action, and building a better future together.
            We believe that every person deserves dignity, opportunity, and hope.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Calendar size={16} />
              <span>Est. 2010</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Users size={16} />
              <span>50K+ Lives Impacted</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Award size={16} />
              <span>15+ Years of Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR STORY SECTION */}
      <section className="py-24 px-6 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="inline-block bg-primary/10 px-4 py-2 rounded-lg text-primary font-bold text-sm tracking-widest uppercase mb-4">
              Our Story
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-secondary leading-tight mb-6">
              Changing Lives Through <br />
              <span className="text-primary">Compassionate Action</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              "Real Life Real People" was founded with a simple yet powerful vision: to ensure no one in our community has to face homelessness or hunger alone. What started as a small group of volunteers has grown into a structured organization providing comprehensive support through our Sawli Nivara shelters across Maharashtra.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Our approach combines immediate relief with sustainable development, ensuring that families not only receive help today but also gain the tools and support they need for a brighter tomorrow.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Heart className="text-primary" size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Compassion First</p>
                  <p className="font-bold text-secondary">Dignity for All</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Award className="text-accent" size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Proven Impact</p>
                  <p className="font-bold text-secondary">50K+ Lives</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="rounded-3xl overflow-hidden shadow-2xl relative">
              <img
                src="/images/image1.png"
                alt="Our Story"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-6 flex items-center gap-4 border-l-4 border-primary">
              <div className="text-center">
                <div className="text-3xl font-black text-primary">15+</div>
                <div className="text-xs text-gray-500">Years</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-primary">50K+</div>
                <div className="text-xs text-gray-500">Beneficiaries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-primary">200+</div>
                <div className="text-xs text-gray-500">Volunteers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR PROJECTS SECTION */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="px-6 lg:px-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
              <TrendingUp size={16} className="text-accent" />
              <span className="text-accent font-semibold text-sm">Our Impact</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-secondary mb-4">
              Our <span className="text-primary">Projects</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              We focus on creating lasting change through sustainable initiatives that address the root causes of poverty and inequality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                onClick={() => openProjectModal(project)}
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5">
                    <project.icon size={16} className="text-primary" />
                    <span className="text-xs font-semibold text-secondary">{project.locations}</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Maximize2 size={16} className="text-white" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <Award size={16} className="text-accent" />
                      <span className="text-xs font-semibold text-gray-700">{project.impact}</span>
                    </div>
                    <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn More <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GALLERY SECTION - IMAGES ONLY */}
      <section className="py-24 bg-[#faf7f0] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(0,0,0,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="px-6 lg:px-20 max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 border-b-4 border-t-4 border-primary/30 py-6">
            <div className="flex justify-center items-center gap-3 mb-3">
              <Newspaper size={32} className="text-primary" />
              <span className="text-xs tracking-[0.3em] text-primary font-bold uppercase">Photo Gallery</span>
              <BookOpen size={32} className="text-primary" />
            </div>
            <h2 className="text-6xl md:text-7xl font-black text-secondary mb-2 font-serif tracking-tight">
              Our Moments
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm uppercase tracking-wider">
              Capturing Stories of Hope & Compassion
            </p>
            <div className="flex justify-center gap-4 mt-4 text-xs text-gray-400">
              <span>✦ MOMENTS OF CHANGE ✦</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="group bg-white rounded-none shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer border border-gray-200 overflow-hidden relative"
                onClick={() => openGalleryLightbox(index)}
              >
                <div className="relative h-80 overflow-hidden bg-gray-100">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Maximize2 size={24} className="text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center border-t-2 border-primary/20 pt-6">
            <p className="text-xs text-gray-400 font-mono tracking-wider">
              ✦ EVERY IMAGE TELLS A STORY OF TRANSFORMATION ✦
            </p>
            <div className="flex justify-center gap-2 mt-3">
              <div className="w-8 h-[2px] bg-primary/30"></div>
              <div className="w-2 h-2 rounded-full bg-primary/50"></div>
              <div className="w-8 h-[2px] bg-primary/30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OUR PRESENCE (MAPS) SECTION */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="px-6 lg:px-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <MapPin size={16} className="text-primary" />
              <span className="text-primary font-semibold text-sm">Find Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-secondary mb-4">
              Our <span className="text-primary">Presence</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
              Visit our centers to see our work firsthand or seek assistance from our dedicated team.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Center 1: YCMH */}
            <div className="bg-slate-50 rounded-3xl overflow-hidden shadow-lg border border-slate-100 group transition-all duration-500 hover:shadow-2xl">
              <div className="p-6 bg-white border-b border-slate-100 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-[#0f172a]">Yashwantrao Chavan Memorial Hospital</h3>
                  <p className="text-sm text-[#0f766e] font-medium mt-1">S.T. Nagar, Pimpri, Pune</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-2xl group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="h-[400px] w-full relative">
                <iframe
                  title="YCM Hospital Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.201460394336!2d73.8188151752009!3d18.654950982463428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9e76d913507%3A0x6b16867664654c86!2sPCMC%20PGI%20Yashwantrao%20Chavan%20Memorial%20Hospital!5e0!3m2!1sen!2sin!4v1711442000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  className="border-0 grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-[1.01]"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="absolute bottom-6 left-6 right-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl flex items-center justify-between pointer-events-auto">
                    <span className="text-slate-700 text-sm font-semibold">Location: Pimpri, Maharashtra</span>
                    <a
                      href="https://maps.app.goo.gl/uX7E4"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Center 2: Savali Nivara */}
            <div className="bg-slate-50 rounded-3xl overflow-hidden shadow-lg border border-slate-100 group transition-all duration-500 hover:shadow-2xl">
              <div className="p-6 bg-white border-b border-slate-100 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-[#0f172a]">Savali Nivara Homeless Shelter</h3>
                  <p className="text-sm text-[#0f766e] font-medium mt-1">Chikhali-Pimpri Area, Pune</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-2xl group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="h-[400px] w-full relative">
                <iframe
                  title="Savali Nivara Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.273767417435!2d73.81804797520083!3d18.652136082465493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9e7289f6607%3A0xe5567a14e963bc1b!2sReal%20Life%20Real%20People's%20Savali%20Nivara!5e0!3m2!1sen!2sin!4v1711442100000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  className="border-0 grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-[1.01]"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="absolute bottom-6 left-6 right-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl flex items-center justify-between pointer-events-auto">
                    <span className="text-slate-700 text-sm font-semibold">Location: Chikhali, Maharashtra</span>
                    <a
                      href="https://maps.app.goo.gl/uX7E4"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. JOIN US SECTION */}
      <section className="py-24 bg-gradient-to-r from-primary to-primary/90 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

        <div className="px-6 lg:px-20 max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <HandHeart size={16} />
                <span className="text-sm font-medium">Get Involved</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Join Us in <br />
                Making a Difference
              </h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Whether you're looking to donate, volunteer, or partner with us,
                there are many ways to contribute to our mission. Every action,
                no matter how small, helps create lasting change.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Heart size={18} />
                  </div>
                  <span>Donate to support our programs</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Users size={18} />
                  </div>
                  <span>Volunteer your time and skills</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Globe size={18} />
                  </div>
                  <span>Partner with us for greater impact</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-secondary mb-4">Subscribe for Updates</h3>
              <p className="text-gray-600 mb-6">Stay informed about our work and impact stories.</p>

              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-xl transition-all transform hover:-translate-y-1 shadow-lg">
                  Subscribe Now
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-center text-gray-500 text-sm">Or reach out to us directly</p>
                <div className="flex justify-center gap-4 mt-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={14} />
                    <span className="text-xs">+91 123 456 7890</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={14} />
                    <span className="text-xs">contact@rlrp.org</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT DETAIL MODAL */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={closeProjectModal}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
            onClick={closeProjectModal}
          >
            <X size={32} />
          </button>

          <div
            className="max-w-4xl w-full max-h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={selectedProject.image}
                alt={selectedProject.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-6 text-white">
                <span className="text-accent text-sm font-bold uppercase tracking-wider">{selectedProject.locations}</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-1">{selectedProject.name}</h2>
              </div>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(85vh-320px)]">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">{selectedProject.impact}</span>
                <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-semibold">{selectedProject.achievements}</span>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {selectedProject.detailedDescription}
              </p>

              <div className="flex justify-end">
                <Link
                  to="/donate"
                  className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-full transition-all transform hover:-translate-y-1 shadow-lg flex items-center gap-2"
                  onClick={closeProjectModal}
                >
                  Support This Cause <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GALLERY LIGHTBOX MODAL - IMAGES ONLY */}
      {selectedGalleryImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={closeGalleryLightbox}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
            onClick={closeGalleryLightbox}
          >
            <X size={32} />
          </button>

          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full text-white transition-all hover:scale-110 z-10"
            onClick={prevGalleryImage}
          >
            <ChevronLeft size={32} />
          </button>

          <div className="max-w-6xl w-full max-h-[85vh] flex items-center justify-center">
            <img
              src={selectedGalleryImage.src}
              alt={selectedGalleryImage.alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-500"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full text-white transition-all hover:scale-110 z-10"
            onClick={nextGalleryImage}
          >
            <ChevronRight size={32} />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm font-medium">
            {currentGalleryIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-secondary py-12 border-t border-white/10">
        <div className="px-6 lg:px-20 max-w-7xl mx-auto text-center">
          <div className="flex justify-center gap-6 mb-6">
            <Heart size={20} className="text-primary" />
            <span className="text-white/40">•</span>
            <span className="text-white/60 text-sm">Real Life Real People Foundation</span>
            <span className="text-white/40">•</span>
            <Award size={20} className="text-accent" />
          </div>
          <p className="text-white/40 font-medium tracking-wide">
            © 2026 Real Life Real People (RLRP). Transforming lives with love, dignity, and compassion.
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <Link to="/" className="text-white/40 hover:text-white text-sm transition-colors">Home</Link>
            <Link to="/about" className="text-white/40 hover:text-white text-sm transition-colors">About</Link>
            <Link to="/donate" className="text-white/40 hover:text-white text-sm transition-colors">Donate</Link>
            <Link to="/signup" className="text-white/40 hover:text-white text-sm transition-colors">Volunteer</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default About;