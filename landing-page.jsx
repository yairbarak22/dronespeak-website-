import React, { useState, useEffect } from 'react';
import { ChevronRightIcon, CheckIcon, PlayIcon, MapPinIcon, ShieldCheckIcon, TruckIcon, EyeIcon } from '@heroicons/react/24/outline';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentDemo, setCurrentDemo] = useState(0);
  
  useEffect(() => {
    setIsVisible(true);
    
    // Demo animation cycle
    const interval = setInterval(() => {
      setCurrentDemo((prev) => (prev + 1) % 3);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  const demoSteps = [
    {
      input: "Patrol the perimeter and check for security breaches",
      output: "✓ Route planned: 12 waypoints, 15min flight",
      language: "English"
    },
    {
      input: "בדוק את המבנה לנזילות ובעיות מבניות",
      output: "✓ תוכנן מסלול: סריקה אוטונומית, 20 דקות",
      language: "Hebrew"
    },
    {
      input: "Deliver package to warehouse sector B, avoid restricted zones",
      output: "✓ Optimized delivery route: 8min, obstacles avoided",
      language: "English"
    }
  ];

  const competitors = [
    {
      feature: "Natural Language Input",
      us: true,
      elbit: false,
      skydio: false,
      percepto: false
    },
    {
      feature: "Multi-language Support",
      us: true,
      elbit: false,
      skydio: false,
      percepto: false
    },
    {
      feature: "Works with Existing Drones",
      us: true,
      elbit: false,
      skydio: true,
      percepto: false
    },
    {
      feature: "Autonomous Re-planning",
      us: true,
      elbit: true,
      skydio: true,
      percepto: true
    },
    {
      feature: "Open API/SDK",
      us: true,
      elbit: false,
      skydio: false,
      percepto: false
    },
    {
      feature: "Setup Time",
      us: "<30 days",
      elbit: "3-6 months",
      skydio: "2-3 months",
      percepto: "1-2 months"
    },
    {
      feature: "Price Point",
      us: "Flexible",
      elbit: "Enterprise Only",
      skydio: "High",
      percepto: "High"
    }
  ];

  const useCases = [
    {
      icon: ShieldCheckIcon,
      title: "Security & Surveillance",
      description: "Automated perimeter monitoring, threat detection, and emergency response coordination",
      features: ["Real-time threat assessment", "Automated patrol routes", "Integration with security systems"]
    },
    {
      icon: EyeIcon,
      title: "Infrastructure Inspection",
      description: "Intelligent inspection of power lines, bridges, buildings, and industrial facilities",
      features: ["Defect detection AI", "Predictive maintenance", "Compliance reporting"]
    },
    {
      icon: TruckIcon,
      title: "Logistics & Delivery",
      description: "Autonomous package delivery and supply chain optimization",
      features: ["Route optimization", "Weather adaptation", "Real-time tracking"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-900">DroneSpeak</div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#demo" className="text-gray-600 hover:text-blue-900 px-3 py-2 text-sm font-medium">Demo</a>
                <a href="#features" className="text-gray-600 hover:text-blue-900 px-3 py-2 text-sm font-medium">Features</a>
                <a href="#use-cases" className="text-gray-600 hover:text-blue-900 px-3 py-2 text-sm font-medium">Use Cases</a>
                <a href="#contact" className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">Get Started</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Just tell the drone
              <span className="text-blue-900 block">what you want</span>
              <span className="text-gray-600 text-4xl md:text-5xl block mt-2">– it does the rest</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform any drone into an autonomous mission specialist with natural language commands. 
              No waypoint programming, no complex interfaces – just plain English or Hebrew.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-900 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-800 transition-all transform hover:scale-105 shadow-lg">
                Start Free Trial
                <ChevronRightIcon className="inline-block w-5 h-5 ml-2" />
              </button>
              <button className="border-2 border-blue-900 text-blue-900 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-all">
                Watch Demo
                <PlayIcon className="inline-block w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">See It In Action</h2>
            <p className="text-xl text-gray-600">Watch how natural language transforms into autonomous missions</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Natural Language Input</h3>
                <div className="bg-gray-900 rounded-lg p-6 text-green-400 font-mono">
                  <div className="flex items-center mb-2">
                    <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
                    <span className="text-white">DroneSpeak AI</span>
                  </div>
                  <div className="transition-all duration-500">
                    <p className="text-sm opacity-75">{demoSteps[currentDemo].language}:</p>
                    <p className="text-lg mt-2">{demoSteps[currentDemo].input}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Autonomous Mission Plan</h3>
                <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                  <div className="transition-all duration-500">
                    <p className="text-blue-900 font-semibold text-lg">{demoSteps[currentDemo].output}</p>
                    <div className="mt-4 flex items-center text-sm text-blue-700">
                      <CheckIcon className="w-4 h-4 mr-2" />
                      Flight path optimized
                    </div>
                    <div className="flex items-center text-sm text-blue-700">
                      <CheckIcon className="w-4 h-4 mr-2" />
                      Safety protocols applied
                    </div>
                    <div className="flex items-center text-sm text-blue-700">
                      <CheckIcon className="w-4 h-4 mr-2" />
                      Ready for execution
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {demoSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentDemo ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Advantage */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose DroneSpeak?</h2>
            <p className="text-xl text-gray-600">See how we compare to industry leaders</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-blue-900">DroneSpeak</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Elbit Dominion-X</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Skydio</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Percepto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {competitors.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.feature}</td>
                      <td className="px-6 py-4 text-center">
                        {typeof row.us === 'boolean' ? (
                          row.us ? (
                            <CheckIcon className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-red-500">✗</span>
                          )
                        ) : (
                          <span className="text-blue-900 font-semibold">{row.us}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">
                        {typeof row.elbit === 'boolean' ? (
                          row.elbit ? (
                            <CheckIcon className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-red-500">✗</span>
                          )
                        ) : (
                          row.elbit
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">
                        {typeof row.skydio === 'boolean' ? (
                          row.skydio ? (
                            <CheckIcon className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-red-500">✗</span>
                          )
                        ) : (
                          row.skydio
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">
                        {typeof row.percepto === 'boolean' ? (
                          row.percepto ? (
                            <CheckIcon className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-red-500">✗</span>
                          )
                        ) : (
                          row.percepto
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Transforming Industries</h2>
            <p className="text-xl text-gray-600">From security to logistics, DroneSpeak adapts to your needs</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <useCase.icon className="w-8 h-8 text-blue-900" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{useCase.title}</h3>
                <p className="text-gray-600 mb-6">{useCase.description}</p>
                <ul className="space-y-2">
                  {useCase.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <CheckIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Industry Leaders</h2>
            <p className="text-xl text-gray-600">See what our early adopters are saying</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "DroneSpeak reduced our mission planning time from hours to minutes. The natural language interface is a game-changer.",
                author: "Sarah Chen",
                role: "Operations Director",
                company: "SecureGuard Solutions"
              },
              {
                quote: "Finally, a solution that works with our existing fleet. The Hebrew support was crucial for our Israeli operations.",
                author: "David Levi",
                role: "CTO",
                company: "InfraTech Inspection"
              },
              {
                quote: "The autonomous re-planning feature saved us during a critical emergency response. Exceptional reliability.",
                author: "Maria Rodriguez",
                role: "Emergency Response Coordinator",
                company: "City Safety Department"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-blue-50 rounded-xl p-8 border-l-4 border-blue-500">
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-blue-700 font-medium">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Drone Operations?</h2>
            <p className="text-xl text-blue-100">Get started with a free trial or schedule a demo</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Use Case</label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Security & Surveillance</option>
                  <option>Infrastructure Inspection</option>
                  <option>Logistics & Delivery</option>
                  <option>Emergency Response</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tell us about your needs</label>
                <textarea rows="4" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
              </div>
              
              <button type="submit" className="w-full bg-blue-900 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-800 transition-colors">
                Get Started Today
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">DroneSpeak</div>
              <p className="text-gray-400">Autonomous mission planning for the modern drone era.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DroneSpeak. All rights reserved. | FAA/EASA Compliant | SOC 2 Certified</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 