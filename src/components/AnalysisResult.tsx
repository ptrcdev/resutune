"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ResumeAnalysisResult } from "@/utils/resumeAnalysis";
import ReactMarkdown from "react-markdown";

interface AnalysisResultProps {
  results: ResumeAnalysisResult;
  isVisible: boolean;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ results, isVisible }) => {
  // Use overallScore from results
  const overallScore = results.overallScore;

  // Use the sections array directly from results
  const sections = results.sections;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScoreText = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Very Good";
    if (score >= 70) return "Good";
    if (score >= 60) return "Average";
    if (score >= 50) return "Below Average";
    return "Needs Improvement";
  };

  return (
    <div
      className={cn(
        "w-full max-w-3xl mx-auto px-4 transition-all duration-500 ease-out transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      )}
    >
      <div className="glass-morphism rounded-2xl p-8 shadow-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Resume Analysis Results</h2>
          <p className="text-muted-foreground">
            Based on professional resume standards and industry best practices
          </p>
        </div>

        {/* Overall Score */}
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="relative w-48 h-48 mb-6">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-gray-200 dark:text-gray-800"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
              <circle
                className={cn(getProgressColor(overallScore))}
                strokeWidth="8"
                strokeDasharray={`${overallScore * 2.51} 251.2`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={cn("text-4xl font-bold", getScoreColor(overallScore))}>
                {overallScore}
              </span>
              <span className="text-sm font-medium text-muted-foreground">Out of 100</span>
            </div>
          </div>
          
          <h3 className={cn("text-xl font-bold mb-1", getScoreColor(overallScore))}>
            {getScoreText(overallScore)}
          </h3>
          <p className="text-center text-muted-foreground max-w-md">
            {overallScore >= 80 
              ? "Your resume is well-optimized and follows best practices. With a few tweaks, it can be even better!"
              : overallScore >= 60
                ? "Your resume meets basic standards but has room for improvement in several key areas."
                : "Your resume needs significant improvements to meet professional standards."}
          </p>
        </div>
        
        <Separator className="my-8" />
        
        {/* Detailed Breakdown */}
        <div className="space-y-8">
          <h3 className="text-xl font-bold">Detailed Breakdown</h3>
          <div className="grid gap-6">
            {sections.map((section, index) => (
              <div 
                key={index} 
                className="p-4 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{section.name}</h4>
                  <span className={cn("font-bold", getScoreColor(section.score))}>
                    {section.score}/100
                  </span>
                </div>
                <Progress 
                  value={section.score} 
                  className="h-2 mb-3" 
                />
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <Separator className="my-8" />
        
        {/* Improvement Suggestions */}
        <div className="space-y-8">
          <h3 className="text-xl font-bold">Improvement Suggestions</h3>
          {results.suggestions.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-6">
              <h4 className="text-lg font-semibold mb-2">{group.category}</h4>
              <ul className="space-y-2">
                {group.suggestions.map((sugg, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    <span className="font-bold">{sugg.priority.toUpperCase()}:</span> {sugg.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <Separator className="my-8" />
        
        {/* OpenAI Feedback */}
        <div>
          <h3 className="text-xl font-bold mb-2">OpenAI Feedback</h3>
          <ReactMarkdown>
            {results.openai_feedback}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
