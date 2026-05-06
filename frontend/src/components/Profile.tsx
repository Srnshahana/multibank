import React from 'react';
import { ArrowLeft, Briefcase, Code, Mail, ExternalLink, Calendar, MapPin, CheckCircle2, Globe, Star } from 'lucide-react';

interface ProfileProps {
  onBack: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ onBack }) => {
  const projects = [
    {
      title: 'Mentor-Mentee Platform',
      role: 'React.js, Supabase (Personal Project)',
      description: 'A fully working mentor-mentee platform with a complete backend powered by Supabase. Designed and developed from scratch to connect mentors and mentees for guided learning with a strong focus on seamless user flow and interaction.',
      tags: ['React.js', 'Supabase', 'Full-stack', 'User Flow'],
      link: 'https://internify-sigma.vercel.app/',
      featured: true
    },
    {
      title: 'Metax Payments',
      role: 'Flutter',
      description: 'Global payment platform supporting international transactions. Built end-to-end UI from design to development with focus on usability and consistency.',
      tags: ['Flutter', 'Global Payments', 'UI/UX'],
      link: 'https://play.google.com/store/apps/details?id=com.metaxpayments.bank&pcampaignid=web_share'
    },
    {
      title: 'Officekit HR',
      role: 'React Native / Javascript',
      description: 'Mobile HR solution for managing employee workflows and performance. Led front-end development and handled deployment, versioning, and team coordination.',
      tags: ['React Native', 'JavaScript', 'Mobile HR'],
      link: 'https://play.google.com/store/apps/details?id=com.officekit&pcampaignid=web_share'
    },
    {
      title: 'SchoolPlus',
      role: 'React Native',
      description: 'Comprehensive app for managing school operations and student activities. Worked on UI/UX and handled key modules, along with deployment and release cycles.',
      tags: ['React Native', 'School Management'],
      link: 'https://play.google.com/store/apps/details?id=com.m2hinfotech.eschool&pcampaignid=web_share'
    },
    {
      title: 'Hrdesk',
      role: 'React Native / Javascript',
      description: 'Customized HR management system for handling employee operations. Led front-end development and managed core modules from design to deployment.',
      tags: ['React Native', 'JavaScript', 'HR System'],
      link: 'https://play.google.com/store/apps/details?id=com.m2hinfotech.eschool&pcampaignid=web_share'
    },
    {
      title: 'Affex',
      role: 'Flutter',
      description: 'Cross-border payment platform focused on efficient transactions. Contributed to UI development and coordinated team execution to meet project goals.',
      tags: ['Flutter', 'Fintech', 'Payments'],
      link: 'https://play.google.com/store/apps/details?id=com.alfardanexchange.alfapay&pcampaignid=web_share'
    },
    {
      title: 'Internify Platform',
      role: 'React.js',
      description: 'Platform connecting students with internship opportunities. Took ownership of development, focusing on fast execution, modern UI, and stability.',
      tags: ['React.js', 'Modern UI'],
      link: 'https://play.google.com/store/apps/details?id=com.Internify.internify&pcampaignid=web_share'
    }
  ];

  const experience = [
    {
      company: 'Metax Payments',
      location: 'Dubai',
      role: 'Mobile Application Developer',
      type: 'Fulltime',
      date: '08/2025 - Ongoing',
      details: [
        'Contributed to a global payments platform with focus on web and mobile UI interface development',
        'Focused on modern UI/UX design and improved usability using latest design approaches and tools'
      ]
    },
    {
      company: 'Internify',
      location: 'Remote',
      role: 'Front-end Developer | Mobile App Developer',
      type: 'Freelance',
      date: '03/2025 - 08/2025',
      details: [
        'Took the lead in building an internship platform for students with rapid development cycles',
        'Incorporated AI-assisted workflows and modern UI trends to deliver a stable, user-focused application'
      ]
    },
    {
      company: 'M2H infotech LLP',
      location: 'Cyberpark',
      role: 'Mobile Application Lead',
      type: 'Fulltime',
      date: '02/2023 - 02/2025',
      details: [
        'Led the mobile development team, overseeing 5+ projects from design to release management',
        'Drove end-to-end execution, ensuring smooth delivery, team coordination, and high-quality applications'
      ]
    }
  ];

  const skills = [
    'Flutter', 'React Native', 'React.js', 'JavaScript (ES6+)', 'RESTful APIs',
    'Figma (UI/UX)', 'Animations', 'Git', 'Xcode', 'Supabase/Firebase',
    'Cursor/Antigravity', 'AI Prompting', 'Troubleshooting', 'Bug Fixing',
    'iOS Certifications', 'Load Optimization', 'Deployment (iOS/Android)', 'Release Monitoring'
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto relative bg-background text-text-primary">
      {/* Background ambient glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none fixed" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary-hover/10 blur-[120px] pointer-events-none fixed" />

      <div className="p-8 z-10 max-w-6xl mx-auto w-full">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-8 group"
        >
          <div className="p-2 rounded-full bg-surface border border-border/50 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="font-medium">Back to Dashboard</span>
        </button>

        {/* Hero Section wrapped in a major card */}
        <div className="glass-panel p-8 mb-12 flex flex-col md:flex-row gap-8 items-start border-border/50 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
          <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-primary-hover shadow-[0_0_30px_rgba(14,165,233,0.3)] flex items-center justify-center text-5xl font-bold text-white flex-shrink-0">
            SS
          </div>

          <div className="flex-1 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2 tracking-tight">Sherin Shahana</h1>
                <h2 className="text-xl text-primary font-medium flex items-center gap-2">
                  <Briefcase className="w-5 h-5" /> Software Developer
                </h2>
              </div>
            </div>

            {/* Contact Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-surface/40 p-5 rounded-xl border border-border/50 flex flex-col gap-3 hover:border-primary/30 transition-colors">
                <span className="text-xs uppercase tracking-wider text-text-tertiary font-bold flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-primary" /> Location & Contact
                </span>
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-text-primary">Dubai, UAE</span>
                  <a href="mailto:sherinshahanak2963@gmail.com" className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors group">
                    <Mail className="w-4 h-4 text-text-tertiary group-hover:text-primary" />
                    sherinshahanak2963@gmail.com
                  </a>
                </div>
              </div>

              <div className="bg-surface/40 p-5 rounded-xl border border-border/50 flex flex-col gap-3 hover:border-primary/30 transition-colors">
                <span className="text-xs uppercase tracking-wider text-text-tertiary font-bold flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-primary" /> Professional Links
                </span>
                <div className="flex flex-col gap-2">
                  <a href="https://www.linkedin.com/in/sherin-shahana-k" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-text-secondary hover:text-[#0A66C2] transition-colors group truncate">
                    <Globe className="w-4 h-4 flex-shrink-0 text-text-tertiary group-hover:text-[#0A66C2]" /> 
                    <span className="truncate hover:underline">www.linkedin.com/in/sherin-shahana-k</span>
                  </a>
                  <a href="https://github.com/Srnshahana" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors group truncate">
                    <Code className="w-4 h-4 flex-shrink-0 text-text-tertiary group-hover:text-white" /> 
                    <span className="truncate hover:underline">https://github.com/Srnshahana</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-surface/20 p-6 rounded-xl border border-border/30 mb-8 border-l-4 border-l-primary relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
              <h3 className="text-sm uppercase tracking-widest text-text-tertiary font-bold mb-3">Professional Summary</h3>
              <p className="text-text-secondary leading-relaxed text-base relative z-10">
                I focus on delivering high-quality UI and building fast, stable mobile applications, with hands-on experience across 9+ projects. Known for taking ownership and executing efficiently, I ensure smooth development, reliable performance, and user-friendly results across every project.
              </p>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-widest text-text-tertiary font-bold mb-4">Technical Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span key={skill} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-surface border border-border/60 text-text-secondary hover:border-primary/50 hover:text-primary transition-all cursor-default shadow-sm flex items-center gap-1.5 group">
                    <CheckCircle2 className="w-3 h-3 opacity-40 group-hover:opacity-100 group-hover:text-primary transition-opacity" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Experience Section */}
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary border border-primary/20">
                <Briefcase className="w-5 h-5" />
              </div>
              Professional Experience
            </h3>

            <div className="flex flex-col gap-4">
              {experience.map((exp, idx) => (
                <div key={idx} className="glass-panel p-6 border-border/30 relative overflow-hidden group hover:border-primary/50 transition-all duration-300 hover:shadow-[0_5px_20px_rgba(14,165,233,0.05)]">
                  <div className="absolute top-0 left-0 w-1 h-full bg-border group-hover:bg-primary transition-colors" />

                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-4">
                    <h4 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">{exp.role}</h4>
                    <span className="text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-surface border border-border text-text-secondary whitespace-nowrap shadow-sm">
                      {exp.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium mb-4">
                    <span className="text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">{exp.company}</span>
                    <span className="flex items-center gap-1 text-text-secondary">
                      <MapPin className="w-3.5 h-3.5" /> {exp.location}
                    </span>
                    <span className="flex items-center gap-1 text-text-tertiary font-mono bg-surface/50 px-2 py-1 rounded">
                      <Calendar className="w-3.5 h-3.5" /> {exp.date}
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {exp.details.map((detail, i) => (
                      <li key={i} className="text-sm text-text-secondary leading-relaxed flex items-start gap-3">
                        <span className="text-primary mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <div className="p-2 bg-sky-500/10 rounded-lg text-sky-400 border border-sky-400/20">
                <Code className="w-5 h-5" />
              </div>
              Relevant Projects
            </h3>

            <div className="flex flex-col gap-4">
              {projects.map((project: any, idx) => (
                <a
                  key={idx}
                  href={project.link || '#'}
                  target={project.link ? "_blank" : "_self"}
                  rel="noreferrer"
                  className={`glass-panel p-6 flex flex-col group hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(14,165,233,0.15)] transition-all duration-300 relative overflow-hidden block ${project.link ? 'cursor-pointer' : 'cursor-default'} ${project.featured ? 'border-primary shadow-[0_0_20px_rgba(14,165,233,0.2)] bg-primary/10' : 'border-border/30 hover:border-primary/50'}`}
                  onClick={(e) => !project.link && e.preventDefault()}
                >
                  <div className={`h-1 w-full bg-gradient-to-r from-primary to-primary-hover absolute top-0 left-0 ${project.featured ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`} />
                  
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm flex items-center gap-1 z-10">
                      <Star className="w-3 h-3" fill="currentColor" /> Featured
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-xl font-bold group-hover:text-primary transition-colors flex items-center gap-2">
                      {project.title}
                    </h4>
                    {project.link && (
                      <div className="p-1.5 rounded-md bg-surface/50 group-hover:bg-primary/10 transition-colors border border-border/50 group-hover:border-primary/30">
                        <ExternalLink className="w-4 h-4 text-text-tertiary group-hover:text-primary transition-colors" />
                      </div>
                    )}
                  </div>

                  <p className="text-sm font-bold text-primary mb-3 uppercase tracking-wider">{project.role}</p>
                  <p className="text-text-secondary text-sm flex-1 mb-6 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/30">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded bg-surface border border-border/50 text-text-secondary shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
