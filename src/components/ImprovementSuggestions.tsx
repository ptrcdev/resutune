
import React from 'react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, CheckCircle, ChevronRight } from 'lucide-react';

interface Suggestion {
  category: string;
  suggestions: {
    text: string;
    priority: 'high' | 'medium' | 'low';
  }[];
}

interface ImprovementSuggestionsProps {
  suggestions: Suggestion[];
  isVisible: boolean;
}

const ImprovementSuggestions: React.FC<ImprovementSuggestionsProps> = ({ suggestions, isVisible }) => {
  return (
    <div
      className={cn(
        "w-full max-w-3xl mx-auto px-4 py-16 transition-all duration-500 ease-out transform",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      )}
    >
      <div className="glass-morphism rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Improvement Suggestions</h2>
          <p className="text-muted-foreground">
            Actionable recommendations to enhance your resume
          </p>
        </div>

        <div className="space-y-8">
          {suggestions.map((category, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-xl font-bold flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2">
                  {index + 1}
                </span>
                {category.category}
              </h3>
              
              <div className="space-y-4 pl-10">
                {category.suggestions.map((suggestion, idx) => (
                  <div 
                    key={idx}
                    className={cn(
                      "p-4 rounded-lg border flex items-start gap-3 transition-all hover:shadow-md",
                      suggestion.priority === 'high' 
                        ? "border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-900/10" 
                        : suggestion.priority === 'medium'
                          ? "border-yellow-200 bg-yellow-50 dark:border-yellow-900/50 dark:bg-yellow-900/10"
                          : "border-green-200 bg-green-50 dark:border-green-900/50 dark:bg-green-900/10"
                    )}
                  >
                    <div className="flex-shrink-0 mt-1">
                      {suggestion.priority === 'high' ? (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      ) : suggestion.priority === 'medium' ? (
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span 
                          className={cn(
                            "text-xs font-medium px-2 py-0.5 rounded-full",
                            suggestion.priority === 'high' 
                              ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" 
                              : suggestion.priority === 'medium'
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          )}
                        >
                          {suggestion.priority.toUpperCase()} PRIORITY
                        </span>
                      </div>
                      <p className="text-sm">{suggestion.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {index < suggestions.length - 1 && <Separator className="my-6" />}
            </div>
          ))}
        </div>
        
        <div className="mt-10 p-4 rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-900/10">
          <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Pro Tip
          </h4>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Consider tailoring your resume for each job application by matching keywords from the job description. 
            This can significantly improve your chances of passing through Applicant Tracking Systems (ATS).
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImprovementSuggestions;
