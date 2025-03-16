
import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ResumeUpload from '@/components/ResumeUpload';
import AnalysisResult from '@/components/AnalysisResult';
import ImprovementSuggestions from '@/components/ImprovementSuggestions';
import Footer from '@/components/Footer';

const Index = () => {
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);

  const handleAnalysisComplete = (results: any) => {
    setAnalysisResults(results);
    setShowResults(true);
    
    // Scroll to results with a small delay to ensure components are rendered
    setTimeout(() => {
      const resultsSection = document.getElementById('results');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <Hero />
        
        <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                Features
              </span>
              <h2 className="text-3xl font-bold mt-4 mb-4">Comprehensive Resume Analysis</h2>
              <p className="text-muted-foreground text-lg">
                Our AI analyzes every aspect of your resume to give you actionable insights
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "ATS Compatibility",
                  description: "Ensure your resume passes through Applicant Tracking Systems with optimized formatting and keywords.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  delay: "0s"
                },
                {
                  title: "Content Quality Analysis",
                  description: "Receive feedback on your word choice, achievement statements, and overall content impact.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  ),
                  delay: "0.2s"
                },
                {
                  title: "Formatting Evaluation",
                  description: "Get insights on layout, spacing, font choices, and visual hierarchy to improve readability.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  ),
                  delay: "0.4s"
                },
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-up"
                  style={{ animationDelay: feature.delay, animationFillMode: 'both' }}
                >
                  <div className="w-16 h-16 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section id="how-it-works" className="py-24">
          <div className="container px-4 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                Process
              </span>
              <h2 className="text-3xl font-bold mt-4 mb-4">How It Works</h2>
              <p className="text-muted-foreground text-lg">
                Get actionable insights in three simple steps
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: "1",
                  title: "Upload Your Resume",
                  description: "Upload your resume in PDF, DOCX, or TXT format, or copy and paste your resume text directly.",
                },
                {
                  step: "2",
                  title: "AI Analysis",
                  description: "Our AI engine analyzes your resume against professional standards and industry best practices.",
                },
                {
                  step: "3",
                  title: "Get Detailed Feedback",
                  description: "Receive a comprehensive report with actionable recommendations to improve your resume.",
                }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="relative animate-fade-up"
                  style={{ animationDelay: `${index * 0.2}s`, animationFillMode: 'both' }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold mb-6">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                  
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <svg className="w-8 h-8 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <ResumeUpload onAnalysisComplete={handleAnalysisComplete} />
        
        <div id="results" className="py-8">
          {analysisResults && (
            <>
              <AnalysisResult 
                results={analysisResults} 
                isVisible={showResults} 
              />
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
