import React, { useState, useEffect } from 'react';
import { ChevronRightIcon, CheckIcon, PlayIcon, MapPinIcon, ShieldCheckIcon, TruckIcon, EyeIcon } from '@heroicons/react/24/outline';

const DroneSpeak = () => {
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
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-900">DroneSpeak</div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#demo" className="text-gray-600 hover:text-blue-900 px-3 py-2 text-sm font-medium transition-colors">Demo</a>
                <a href="#features" className="text-gray-600 hover:text-blue-900 px-3 py-2 text-sm font-medium transition-colors">Features</a>
                <a href="#use-cases" className="text-gray-600 hover:text-blue-900 px-3 py-2 text-sm font-medium transition-colors">Use Cases</a>
                <a href="#contact" className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">Get Started</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Just tell the drone
              <span className="text-blue-900 block">what you want</span>
              <span className="text-gray-600 text-3xl md:text-5xl lg:text-6xl block mt-2">– it does the rest</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
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
            
            {/* Key Benefits Bar */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center justify-center space-x-3">
                <CheckIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 font-medium">Works with existing drones</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <CheckIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 font-medium">Setup in &lt;30 days</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <CheckIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 font-medium">FAA/EASA compliant</span>
              </div>
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
          
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Natural Language Input</h3>
                <div className="bg-gray-900 rounded-lg p-6 text-green-400 font-mono">
                  <div className="flex items-center mb-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <span className="text-white ml-4 text-sm">DroneSpeak Terminal</span>
                  </div>
                  <div className="transition-all duration-500">
                    <p className="text-xs opacity-75 mb-2">{demoSteps[currentDemo].language} Command:</p>
                    <p className="text-base lg:text-lg">{demoSteps[currentDemo].input}</p>
                    <div className="mt-4 flex items-center">
                      <span className="w-2 h-5 bg-green-400 animate-pulse"></span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Autonomous Mission Plan</h3>
                <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                  <div className="transition-all duration-500">
                    <p className="text-blue-900 font-semibold text-lg mb-4">{demoSteps[currentDemo].output}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-blue-700">
                        <CheckIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                        Flight path optimized for efficiency
                      </div>
                      <div className="flex items-center text-sm text-blue-700">
                        <CheckIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                        Safety protocols automatically applied
                      </div>
                      <div className="flex items-center text-sm text-blue-700">
                        <CheckIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                        Weather conditions assessed
                      </div>
                      <div className="flex items-center text-sm text-blue-700">
                        <CheckIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                        Ready for autonomous execution
                      </div>
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
                <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-blue-900">DroneSpeak</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Elbit Dominion-X</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Skydio</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Percepto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {competitors.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.feature}</td>
                      <td className="px-6 py-4 text-center">
                        {typeof row.us === 'boolean' ? (
                          row.us ? (
                            <CheckIcon className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-red-500 text-lg">✗</span>
                          )
                        ) : (
                          <span className="text-blue-900 font-semibold text-sm">{row.us}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">
                        {typeof row.elbit === 'boolean' ? (
                          row.elbit ? (
                            <CheckIcon className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-red-500 text-lg">✗</span>
                          )
                        ) : (
                          <span className="text-gray-700">{row.elbit}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">
                        {typeof row.skydio === 'boolean' ? (
                          row.skydio ? (
                            <CheckIcon className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-red-500 text-lg">✗</span>
                          )
                        ) : (
                          <span className="text-gray-700">{row.skydio}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">
                        {typeof row.percepto === 'boolean' ? (
                          row.percepto ? (
                            <CheckIcon className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-red-500 text-lg">✗</span>
                          )
                        ) : (
                          <span className="text-gray-700">{row.percepto}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Key Differentiators */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
              <h3 className="font-semibold text-blue-900 mb-2">Digital Pilot</h3>
              <p className="text-sm text-blue-800">AI that adapts to terrain, weather, and unexpected obstacles in real-time</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
              <h3 className="font-semibold text-green-900 mb-2">Plug & Play</h3>
              <p className="text-sm text-green-800">Works with DJI, ArduPilot, Autel - no hardware changes needed</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
              <h3 className="font-semibold text-purple-900 mb-2">Open Ecosystem</h3>
              <p className="text-sm text-purple-800">Full API access and SDK for custom integrations</p>
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
          
          <div className="grid lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <useCase.icon className="w-8 h-8 text-blue-900" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{useCase.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{useCase.description}</p>
                <ul className="space-y-3">
                  {useCase.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <CheckIcon className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
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
          
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                quote: "DroneSpeak reduced our mission planning time from hours to minutes. The natural language interface is a game-changer for our operations team.",
                author: "Sarah Chen",
                role: "Operations Director",
                company: "SecureGuard Solutions",
                avatar: "SC"
              },
              {
                quote: "Finally, a solution that works with our existing fleet. The Hebrew support was crucial for our Israeli operations and saved us hundreds of thousands in hardware costs.",
                author: "David Levi",
                role: "CTO",
                company: "InfraTech Inspection",
                avatar: "DL"
              },
              {
                quote: "The autonomous re-planning feature saved us during a critical emergency response. When weather conditions changed mid-flight, the system adapted instantly.",
                author: "Maria Rodriguez",
                role: "Emergency Response Coordinator",
                company: "City Safety Department",
                avatar: "MR"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-blue-500">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 italic leading-relaxed">"{testimonial.quote}"</p>
                <p className="text-sm text-blue-700 font-medium">{testimonial.company}</p>
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
            <p className="text-xl text-blue-100">Get started with a free trial or schedule a personalized demo</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Email *</label>
                <input 
                  type="email" 
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                  placeholder="you@company.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                  placeholder="Your company name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Use Case *</label>
                <select 
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select your primary use case</option>
                  <option value="security">Security & Surveillance</option>
                  <option value="inspection">Infrastructure Inspection</option>
                  <option value="logistics">Logistics & Delivery</option>
                  <option value="emergency">Emergency Response</option>
                  <option value="agriculture">Agriculture & Monitoring</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tell us about your drone operations</label>
                <textarea 
                  rows="4" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                  placeholder="What drone platforms do you use? What are your main challenges? How many flights per month?"
                ></textarea>
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="newsletter" 
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="newsletter" className="ml-2 text-sm text-gray-700">
                  Send me updates about DroneSpeak and industry news
                </label>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-blue-900 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-800 transition-all transform hover:scale-105 shadow-lg"
              >
                Get Started Today
              </button>
              
              <p className="text-center text-sm text-gray-500">
                By submitting this form, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="text-3xl font-bold mb-4">DroneSpeak</div>
              <p className="text-gray-400 mb-6 max-w-md">
                Autonomous mission planning for the modern drone era. Transform natural language into intelligent flight missions.
              </p>
              <div className="flex space-x-4">
                <div className="bg-gray-800 p-2 rounded-lg">
                  <span className="text-sm font-medium">FAA Compliant</span>
                </div>
                <div className="bg-gray-800 p-2 rounded-lg">
                  <span className="text-sm font-medium">EASA Certified</span>
                </div>
                <div className="bg-gray-800 p-2 rounded-lg">
                  <span className="text-sm font-medium">SOC 2</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status Page</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                &copy; 2024 DroneSpeak Technologies. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DroneSpeak; 