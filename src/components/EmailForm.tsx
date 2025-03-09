
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CircleCheck, Loader2 } from 'lucide-react';
import Transition from './Transition';

interface EmailFormData {
  recipientName: string;
  recipientCompany: string;
  recipientPosition: string;
  purpose: string;
  tone: string;
  additionalInfo: string;
}

interface EmailFormProps {
  onSubmit: (data: EmailFormData) => void;
  isGenerating: boolean;
}

const EmailForm: React.FC<EmailFormProps> = ({ onSubmit, isGenerating }) => {
  const [formData, setFormData] = useState<EmailFormData>({
    recipientName: '',
    recipientCompany: '',
    recipientPosition: '',
    purpose: '',
    tone: 'professional',
    additionalInfo: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Transition type="fade-up" delay={300}>
      <div className="glass-panel rounded-xl p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="recipientName" className="form-label">Recipient Name</Label>
                <Input
                  id="recipientName"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="form-input"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="recipientCompany" className="form-label">Company</Label>
                <Input
                  id="recipientCompany"
                  name="recipientCompany"
                  value={formData.recipientCompany}
                  onChange={handleChange}
                  placeholder="Acme Inc."
                  className="form-input"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="recipientPosition" className="form-label">Position</Label>
                <Input
                  id="recipientPosition"
                  name="recipientPosition"
                  value={formData.recipientPosition}
                  onChange={handleChange}
                  placeholder="Marketing Director"
                  className="form-input"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="purpose" className="form-label">Email Purpose</Label>
                <Select
                  value={formData.purpose}
                  onValueChange={(value) => handleSelectChange('purpose', value)}
                >
                  <SelectTrigger id="purpose" className="form-input">
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">Sales Outreach</SelectItem>
                    <SelectItem value="partnership">Partnership Proposal</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                    <SelectItem value="introduction">Introduction</SelectItem>
                    <SelectItem value="networking">Networking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="tone" className="form-label">Email Tone</Label>
                <Select
                  value={formData.tone}
                  onValueChange={(value) => handleSelectChange('tone', value)}
                >
                  <SelectTrigger id="tone" className="form-input">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="persuasive">Persuasive</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="additionalInfo" className="form-label">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  placeholder="Any specific details you'd like to include..."
                  className="form-input resize-none min-h-[80px]"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="button-primary"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Email...
                </>
              ) : (
                <>
                  <CircleCheck className="mr-2 h-4 w-4" />
                  Generate Email
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </Transition>
  );
};

export default EmailForm;
