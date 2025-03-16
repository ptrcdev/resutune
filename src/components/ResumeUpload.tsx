
"use client";

import React, { useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { analyzeResume } from "@/utils/resumeAnalysis"; // This calls your API
// Assume AnalysisResult and ImprovementSuggestions are rendered in a parent component (or separately)

interface ResumeUploadProps {
  onAnalysisComplete: (results: any) => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onAnalysisComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const droppedFile = files[0];
      validateAndSetFile(droppedFile);
    }
  }, []);

  const validateAndSetFile = (file: File) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain"
    ];

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOCX, or TXT file.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    setFile(file);
    toast({
      title: "File added",
      description: `${file.name} is ready for analysis.`,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      validateAndSetFile(files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (activeTab === "upload" && !file) {
      toast({
        title: "No file selected",
        description: "Please upload a resume file or paste resume text.",
        variant: "destructive",
      });
      return;
    }

    if (activeTab === "paste" && !resumeText.trim()) {
      toast({
        title: "No text provided",
        description: "Please paste your resume text.",
        variant: "destructive",
      });
      return;
    }

    if (!jobDescription.trim()) {
      toast({
        title: "No job description provided",
        description: "Please paste the job description for better analysis.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // For TXT files, read text; for PDFs/DOCX, you may integrate a parser or simulate extraction
      if (activeTab === "upload" && file) {
        const results = await analyzeResume(file, jobDescription);
        toast({
          title: "Analysis complete",
          description: "Your resume has been analyzed successfully.",
        });
        onAnalysisComplete(results);
      }
      else {
        const results = await analyzeResume(null, jobDescription, resumeText);
        toast({
          title: "Analysis complete",
          description: "Your resume has been analyzed successfully.",
        });
        onAnalysisComplete(results);
      }
    } catch (err: any) {
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your resume. Please try again.",
        variant: "destructive",
      });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="upload" className="py-16 w-full max-w-3xl mx-auto px-4">
      <div className="text-center space-y-4 mb-10 animate-fade-up">
        <h2 className="text-3xl font-bold">Analyze Your Resume</h2>
        <p className="text-muted-foreground">
          Upload your resume and paste a job description to get personalized feedback
        </p>
      </div>

      <div className="glass-morphism rounded-2xl p-8 shadow-xl animate-scale-in">
        <Tabs defaultValue="upload" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upload">Upload File</TabsTrigger>
            <TabsTrigger value="paste">Paste Text</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <div
              className={cn(
                "border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200",
                isDragging
                  ? "border-primary bg-primary/5"
                  : file
                    ? "border-green-500 bg-green-50 dark:bg-green-900/10"
                    : "border-gray-300 hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-900/20"
              )}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
              />

              {file ? (
                <div className="space-y-2">
                  <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium">{file.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB · Click or drag to replace
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Drag & Drop your resume file</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Support for PDF, DOCX, and TXT files
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-4"
                  >
                    Browse Files
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="paste" className="space-y-4">
            <Textarea
              placeholder="Paste your resume text here..."
              className="min-h-[300px] resize-none"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Paste the full text of your resume for analysis. Include all sections, skills, and experience.
            </p>
          </TabsContent>

          <div className="mt-8 space-y-6">
            <div className="space-y-4">
              <label htmlFor="job-description" className="block text-sm font-medium">
                Job Description
              </label>
              <Textarea
                id="job-description"
                placeholder="Paste the job description here for better analysis..."
                className="min-h-[200px] resize-none"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Paste the job description to compare your resume against specific requirements.
              </p>
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Resume...
                </>
              ) : (
                "Analyze Resume"
              )}
            </Button>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ResumeUpload;
