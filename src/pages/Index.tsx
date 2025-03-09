import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';
import EmailForm from '@/components/EmailForm';
import EmailPreview from '@/components/EmailPreview';
import Transition from '@/components/Transition';

interface EmailFormData {
  recipientName: string;
  recipientCompany: string;
  recipientPosition: string;
  purpose: string;
  tone: string;
  additionalInfo: string;
}

const Index = () => {
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFormSubmit = (data: EmailFormData) => {
    setIsGenerating(true);
    
    // Simulate API call to generate email
    setTimeout(() => {
      const sampleEmail = generateSampleEmail(data);
      setGeneratedEmail(sampleEmail);
      setIsGenerating(false);
    }, 2000);
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const data = {
        recipientName: 'Example',
        recipientCompany: 'Sample Inc.',
        recipientPosition: 'Manager',
        purpose: 'introduction',
        tone: 'professional',
        additionalInfo: 'This is a regenerated email with slightly different wording.'
      };
      const sampleEmail = generateSampleEmail(data);
      setGeneratedEmail(sampleEmail);
      setIsGenerating(false);
    }, 2000);
  };

  const generateSampleEmail = (data: EmailFormData): string => {
    const emails: Record<string, string> = {
      sales: `Subject: Innovative Solutions for ${data.recipientCompany}'s Growth

Dear ${data.recipientName},

I hope this email finds you well. I recently came across ${data.recipientCompany} and was impressed by your achievements in the industry, especially given your role as ${data.recipientPosition}.

Our company specializes in helping businesses like yours streamline operations and increase revenue through our proprietary technology solutions. We've helped similar companies in your industry achieve an average of 27% growth within the first six months.

${data.additionalInfo ? `${data.additionalInfo}\n\n` : ''}I'd love to schedule a brief 15-minute call to discuss how we might be able to help ${data.recipientCompany} reach its next level of success. Would you be available for a quick conversation next week?

Looking forward to connecting.

Best regards,
[Your Name]
[Your Position]
[Your Company]
[Contact Information]`,

      partnership: `Subject: Potential Partnership Opportunity - ${data.recipientCompany} and [Your Company]

Dear ${data.recipientName},

I hope this message finds you well. I'm reaching out because I believe there's a compelling opportunity for collaboration between ${data.recipientCompany} and [Your Company].

As ${data.recipientPosition} at ${data.recipientCompany}, I imagine you're always looking for strategic partnerships that can create mutual value. Our companies share complementary strengths, and I see significant potential for us to work together on joint initiatives.

${data.additionalInfo ? `${data.additionalInfo}\n\n` : ''}I'd like to explore how we might combine our resources to create something greater than the sum of its parts. Would you be open to a conversation about how a partnership might benefit both our organizations?

I look forward to hearing your thoughts.

Warm regards,
[Your Name]
[Your Position]
[Your Company]
[Contact Information]`,

      "follow-up": `Subject: Following Up - Our Previous Conversation about [Topic]

Dear ${data.recipientName},

I hope you've been well since our last exchange. I wanted to follow up on our previous conversation about how [Your Company] could support ${data.recipientCompany}'s initiatives.

Since we last spoke, we've launched a new [product/service] that aligns perfectly with the challenges you mentioned as ${data.recipientPosition}. I believe this could be particularly valuable for your team.

${data.additionalInfo ? `${data.additionalInfo}\n\n` : ''}I understand how busy you must be, but I'd appreciate the opportunity to continue our discussion. Would you be available for a brief call next week to explore this further?

Thank you for your time and consideration.

Best regards,
[Your Name]
[Your Position]
[Your Company]
[Contact Information]`,

      introduction: `Subject: Introduction - [Your Name] from [Your Company]

Dear ${data.recipientName},

I hope this email finds you well. My name is [Your Name] from [Your Company], and I recently learned about ${data.recipientCompany}'s impressive work in [relevant industry/achievement].

As someone who [brief description of your relevant background], I've been following your progress and am particularly impressed by [specific achievement or aspect of their company]. Your role as ${data.recipientPosition} must involve tackling some interesting challenges.

${data.additionalInfo ? `${data.additionalInfo}\n\n` : ''}I would love to connect and learn more about your work at ${data.recipientCompany}. Perhaps we could schedule a brief call at your convenience?

Looking forward to potentially connecting.

Warm regards,
[Your Name]
[Your Position]
[Your Company]
[Contact Information]`,

      networking: `Subject: Expanding Professional Network - [Your Industry] Professional

Dear ${data.recipientName},

I hope this message finds you well. I'm [Your Name], a fellow professional in the [your industry] space, and I'm reaching out to expand my professional network with visionary leaders like yourself.

Your work as ${data.recipientPosition} at ${data.recipientCompany} has caught my attention, particularly [mention something specific you admire about their work or company]. I believe there could be valuable insights we could share through a professional connection.

${data.additionalInfo ? `${data.additionalInfo}\n\n` : ''}Would you be open to connecting for a brief virtual coffee chat? I'd appreciate the opportunity to learn more about your journey and share perspectives on our industry.

Thank you for considering my invitation to connect.

Best regards,
[Your Name]
[Your Position]
[Your Company]
[Contact Information]`
    };

    // Return the relevant email or a default if the purpose isn't found
    return emails[data.purpose] || emails.introduction;
  };

  return (
    <div className="min-h-screen pb-16">
      <Header />
      
      <main className="container mt-8 md:mt-12">
        <div className="max-w-4xl mx-auto">
          <EmailForm onSubmit={handleFormSubmit} isGenerating={isGenerating} />
          
          <EmailPreview 
            emailContent={generatedEmail} 
            onRegenerate={handleRegenerate}
            isLoading={isGenerating}
          />
        </div>
        
        {generatedEmail && (
          <Transition type="fade-up" delay={400}>
            <div className="max-w-4xl mx-auto mt-16 text-center">
              <div className="bg-secondary rounded-full h-px my-8" />
              <h3 className="text-xl font-medium mb-4">Ready to send more personalized cold emails?</h3>
              <p className="text-surface-foreground/70 mb-6 max-w-2xl mx-auto">
                Connect your email provider to send emails directly from this platform. 
                Coming soon: Templates, scheduling, and performance tracking.
              </p>
              <Button className="button-primary">
                Join Waitlist for Premium Features
              </Button>
            </div>
          </Transition>
        )}
      </main>
    </div>
  );
};

export default Index;
