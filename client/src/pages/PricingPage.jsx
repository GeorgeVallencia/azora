import { useState } from 'react';

function PricingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState('starter');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: billingCycle === 'monthly' ? 0 : 0,
      description: 'Perfect for individuals getting started with goal tracking',
      features: [
        'Up to 10 active goals',
        'Basic habit tracking',
        'Weekly progress reports',
        'Mobile app access'
      ],
      highlighted: false
    },
    {
      id: 'pro',
      name: 'Professional',
      price: billingCycle === 'monthly' ? 9.99 : 99.90,
      description: 'Ideal for serious goal achievers and habit builders',
      features: [
        'Unlimited goals',
        'Advanced habit tracking',
        'Detailed analytics dashboard',
        'Time tracking',
        'Priority support',
        'Data export',
        'Mobile app access'
      ],
      highlighted: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: billingCycle === 'monthly' ? 29.99 : 299.90,
      description: 'For teams and organizations needing advanced features',
      features: [
        'Everything in Professional',
        'Team collaboration tools',
        'Advanced analytics',
        'Custom integrations',
        'Dedicated support',
        'White-label options',
        'SLA guarantee'
      ],
      highlighted: false
    }
  ];

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const handleSubscribe = (planId) => {
    // Handle subscription logic
    console.log(`Subscribing to ${planId} plan (${billingCycle})`);
    alert(`Thank you for choosing the ${planId} plan! Redirecting to payment...`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose the perfect plan for your productivity journey. No hidden fees.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm p-1 inline-flex">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                billingCycle === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                billingCycle === 'annual'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-lg shadow-lg p-6 relative ${
                plan.highlighted ? 'ring-2 ring-blue-500 transform scale-105' : ''
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-3 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <div className="flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-600 ml-1">
                    /{billingCycle}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{plan.description}</p>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010-1.414 1.414l-4 4a1 1 0 01-1.414 1.414L10 11.586 8.707 8.293a1 1 0 00-1.414-1.414l-4-4a1 1 0 00-1.414-1.414L9.586 6.707a1 1 0 00.293-.707l4-4a1 1 0 001.414-1.414L14.586 9.293a1 1 0 001.414-1.414l4-4a1 1 0 001.414-1.414L16.707 5.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan.id)}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  plan.highlighted
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {plan.id === 'starter' ? 'Get Started' : 
                 plan.id === 'pro' ? 'Start Pro Trial' : 'Contact Sales'}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Frequently Asked Questions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-3">Can I change plans anytime?</h3>
                <p className="text-gray-600">
                  Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect at the next billing cycle.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-3">Is there a free trial?</h3>
                <p className="text-gray-600">
                  Yes! All plans come with a 14-day free trial. No credit card required to start.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-3">What payment methods do you accept?</h3>
                <p className="text-gray-600">
                  We accept all major credit cards, debit cards, and PayPal. All payments are processed securely through Stripe.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-3">Is my data secure?</h3>
                <p className="text-gray-600">
                  Absolutely! We use industry-standard encryption and never share your data with third parties without your consent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
