// client/src/pages/ResumeBuilder.jsx
import React, { useState } from 'react';
import { FileText, User, Briefcase, GraduationCap, Code, Download, ChevronRight, ChevronLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAppContext } from '../context/AppContext';

// Dummy component for the Live Preview of the Resume
const LiveResumePreview = ({ data, theme }) => {
    // Determine preview background based on theme
    const previewBg = theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-800';
    const accentColor = 'text-purple-600 dark:text-purple-400';

    return (
        <div className={`p-6 h-full border rounded-lg shadow-xl overflow-y-auto ${previewBg}`}>
            <h2 className={`text-2xl font-bold border-b pb-2 mb-4 ${accentColor}`}>
                {data.personal.fullName || "Jane Doe"}
            </h2>
            <p className="text-sm mb-4">
                {data.personal.phone} | {data.personal.email} | {data.personal.location}
            </p>

            {/* Summary */}
            <h3 className={`text-lg font-semibold mt-4 mb-2 border-b ${accentColor}`}>Summary</h3>
            <p className="text-sm">{data.summary || "A highly motivated and results-driven professional..."}</p>

            {/* Experience */}
            <h3 className={`text-lg font-semibold mt-4 mb-2 border-b ${accentColor}`}>Work Experience</h3>
            {data.experience.map((exp, index) => (
                <div key={index} className="mb-3">
                    <p className="font-semibold">{exp.jobTitle} at {exp.company}</p>
                    <p className="text-xs italic text-gray-500 dark:text-gray-400">
                        {exp.startDate} - {exp.endDate}
                    </p>
                    <ul className="list-disc ml-5 text-sm">
                        {exp.achievements.split('\n').map((line, i) => (
                            line.trim() && <li key={i}>{line}</li>
                        ))}
                    </ul>
                </div>
            ))}
            
            {/* Skills */}
            <h3 className={`text-lg font-semibold mt-4 mb-2 border-b ${accentColor}`}>Skills</h3>
            <p className="text-sm">{data.skills.join(', ')}</p>
        </div>
    );
};


