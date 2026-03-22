import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import SEO from '../components/seo/SEO';
import { Send, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface QuoteFormData {
  email: string;
  fullName: string;
  phone: string;
  location: string;
  businessName: string;
  services: string[];
  businessDescription: string;
  existingIdentity: string;
  budgetRange: string;
  customBudget?: string;
  timeline: string;
  contactMethod: string;
  hasAdditionalInfo: string;
  additionalInfoDetails?: string;
}

const CustomQuotePage: React.FC = () => {
  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm<QuoteFormData>();
  const [isSuccess, setIsSuccess] = useState(false);

  const budgetRange = watch('budgetRange');
  const hasAdditionalInfo = watch('hasAdditionalInfo');

  const onSubmit = async (data: QuoteFormData) => {
    try {
      const budgetDisplay = data.budgetRange === 'Other' ? data.customBudget : data.budgetRange;
      
      const detailedMessage = `📍 Location: ${data.location}
📦 Business Description: ${data.businessDescription}
🎨 Existing Identity: ${data.existingIdentity}
💰 Budget: ${budgetDisplay}
⏳ Timeline: ${data.timeline}
📞 Preferred Contact: ${data.contactMethod}

📝 Additional Info:
${data.hasAdditionalInfo === 'Yes' && data.additionalInfoDetails ? data.additionalInfoDetails : 'None'}`;

      const { error: supabaseError } = await supabase
        .from('leads')
        .insert([{
            name: data.fullName,
            email: data.email,
            phone: data.phone,
            company_name: data.businessName,
            service: data.services.join(', '),
            source: 'Custom Quote Form',
            message: detailedMessage,
            status: 'new'
        }]);

      if (supabaseError) throw new Error('Failed to submit');

      setIsSuccess(true);
      reset();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      alert("Oops! Something went wrong saving your inquiry. Please try again.");
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-brand-ivory pt-32 pb-24 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 text-center shadow-sm">
          <div className="w-16 h-16 bg-brand-pink/10 rounded-full flex items-center justify-center mx-auto mb-6">
             <CheckCircle className="text-brand-pink w-8 h-8" />
          </div>
          <h2 className="font-serif text-3xl text-brand-dark mb-4">Inquiry Received</h2>
          <p className="text-brand-muted mb-8">
            Thank you for reaching out! A team member will get back to you within 24–48 hours to discuss next steps.
          </p>
          <button 
            onClick={() => setIsSuccess(false)}
            className="px-8 py-3 bg-brand-dark text-white rounded-full hover:bg-brand-pink transition-colors w-full"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-ivory pt-32 pb-24">
      <SEO 
        title="Request Custom Quote | Branded By Winni" 
        description="Request a custom quote for branding, graphic design, and web design."
        url="/custom-quote" 
      />
      
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="mb-12 text-center md:text-left">
          <h1 className="font-serif text-4xl md:text-5xl text-brand-dark mb-4">ENQUIRY FORM</h1>
          <p className="text-brand-muted text-lg">
            Please ensure to fill out this form correctly and openly as possible. A team member will get back to you within 24–48 hours to discuss next steps. We can't wait to have you onboard.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-brand-dark/10 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-2">Your full name *</label>
              <input 
                {...register("fullName", { required: "Full name is required" })}
                className="w-full px-4 py-3 rounded-lg border border-brand-dark/20 focus:outline-none focus:border-brand-pink bg-transparent"
                placeholder="Jane Doe"
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-2">Email *</label>
              <input 
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-3 rounded-lg border border-brand-dark/20 focus:outline-none focus:border-brand-pink bg-transparent"
                placeholder="jane@example.com"
              />
              <p className="text-xs text-brand-muted mt-1">This form is collecting email addresses.</p>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-2">Phone Number (WhatsApp) *</label>
              <input 
                {...register("phone", { required: "Phone number is required" })}
                className="w-full px-4 py-3 rounded-lg border border-brand-dark/20 focus:outline-none focus:border-brand-pink bg-transparent"
                placeholder="+233 50 123 4567"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-2">Location (Country/City) *</label>
              <input 
                {...register("location", { required: "Location is required" })}
                className="w-full px-4 py-3 rounded-lg border border-brand-dark/20 focus:outline-none focus:border-brand-pink bg-transparent"
                placeholder="Accra, Ghana"
              />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-dark mb-2">What is your Brand's/Business name? *</label>
            <input 
              {...register("businessName", { required: "Business name is required" })}
              className="w-full px-4 py-3 rounded-lg border border-brand-dark/20 focus:outline-none focus:border-brand-pink bg-transparent"
              placeholder="e.g. Branded By Winni"
            />
            {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-dark mb-3">What service(s) are you looking for? *</label>
            <div className="space-y-3">
              {[
                "Website Design",
                "Website maintenance and optimization",
                "Landing Page(only) design",
                "Branding package",
                "Single design service(eg. Logo, flyer etc)"
              ].map(opt => (
                <label key={opt} className="flex items-start gap-3 cursor-pointer">
                   <input 
                     type="checkbox" 
                     value={opt} 
                     {...register("services", { required: "Please select at least one service" })}
                     className="mt-1 text-brand-pink focus:ring-brand-pink border-brand-dark/20 rounded"
                   />
                   <span className="text-brand-dark">{opt}</span>
                </label>
              ))}
            </div>
            {errors.services && <p className="text-red-500 text-xs mt-2">{errors.services.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-dark mb-2">What does your Business sell or plan to sell/ what is it about? *</label>
            <textarea 
              {...register("businessDescription", { required: "This field is required" })}
              className="w-full px-4 py-3 rounded-lg border border-brand-dark/20 focus:outline-none focus:border-brand-pink bg-transparent resize-y h-24"
              placeholder="Tell us about your products, services, and target audience..."
            />
            {errors.businessDescription && <p className="text-red-500 text-xs mt-1">{errors.businessDescription.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-dark mb-3">Do you have an existing brand identity? *</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="Yes" {...register("existingIdentity", { required: "Required" })} className="text-brand-pink focus:ring-brand-pink" />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="No" {...register("existingIdentity", { required: "Required" })} className="text-brand-pink focus:ring-brand-pink" />
                <span>No</span>
              </label>
            </div>
            {errors.existingIdentity && <p className="text-red-500 text-xs mt-1">{errors.existingIdentity.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-dark mb-3">What is your budget range? *</label>
            <div className="space-y-3">
              {[
                "50gh - 1,000gh",
                "1,500gh - 3,000gh",
                "3,000gh - 7,000gh",
                "Other"
              ].map(opt => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                   <input 
                     type="radio" 
                     value={opt} 
                     {...register("budgetRange", { required: "Please select a budget range" })}
                     className="text-brand-pink focus:ring-brand-pink"
                   />
                   <span className="text-brand-dark">{opt}</span>
                </label>
              ))}
            </div>
            {errors.budgetRange && <p className="text-red-500 text-xs mt-2">{errors.budgetRange.message}</p>}
            
            {budgetRange === 'Other' && (
              <div className="mt-3">
                 <input 
                  {...register("customBudget", { required: budgetRange === "Other" ? "Please specify your budget" : false })}
                  className="w-full px-4 py-3 rounded-lg border border-brand-dark/20 focus:outline-none focus:border-brand-pink bg-transparent"
                  placeholder="Specify your budget..."
                />
                {errors.customBudget && <p className="text-red-500 text-xs mt-1">{errors.customBudget.message}</p>}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-dark mb-3">When do you want the project completed? *</label>
            <div className="space-y-3">
              {["1 - 2 weeks", "3 - 4 weeks", "Flexible"].map(opt => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                   <input type="radio" value={opt} {...register("timeline", { required: "Select a timeline" })} className="text-brand-pink focus:ring-brand-pink" />
                   <span className="text-brand-dark">{opt}</span>
                </label>
              ))}
            </div>
            {errors.timeline && <p className="text-red-500 text-xs mt-2">{errors.timeline.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-dark mb-3">What is your preferred contact method? *</label>
            <div className="space-y-3">
              {["WhatsApp", "Email"].map(opt => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                   <input type="radio" value={opt} {...register("contactMethod", { required: "Select a contact method" })} className="text-brand-pink focus:ring-brand-pink" />
                   <span className="text-brand-dark">{opt}</span>
                </label>
              ))}
            </div>
            {errors.contactMethod && <p className="text-red-500 text-xs mt-2">{errors.contactMethod.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-dark mb-3">Any additional information you would like to share?</label>
            <div className="flex gap-6 mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="Yes" {...register("hasAdditionalInfo")} className="text-brand-pink focus:ring-brand-pink" />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="No" {...register("hasAdditionalInfo")} className="text-brand-pink focus:ring-brand-pink" />
                <span>No</span>
              </label>
            </div>
            {hasAdditionalInfo === 'Yes' && (
              <textarea 
                {...register("additionalInfoDetails")}
                className="w-full px-4 py-3 rounded-lg border border-brand-dark/20 focus:outline-none focus:border-brand-pink bg-transparent resize-y h-24"
                placeholder="Please share any other details here..."
              />
            )}
          </div>

          <div className="pt-6 border-t border-brand-dark/10">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-10 py-4 bg-brand-pink text-white rounded-full hover:bg-brand-dark transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {isSubmitting ? 'Submitting...' : (
                <>
                  <Send size={18} />
                  Submit Enquiry
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomQuotePage;
