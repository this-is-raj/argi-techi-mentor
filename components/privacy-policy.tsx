'use client';

import { useState } from 'react';
import { Shield, Lock, Eye, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('overview');

  const navigationSections = [
    { id: 'overview', label: 'Overview' },
    { id: 'collection', label: 'Data Collection' },
    { id: 'usage', label: 'Data Usage' },
    { id: 'disclosure', label: 'Data Disclosure' },
    { id: 'security', label: 'Security' },
    { id: 'rights', label: 'Your Rights' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Last updated: April 11, 2025. We are committed to protecting your privacy and ensuring the security of your personal information.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Lock className="w-4 h-4 text-green-600" />
                Policy Sections
              </h3>
              <nav className="space-y-2">
                {navigationSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                      activeSection === section.id
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      activeSection === section.id ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          
          <div className="lg:w-3/4">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              
              {activeSection === 'overview' && (
                <div className="animate-fadeIn">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Shield className="w-8 h-8 text-green-600" />
                    Privacy Policy Overview
                  </h2>
                  
                  <div className="prose prose-lg max-w-none">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                      <p className="text-blue-800 font-medium">
                        At TechieMentor International LLP, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          Our Commitment
                        </h3>
                        <p className="text-gray-600">
                          We operate in compliance with applicable Indian laws, including the Information Technology Act, 2000, and the Digital Personal Data Protection Act, 2023.
                        </p>
                      </div>
                      <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Eye className="w-5 h-5 text-green-600" />
                          Transparency
                        </h3>
                        <p className="text-gray-600">
                          We believe in being transparent about how we collect and use your data. This policy explains our practices in clear, simple language.
                        </p>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Scope</h3>
                    <p className="text-gray-600 mb-6">
                      This policy applies to all users of our website (www.agritechimentor.com), our services, and anyone who interacts with us through email, phone, or other channels. By using our services, you consent to the practices described here.
                    </p>
                  </div>
                </div>
              )}

              
              {activeSection === 'collection' && (
                <div className="animate-fadeIn">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Information We Collect</h2>
                  
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Mail className="w-6 h-6 text-green-600" />
                        Personal Information
                      </h3>
                      <p className="text-gray-600 mb-4">We collect information you voluntarily provide:</p>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span><strong>Contact Details:</strong> Name, email, phone number, company name, address</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span><strong>Business Information:</strong> Export inquiries, product preferences, shipping requirements</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span><strong>Usage Data:</strong> IP address, browser type, device information, analytics</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                      <h4 className="font-semibold text-amber-800 mb-2">Note on Sensitive Data</h4>
                      <p className="text-amber-700">
                        We do not collect sensitive personal data (e.g., racial or ethnic origin, religious beliefs) unless required for specific export compliance purposes.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              
              {activeSection === 'usage' && (
                <div className="animate-fadeIn">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">How We Use Your Information</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Service Delivery",
                        description: "Processing inquiries, orders, and exports of agricultural products"
                      },
                      {
                        title: "Communication",
                        description: "Updates, promotions, and customer support via email or phone"
                      },
                      {
                        title: "Analytics",
                        description: "Website usage analysis to enhance user experience"
                      },
                      {
                        title: "Legal Compliance",
                        description: "Meeting export regulations and certification requirements"
                      },
                      {
                        title: "Marketing",
                        description: "Sharing information about sustainable practices and new products"
                      },
                      {
                        title: "Retention",
                        description: "We retain data only as long as necessary for these purposes"
                      }
                    ].map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                          <span className="text-green-600 font-semibold">{index + 1}</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              
              {activeSection === 'disclosure' && (
                <div className="animate-fadeIn">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Disclosure of Your Information</h2>
                  
                  <div className="space-y-6">
                    <div className="border border-green-200 rounded-xl p-6 bg-green-50">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">When We Share Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">With Service Providers</h4>
                          <p className="text-gray-600 text-sm">Logistics partners, payment processors, analytics providers</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">With Authorities</h4>
                          <p className="text-gray-600 text-sm">For export compliance, legal requirements, or audits</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">With Partners</h4>
                          <p className="text-gray-600 text-sm">Fair trade initiatives and business collaborations</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Marketing</h4>
                          <p className="text-gray-600 text-sm">Only with your explicit consent for marketing purposes</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                      <h4 className="font-semibold text-blue-800 mb-2">Our Promise</h4>
                      <p className="text-blue-700">
                        We do not sell or rent your personal information to third parties for marketing without your explicit consent.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              
              {activeSection === 'security' && (
                <div className="animate-fadeIn">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Lock className="w-8 h-8 text-green-600" />
                    Security Measures
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Security Practices</h3>
                      <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Lock className="w-6 h-6 text-green-600" />
                          </div>
                          <h4 className="font-semibold text-gray-900">Encryption</h4>
                          <p className="text-gray-600 text-sm mt-1">Data encryption in transit and at rest</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Shield className="w-6 h-6 text-green-600" />
                          </div>
                          <h4 className="font-semibold text-gray-900">Firewalls</h4>
                          <p className="text-gray-600 text-sm mt-1">Advanced firewall protection</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Eye className="w-6 h-6 text-green-600" />
                          </div>
                          <h4 className="font-semibold text-gray-900">Access Control</h4>
                          <p className="text-gray-600 text-sm mt-1">Strict access controls and monitoring</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                      <h4 className="font-semibold text-amber-800 mb-2">Important Notice</h4>
                      <p className="text-amber-700 mb-3">
                        While we implement robust security measures, no online transmission is entirely secure. We cannot guarantee absolute security.
                      </p>
                      <p className="text-amber-700">
                        In case of a data breach, we will notify affected users as per legal requirements under Indian law.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              
              {activeSection === 'rights' && (
                <div className="animate-fadeIn">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Privacy Rights</h2>
                  
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">You Have the Right To:</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {[
                          { right: "Access", desc: "View the personal information we hold about you" },
                          { right: "Update", desc: "Correct inaccurate or incomplete information" },
                          { right: "Delete", desc: "Request deletion of your personal data" },
                          { right: "Opt-out", desc: "Unsubscribe from marketing communications" },
                          { right: "Withdraw Consent", desc: "Revoke previously given consent" },
                          { right: "Data Portability", desc: "Request a copy of your data in usable format" }
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold text-gray-900">{item.right}</h4>
                              <p className="text-gray-600 text-sm">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                      <h4 className="font-semibold text-green-800 mb-2">How to Exercise Your Rights</h4>
                      <p className="text-green-700 mb-3">
                        To exercise any of these rights, please contact us at techiementor.co@gmail.com. We will respond to your request within 30 days.
                      </p>
                      <p className="text-green-700">
                        Note: Withdrawing consent may limit our ability to provide certain services to you.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              
              {activeSection === 'contact' && (
                <div className="animate-fadeIn">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
                  
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Get In Touch</h3>
                      <p className="text-gray-600 mb-6">
                        If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <Mail className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Email</h4>
                            <p className="text-gray-600">techiementor.co@gmail.com</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <Phone className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Phone</h4>
                            <p className="text-gray-600">+91 9549235277</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg md:col-span-2">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Address</h4>
                            <p className="text-gray-600">
                              TechieMentor, E-9/508 Chitrakoot,<br />
                              Vaishali Nagar, Jaipur,<br />
                              Rajasthan, India - 302021
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                      <h4 className="font-semibold text-blue-800 mb-2">Policy Updates</h4>
                      <p className="text-blue-700">
                        We may update this Privacy Policy periodically. Changes will be posted on our website with the updated effective date. Continued use of our services constitutes acceptance of the revised policy.
                      </p>
                    </div>

                    <div className="text-center p-6 border border-gray-200 rounded-xl">
                      <p className="text-gray-600">
                        This policy is governed by the laws of India.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}