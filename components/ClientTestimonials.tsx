import React from 'react';
import { Star, Quote } from 'lucide-react';

/**
 * Client Testimonials Component
 *
 * Social proof with real client reviews.
 */

type Testimonial = {
  name: string;
  business: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    name: 'Kwame Mensah',
    business: 'Terra Bite Restaurant',
    role: 'Founder & CEO',
    rating: 5,
    text: 'Branded By Winni transformed our entire brand identity. The flyers and social media content they created increased our bookings by 40% in just 2 months. Highly professional!',
    avatar: 'KM'
  },
  {
    name: 'Ama Owusu',
    business: 'Cynde Luxe',
    role: 'Creative Director',
    rating: 5,
    text: 'Working with Winni was a dream. She understood our luxury positioning perfectly and delivered a visual identity that feels premium. Our Instagram engagement tripled!',
    avatar: 'AO'
  },
  {
    name: 'David Asante',
    business: 'Buernix Tech',
    role: 'Co-Founder',
    rating: 5,
    text: "As a tech startup, we needed a modern brand that stood out. Winni delivered beyond expectations, with unlimited revisions, and a brand we're proud to show investors.",
    avatar: 'DA'
  },
  {
    name: 'Portia Martey',
    business: 'Personal Brand Consultant',
    role: 'Consultant',
    rating: 5,
    text: 'The personal branding package was exactly what I needed. Professional, sophisticated, and perfectly aligned with my values. I now feel confident presenting to high-profile clients.',
    avatar: 'PM'
  },
  {
    name: 'Kofi Adjei',
    business: 'Jollof Empire',
    role: 'Owner',
    rating: 5,
    text: "Our logo and branding materials are so good, customers often think we're a franchise. The attention to detail and creativity are unmatched. Worth every cedi.",
    avatar: 'KA'
  },
  {
    name: 'Sarah Boateng',
    business: 'Event Planning Co.',
    role: 'Managing Director',
    rating: 5,
    text: "Fast, professional, and incredibly creative. Winni designed all our marketing materials and the feedback from clients has been overwhelming. She's now our go-to designer.",
    avatar: 'SB'
  }
];

const ClientTestimonials: React.FC = () => {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-6 font-semibold">
            Client Love
          </h2>
          <p className="text-xl text-brand-text font-light leading-relaxed">
            Do not just take our word for it. Here is what our clients say about working with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-brand-ivory/50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-brand-pink/10 relative"
            >
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-16 h-16 text-brand-pink" />
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-brand-text leading-relaxed mb-6 relative z-10">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4 border-t border-brand-pink/10 pt-6">
                <div className="w-12 h-12 bg-brand-pink/20 rounded-full flex items-center justify-center text-sm font-semibold text-brand-dark">
                  {testimonial.avatar}
                </div>

                <div>
                  <div className="font-semibold text-brand-dark">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-brand-muted">
                    {testimonial.role}, {testimonial.business}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center bg-gradient-to-r from-brand-pink/10 via-brand-ivory to-brand-pink/10 rounded-2xl p-8">
          <p className="text-xl text-brand-dark mb-4 font-medium">
            Ready to join our happy clients?
          </p>
          <a
            href="https://wa.me/233244591777?text=Hi!%20I'd%20like%20to%20start%20my%20branding%20project"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-brand-dark text-white font-medium rounded-md hover:bg-brand-pink transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Let's Create Your Brand
          </a>
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonials;