const ResumeBuilder = () => {
    // Simple mock context data for user/theme
    const { axios, token, theme } = useAppContext();

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [resumeData, setResumeData] = useState({
        personal: { fullName: '', professionalTitle: '', phone: '', email: '', location: '' },
        summary: '',
        experience: [{ jobTitle: '', company: '', location: '', startDate: '', endDate: 'Present', achievements: '' }],
        education: [{ institution: '', degree: '', graduationDate: '' }],
        skills: ['React', 'Tailwind CSS', 'Project Management'],
    });

    const updatePersonal = (field, value) => {
        setResumeData(prev => ({
            ...prev,
            personal: { ...prev.personal, [field]: value }
        }));
    };

    const updateExperience = (index, field, value) => {
        const newExp = [...resumeData.experience];
        newExp[index] = { ...newExp[index], [field]: value };
        setResumeData(prev => ({ ...prev, experience: newExp }));
    };

    const addExperience = () => {
        setResumeData(prev => ({
            ...prev,
            experience: [...prev.experience, { jobTitle: '', company: '', location: '', startDate: '', endDate: 'Present', achievements: '' }]
        }));
    };

    const handleNext = () => setStep(prev => Math.min(prev + 1, 4));
    const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

    const handleDownload = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post('/api/ai/resume/download', { resumeData }, {
                headers: { Authorization: token }
            });

            if (data && data.success) {
                // Trigger actual PDF download
                const baseUrl = axios.defaults.baseURL || 'http://localhost:4000';
                const downloadUrl = `${baseUrl}${data.downloadUrl}`;
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = data.filename || 'resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                toast.success("Resume downloaded successfully!");
            } else {
                toast.error(data?.message || "Failed to generate PDF");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Failed to download resume");
        } finally {
            setLoading(false);
        }
    };

    // Component mapping for each step
    const StepContent = {
        1: (
            <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2"><User size={18} /> Personal Details</h3>
                <input type="text" placeholder="Full Name" className="w-full p-2 border rounded" required 
                    value={resumeData.personal.fullName} onChange={e => updatePersonal('fullName', e.target.value)} />
                <input type="text" placeholder="Professional Title" className="w-full p-2 border rounded" required 
                    value={resumeData.personal.professionalTitle} onChange={e => updatePersonal('professionalTitle', e.target.value)} />
                <input type="email" placeholder="Email" className="w-full p-2 border rounded" required 
                    value={resumeData.personal.email} onChange={e => updatePersonal('email', e.target.value)} />
                <input type="tel" placeholder="Phone Number" className="w-full p-2 border rounded" 
                    value={resumeData.personal.phone} onChange={e => updatePersonal('phone', e.target.value)} />
                <input type="text" placeholder="Location (City, State)" className="w-full p-2 border rounded" 
                    value={resumeData.personal.location} onChange={e => updatePersonal('location', e.target.value)} />
            </div>
        ),
        2: (
            <div className="space-y-6">
                <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase size={18} /> Work Experience</h3>
                {resumeData.experience.map((exp, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm space-y-2">
                        <input type="text" placeholder="Job Title" className="w-full p-2 border rounded" required
                            value={exp.jobTitle} onChange={e => updateExperience(index, 'jobTitle', e.target.value)} />
                        <div className='flex gap-2'>
                            <input type="text" placeholder="Company" className="w-1/2 p-2 border rounded" required
                                value={exp.company} onChange={e => updateExperience(index, 'company', e.target.value)} />
                            <input type="text" placeholder="Location" className="w-1/2 p-2 border rounded"
                                value={exp.location} onChange={e => updateExperience(index, 'location', e.target.value)} />
                        </div>
                        <div className='flex gap-2'>
                            <input type="text" placeholder="Start Date (MM/YYYY)" className="w-1/2 p-2 border rounded text-sm"
                                value={exp.startDate} onChange={e => updateExperience(index, 'startDate', e.target.value)} />
                            <input type="text" placeholder="End Date (MM/YYYY or Present)" className="w-1/2 p-2 border rounded text-sm"
                                value={exp.endDate} onChange={e => updateExperience(index, 'endDate', e.target.value)} />
                        </div>
                        <textarea rows={3} placeholder="Key Responsibilities & Achievements (Use bullet points or separate lines)"
                            className="w-full p-2 border rounded text-sm"
                            value={exp.achievements} onChange={e => updateExperience(index, 'achievements', e.target.value)} />
                    </div>
                ))}
                <button onClick={addExperience} className="w-full py-2 border border-purple-400 text-purple-600 rounded-lg hover:bg-purple-50 transition">
                    + Add Position
                </button>
                <div className="pt-4 border-t mt-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2"><GraduationCap size={18} /> Education (Skipped for brevity, can be implemented similarly)</h3>
                </div>
            </div>
        ),
        3: (
            <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2"><Code size={18} /> Summary & Skills</h3>
                <label className="block text-sm font-medium">Professional Summary (3-4 Sentences)</label>
                <textarea rows={5} placeholder="Write a compelling overview of your career, key achievements, and goals."
                    className="w-full p-3 border rounded" required
                    value={resumeData.summary} onChange={e => setResumeData(prev => ({ ...prev, summary: e.target.value }))} />
                
                <label className="block text-sm font-medium pt-4">Key Skills (Comma Separated)</label>
                <input type="text" placeholder="e.g., JavaScript, AWS, Agile, Leadership" className="w-full p-2 border rounded"
                    value={resumeData.skills.join(', ')} 
                    onChange={e => setResumeData(prev => ({ ...prev, skills: e.target.value.split(',').map(s => s.trim()) }))} />
            </div>
        ),
        4: (
            <div className="space-y-6">
                <h3 className="text-lg font-semibold flex items-center gap-2"><Download size={18} /> Review & Download</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your resume is ready! Review the live preview on the right and select your final template and download options below.</p>
                
                {/* Dummy Template Selection */}
                <div className="p-4 border rounded-lg bg-white shadow-md">
                    <h4 className="font-medium mb-2">Template Selection</h4>
                    <p className="text-sm text-gray-500">Currently using: **Modern Professional** (Customize fonts and colors in this section)</p>
                </div>
                
                <button 
                    onClick={handleDownload} 
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:bg-gray-400"
                >
                    {loading ? (
                        <span className='w-4 h-4 rounded-full border-2 border-t-transparent animate-spin'></span>
                    ) : (
                        <Download size={20} />
                    )}
                    {loading ? "Generating PDF..." : "Download Final Resume (PDF)"}
                </button>
            </div>
        )
    };

    return (
        <div className="h-full min-h-screen p-6 flex flex-col lg:flex-row gap-6 bg-gray-50 dark:bg-gray-900 text-slate-700 dark:text-slate-300">
            {/* Left Panel: Form Steps */}
            <div className="w-full lg:w-1/2 max-w-xl p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg">
                <div className="flex items-center gap-3 mb-6 border-b pb-4">
                    <FileText className="w-6 text-purple-600 dark:text-purple-400" />
                    <h1 className="text-xl font-semibold">Resume Builder</h1>
                </div>

                {/* Step Indicator */}
                <div className="flex justify-between mb-8 text-sm font-medium">
                    {['Personal', 'Experience', 'Summary', 'Download'].map((label, index) => (
                        <div key={index} className={`flex flex-col items-center cursor-pointer ${step >= index + 1 ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${step === index + 1 ? 'border-purple-600 dark:border-purple-400 bg-purple-50 dark:bg-gray-700' : 'border-gray-300 dark:border-gray-600'}`}>
                                {index + 1}
                            </div>
                            <span className='mt-1 hidden sm:block'>{label}</span>
                        </div>
                    ))}
                </div>

                {/* Current Step Content */}
                <div className="min-h-[400px]">
                    {StepContent[step]}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={handleBack}
                        disabled={step === 1 || loading}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition disabled:opacity-50"
                    >
                        <ChevronLeft size={18} /> Back
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={step === 4 || loading}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition disabled:opacity-50"
                    >
                        Next <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            {/* Right Panel: Live Preview */}
            <div className="w-full lg:w-1/2 max-w-xl p-0 h-[800px] lg:h-auto sticky top-6">
                <h2 className="text-lg font-semibold mb-3">Live Preview</h2>
                <div className='h-[90%] w-full overflow-hidden border-4 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-2'>
                    {/* The LiveResumePreview component rendering the output */}
                    <LiveResumePreview data={resumeData} theme={theme} />
                </div>
            </div>
        </div>
    );
};

export default ResumeBuilder;