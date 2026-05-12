"use client";
import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';

export default function ContactPage() {
  return (
    <div className="flex flex-col bg-[var(--surface-secondary)] min-h-screen">
      {/* Page Banner */}
      <section className="bg-[var(--surface-primary)] border-b border-[var(--color-neutral-200)] py-16 text-center">
        <div className="mx-auto max-w-[var(--max-content-width)] px-[var(--space-4)]">
          <h1 className="text-4xl font-bold text-[var(--text-primary)]">Contact Us</h1>
          <p className="mt-4 text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            Have questions or need support? We're here to help. Reach out to our team.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-[var(--max-content-width)] px-[var(--space-4)] md:px-[var(--space-8)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div className="flex flex-col space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Get in Touch</h2>
                <p className="text-[var(--text-secondary)] mb-8">
                  Whether you're looking for answers, would like to solve a problem, or just want to let us know how we did, you'll find many ways to contact us right here.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-600)]">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">Email</h3>
                    <p className="mt-1 text-[var(--text-secondary)]">support@infoshare.example.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-600)]">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">Phone</h3>
                    <p className="mt-1 text-[var(--text-secondary)]">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-600)]">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">Office</h3>
                    <p className="mt-1 text-[var(--text-secondary)]">123 Tech Boulevard<br />San Francisco, CA 94105</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[var(--surface-primary)] p-8 rounded-[var(--radius-2xl)] shadow-[var(--shadow-lg)] border border-[var(--color-neutral-200)]">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Send us a Message</h2>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <Input label="Full Name" placeholder="John Doe" />
                <Input label="Email Address" type="email" placeholder="john@example.com" />
                <Input label="Subject" placeholder="How can we help you?" />
                
                <div className="flex flex-col space-y-[var(--space-1)]">
                  <label className="text-[var(--text-sm)] font-medium text-[var(--text-primary)]">
                    Message
                  </label>
                  <textarea 
                    className="flex min-h-[120px] w-full rounded-[var(--radius-md)] border border-[var(--color-neutral-300)] bg-[var(--surface-primary)] px-[var(--space-3)] py-[var(--space-2)] text-[var(--text-sm)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] placeholder:text-[var(--text-muted)] resize-y"
                    placeholder="Describe your issue or question..."
                  />
                </div>

                <Button fullWidth size="lg" className="mt-4">
                  Send Message
                </Button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
