
import React, { useState } from 'react';
import Transition from './Transition';
import { Button } from "@/components/ui/button";
import { Copy, Check, Send, Download, RefreshCw } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface EmailPreviewProps {
  emailContent: string;
  onRegenerate: () => void;
  isLoading: boolean;
}

const EmailPreview: React.FC<EmailPreviewProps> = ({ 
  emailContent, 
  onRegenerate,
  isLoading
}) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(emailContent);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Email content has been copied to your clipboard.",
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([emailContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "cold-email-draft.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Email downloaded",
      description: "Your email draft has been downloaded as a text file.",
    });
  };

  // Mock function for send - in a real app, this would connect to backend
  const handleSend = () => {
    toast({
      title: "Feature coming soon",
      description: "Direct email sending will be available in the next update.",
    });
  };

  if (isLoading) {
    return (
      <Transition type="fade-up" delay={100}>
        <div className="glass-panel rounded-xl p-6 md:p-8 mt-8 min-h-[300px] flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block p-3 rounded-full bg-blue/10 mb-4">
              <RefreshCw className="w-6 h-6 text-blue animate-spin" />
            </div>
            <h3 className="text-xl font-medium">Crafting your perfect email...</h3>
            <p className="text-surface-foreground/70 mt-2">
              Our AI is working on your personalized email draft.
            </p>
          </div>
        </div>
      </Transition>
    );
  }

  if (!emailContent) {
    return null;
  }

  return (
    <Transition type="fade-up" delay={100}>
      <div className="glass-panel rounded-xl p-6 md:p-8 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-medium">Your Generated Email</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onRegenerate}
              className="text-xs"
            >
              <RefreshCw className="mr-1 h-3 w-3" />
              Regenerate
            </Button>
          </div>
        </div>
        
        <div className="bg-background rounded-lg p-5 mb-4 whitespace-pre-wrap text-sm leading-relaxed">
          {emailContent}
        </div>
        
        <div className="flex items-center justify-end space-x-3 mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCopy}
            className="button-secondary text-xs"
          >
            {copied ? <Check className="mr-1 h-3 w-3" /> : <Copy className="mr-1 h-3 w-3" />}
            {copied ? 'Copied' : 'Copy'}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownload}
            className="button-secondary text-xs"
          >
            <Download className="mr-1 h-3 w-3" />
            Download
          </Button>
          
          <Button 
            variant="default" 
            size="sm" 
            onClick={handleSend}
            className="button-primary text-xs"
          >
            <Send className="mr-1 h-3 w-3" />
            Send
          </Button>
        </div>
      </div>
    </Transition>
  );
};

export default EmailPreview;
