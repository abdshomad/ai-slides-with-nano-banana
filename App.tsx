
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { GoogleGenAI } from "@google/genai";
import { DesktopElements, LeftSideThumbnails } from './components/DecorativeElements';
import { FileCard, ImageFileCard } from './components/FilePreview';
import { FileIcon, MicIcon, DocumentTextIcon, FileTextIcon } from './components/Icons';

interface UploadedFile {
    id: string;
    name: string;
    type: string;
    url?: string; // For image previews
    content: string; // Base64 content
}

const App: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [generatedTitle, setGeneratedTitle] = useState<string>('');
    const [isGeneratingTitle, setIsGeneratingTitle] = useState<boolean>(false);
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const placeholderPrompts = useMemo(() => [
        'Client Pitch: Q4 Marketing Strategy',
        'A presentation on the history of AI',
        'Onboarding slides for new marketing hires',
        'Sales kickoff deck for the new product launch',
        'A 10-slide summary of the latest earnings report'
    ], []);

    const [animatedPlaceholder, setAnimatedPlaceholder] = useState('');
    const promptIndex = useRef(0);
    const charIndex = useRef(0);
    const isDeleting = useRef(false);

    useEffect(() => {
        // Fix: Use ReturnType<typeof setTimeout> for the timeout ID type to ensure compatibility with browser environments.
        let timeoutId: ReturnType<typeof setTimeout>;

        const type = () => {
            const currentPrompt = placeholderPrompts[promptIndex.current];
            const typeSpeed = 50;
            const deleteSpeed = 15;
            const delay = 1000;

            if (isDeleting.current) {
                if (charIndex.current > 0) {
                    charIndex.current--;
                    setAnimatedPlaceholder(currentPrompt.substring(0, charIndex.current));
                    timeoutId = setTimeout(type, deleteSpeed);
                } else {
                    isDeleting.current = false;
                    promptIndex.current = (promptIndex.current + 1) % placeholderPrompts.length;
                    timeoutId = setTimeout(type, 250);
                }
            } else {
                if (charIndex.current < currentPrompt.length) {
                    charIndex.current++;
                    setAnimatedPlaceholder(currentPrompt.substring(0, charIndex.current));
                    timeoutId = setTimeout(type, typeSpeed);
                } else {
                    isDeleting.current = true;
                    timeoutId = setTimeout(type, delay);
                }
            }
        };

        timeoutId = setTimeout(type, 100);

        return () => clearTimeout(timeoutId);
    }, [placeholderPrompts]);


    const generateTitle = useCallback(async (topic: string) => {
        if (!topic.trim()) {
            setGeneratedTitle('');
            return;
        }
        setIsGeneratingTitle(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Generate a short, catchy presentation title for the following topic: "${topic}". Only return the title text, without any quotes or prefixes.`,
            });
            const title = response.text.trim().replace(/^"|"$/g, '');
            setGeneratedTitle(title);
        } catch (error) {
            console.error("Error generating title:", error);
            setGeneratedTitle(topic); // Fallback to the prompt text itself
        } finally {
            setIsGeneratingTitle(false);
        }
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (prompt) {
                generateTitle(prompt);
            } else {
                setGeneratedTitle('');
            }
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [prompt, generateTitle]);

    const handleFileIconClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        const filePromises = Array.from(files).map((file, index) => {
            return new Promise<UploadedFile>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const base64Content = (e.target?.result as string).split(',')[1];
                    const newFile: UploadedFile = {
                        id: `${file.name}-${Date.now()}-${index}`,
                        name: file.name,
                        type: file.type,
                        content: base64Content,
                        url: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
                    };
                    resolve(newFile);
                };
                reader.onerror = (error) => reject(error);
                reader.readAsDataURL(file);
            });
        });

        try {
            const newFiles = await Promise.all(filePromises);
            setUploadedFiles(prev => [...prev, ...newFiles]);
        } catch (error) {
            console.error("Error reading files:", error);
        }

        if (event.target) {
            event.target.value = '';
        }
    };

    const handleRemoveFile = (fileId: string) => {
        const fileToRemove = uploadedFiles.find(f => f.id === fileId);
        if (fileToRemove?.url) {
            URL.revokeObjectURL(fileToRemove.url);
        }
        setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    };
    
    useEffect(() => {
      return () => {
          uploadedFiles.forEach(file => {
              if (file.url) {
                  URL.revokeObjectURL(file.url);
              }
          });
      };
  }, [uploadedFiles]);

    return (
        <main className="relative font-montserrat bg-[#0d1117] min-h-screen flex justify-center items-center p-4 overflow-hidden">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                className="hidden"
                accept="image/*,.pdf,.csv,.txt,.doc,.docx"
            />
            <DesktopElements />
            <LeftSideThumbnails />

            <div className="relative flex items-start">
                <div className="relative w-full max-w-3xl">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 rounded-3xl blur opacity-60"></div>
                    
                    <div className="p-px rounded-2xl comet-container">
                        <div className="relative bg-black/70 backdrop-blur-xl rounded-[15px] shadow-2xl p-8 text-gray-200 flex flex-col box-border">
                            <header className="flex justify-between items-center mb-5 text-sm">
                                <div className="text-gray-400 truncate max-w-xs h-5 flex items-center">
                                    {isGeneratingTitle 
                                        ? <span className="italic">Generating title...</span>
                                        : (generatedTitle || prompt || 'New Presentation')}
                                </div>
                                <div className="text-gray-400">All changes saved</div>
                            </header>

                            <section className="flex justify-center items-center gap-4 mb-8">
                                <span className="text-6xl" role="img" aria-label="Nano Banana Icon">🍌</span>
                                <div className="flex flex-col items-center">
                                    <h1 className="text-5xl font-bold text-gray-100 tracking-wider">
                                        AI SLIDES
                                    </h1>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mt-1">
                                        POWERED BY NANO BANANA
                                    </p>
                                </div>
                            </section>

                            <section className="flex flex-col gap-4 mb-8">
                                <label htmlFor="prompt-input" className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">
                                    WHAT DO YOU WANT TO CREATE?
                                </label>
                                <div className="relative p-px rounded-lg bg-gradient-to-r from-white/10 to-transparent focus-within:from-cyan-400 focus-within:to-blue-500 transition-colors duration-300">
                                    <div className="relative flex items-start bg-[#0d1117] rounded-[7px] p-3">
                                        {prompt === '' && (
                                            <div className="absolute inset-3 text-lg text-gray-500 pointer-events-none leading-snug" aria-hidden="true">
                                                {animatedPlaceholder}
                                                <span className="animate-blink opacity-100">|</span>
                                            </div>
                                        )}
                                        <textarea
                                            id="prompt-input"
                                            rows={3}
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                            placeholder=""
                                            className="w-full bg-transparent border-none outline-none text-gray-100 text-lg placeholder:text-transparent resize-none leading-snug pr-20 relative z-10"
                                        />
                                        <div className="absolute right-3 top-3 flex items-center gap-3 z-10">
                                            <button onClick={handleFileIconClick} aria-label="Upload files">
                                                <FileIcon className="w-6 h-6 cursor-pointer text-gray-400 hover:text-white transition-colors flex-shrink-0" />
                                            </button>
                                            <button aria-label="Dictate input">
                                                <MicIcon className="w-6 h-6 cursor-pointer text-gray-400 hover:text-white transition-colors flex-shrink-0" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {uploadedFiles.length > 0 && (
                                <section className="mb-8">
                                    <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1 mb-4">
                                        UPLOADED FILES
                                    </h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                        {uploadedFiles.map(file => (
                                            file.url ? (
                                                <ImageFileCard
                                                    key={file.id}
                                                    imageSrc={file.url}
                                                    altText={file.name}
                                                    name={file.name}
                                                    onRemove={() => handleRemoveFile(file.id)}
                                                />
                                            ) : (
                                                <FileCard
                                                    key={file.id}
                                                    icon={file.type.includes('pdf') ? <DocumentTextIcon /> : <FileTextIcon />}
                                                    name={file.name}
                                                    onRemove={() => handleRemoveFile(file.id)}
                                                />
                                            )
                                        ))}
                                    </div>
                                </section>
                            )}
                            
                            <button className="w-4/5 self-center bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold text-lg py-4 rounded-lg uppercase tracking-wider animate-pulse-glow hover:-translate-y-0.5 transition-transform duration-300 mt-auto">
                                Generate Presentation
                            </button>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:flex flex-col gap-4 ml-8">
                    <FileCard icon={<DocumentTextIcon />} name="report.pdf" onRemove={()=>{}}/>
                    <FileCard icon={<FileTextIcon />} name="data.csv" onRemove={()=>{}}/>
                    <ImageFileCard 
                        imageSrc="https://picsum.photos/seed/meeting/100/60" 
                        altText="Meeting Image" 
                        name="Meeting Notes"
                        onRemove={()=>{}}
                    />
                </div>
            </div>
        </main>
    );
};

export default App;