export interface ServiceOption {
  id: string;
  name: string;
  price: number;
}

export interface ServiceProduct {
  id: string;
  slug: string;
  title: string;
  basePrice: number;
  description: string;
  whatYouGet: string;
  features: string[];
  options?: ServiceOption[];
  iconType: 'Monitor' | 'Settings' | 'TrendingUp' | 'PenTool';
  imageUrl: string;
}

export const servicesData: ServiceProduct[] = [
  {
    id: 'custom-logo-branding',
    slug: 'custom-logo-suite-branding',
    title: 'Custom Logo Suite & Branding',
    basePrice: 1500,
    iconType: 'PenTool',
    description: 'Professional logo design and complete branding package for businesses in Ghana. We create memorable brand identities that help your business stand out and build trust with customers.',
    whatYouGet: 'A polished, professional brand identity that commands authority and builds immediate trust with your audience.',
    features: ['Logo Design & Variations', 'Curated Color Palettes', 'Typography Systems', 'Brand Style Guidelines'],
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'e-flyer',
    slug: 'e-flyer-design',
    title: 'E-Flyer Design',
    basePrice: 75,
    iconType: 'Monitor',
    description: 'High-quality digital flyer design services in Ghana. Perfect for promotions, events, and marketing campaigns. Professional graphic design that captures attention and drives engagement.',
    whatYouGet: 'A custom-designed, social media-ready digital flyer.',
    features: ['Custom Graphic Design', 'High-Resolution Export', 'Optimized for Social Media', '1 Revision Round'],
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'business-card',
    slug: 'business-card-design',
    title: 'Business Card Design',
    basePrice: 60,
    iconType: 'PenTool',
    description: 'Professional business card design services in Accra, Ghana. Create memorable business cards that leave a lasting impression and help you network effectively in your industry.',
    whatYouGet: 'A print-ready business card design tailored to your branding.',
    features: ['Double-sided Design', 'Print-ready PDF', 'Source File Inclusion', 'QR Code integration (optional)'],
    imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'product-label',
    slug: 'product-label-design',
    title: 'Product Label Design',
    basePrice: 200,
    iconType: 'Settings',
    description: 'Custom product label design for packaging in Ghana. Stand out on shelves with professional, eye-catching labels designed for food, beverage, skincare, and beauty products.',
    whatYouGet: 'Custom label design ready for printing on your physical products.',
    features: ['Custom Label Artwork', 'Print-Ready Formats', '3D Mockup included', 'Color & Typography Matching'],
    imageUrl: 'https://images.unsplash.com/photo-1614051034442-f8eb063cba8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'thank-you-card',
    slug: 'thank-you-card-design',
    title: 'Thank You Card Design',
    basePrice: 50,
    iconType: 'PenTool',
    description: 'Show your customers you care. A beautifully designed thank-you card inserted into your packages improves customer retention and encourages reviews.',
    whatYouGet: 'A personalized thank-you card design ready for print.',
    features: ['Brand-aligned design', 'Custom Message Layout', 'Social Media Handles integration', 'Print-Ready Format'],
    imageUrl: 'https://images.unsplash.com/photo-1534005111244-933df3724c96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'content-package',
    slug: 'content-package',
    title: 'Monthly Content Package',
    basePrice: 120, // Default to lowest
    iconType: 'TrendingUp',
    description: 'Consistent, high-quality content for your brand. Keeps your audience engaged and establishes your authority without you lifting a finger.',
    whatYouGet: 'A batch of professionally designed social media posts and/or copy ready for scheduling.',
    features: ['Custom Branded Graphics', 'Engaging Captions', 'Hashtag Strategy', 'Content Calendar Delivery'],
    options: [
      { id: 'content-basic', name: 'Basic (Few Posts)', price: 120 },
      { id: 'content-standard', name: 'Standard (Moderate Posts)', price: 250 },
      { id: 'content-premium', name: 'Premium (High Volume)', price: 500 },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  }
];
