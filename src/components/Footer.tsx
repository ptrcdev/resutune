
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-12 border-t border-gray-200 dark:border-gray-800">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
              ResuTune
            </h3>
            <p className="text-muted-foreground text-sm">
              AI-powered resume analysis to help you land your dream job
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Features</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Resume Analysis</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">ATS Optimization</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Content Improvement</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Formatting Advice</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Resume Templates</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Career Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Interview Tips</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Job Search Guide</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ResuTune. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
