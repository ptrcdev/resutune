// utils/resumeAnalysis.ts

export interface ResumeAnalysisResult {
  overallScore: number;
  sections: {
    name: string;
    score: number;
    description: string;
  }[];
  suggestions: {
    category: string;
    suggestions: {
      text: string;
      priority: "high" | "medium" | "low";
    }[];
  }[];
  openai_feedback: string;
}

const API_URL = import.meta.env.VITE_NESTJS_API_URL;
const PYTHON_API_URL = import.meta.env.VITE_PYTHON_API_URL;
/**
 * Calls the backend API to analyze a resume against a job description.
 * 
 * If a file is provided, it sends a FormData payload to the NestJS API endpoint
 * (which will parse the file). Otherwise, it sends the resume text as JSON.
 * 
 * @param file - The resume file (if provided).
 * @param jobText - The full text of the job description.
 * @param resumeText - The resume text (used when no file is provided).
 * @returns A promise that resolves to a ResumeAnalysisResult.
 */
export const analyzeResume = async (
  file: File | null,
  jobText: string,
  resumeText?: string | null,
): Promise<ResumeAnalysisResult> => {
  let response;

  if (file) {
    // If a file is uploaded, send it to the NestJS API which will parse the file content.
    const formData = new FormData();
    formData.append("file", file);
    formData.append("jobText", jobText);

    response = await fetch(API_URL + "/upload", {
      method: "POST",
      body: formData,
    });
  } else {
    // Otherwise, send the pasted resume text directly to the FastAPI analysis endpoint.
    response = await fetch(PYTHON_API_URL + "/analyze-resume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resume_text: resumeText,
        job_text: jobText,
      }),
    });
  }

  if (!response.ok) {
    throw new Error("Failed to analyze resume");
  }
  
  const data = await response.json();
  console.log("Raw API response:", data);

  // Transform the API response into the ResumeAnalysisResult structure
  const overallScore = data.total_score || 0;
  const sections = Object.entries(data.spacy_analysis.scores || {}).map(([key, score]) => {
    let description = "";
    switch (key) {
      case "formatting":
        description = "Measures the visual layout and consistency of your resume.";
        break;
      case "content_quality":
        description = "Evaluates the depth, clarity, and impact of your resume content.";
        break;
      case "structure":
        description = "Assesses the logical organization and sectioning of your resume.";
        break;
      case "keyword_optimization":
        description = "Determines the presence of job-relevant keywords.";
        break;
      case "readability":
        description = "Analyzes how easily your resume can be read.";
        break;
      case "achievements":
        description = "Evaluates how effectively your achievements are quantified.";
        break;
      case "professionalism":
        description = "Assesses the tone and overall professional presentation.";
        break;
      default:
        description = "";
    }
    return {
      name: key.charAt(0).toUpperCase() + key.slice(1),
      score: Number(score),
      description,
    };
  });

  return {
    overallScore,
    sections,
    suggestions: data.suggestions || [],
    openai_feedback: data.openai_feedback || "",
  };
};
