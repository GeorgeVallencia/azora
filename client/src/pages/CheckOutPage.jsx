import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

function CheckOutPage() {
  const { user } = useContext(UserContext);
  const [email, setEmail] = useState(user?.email || '');
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = {
    monthly: { name: 'Monthly Plan', amount: 9.99, currency: 'USD' },
    annual: { name: 'Annual Plan', amount: 99.90, currency: 'USD' }
  };

  const handlePayment = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    try {
      const response = await fetch('http://localhost:4000/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          amount: plans[selectedPlan].amount,
          plan: selectedPlan
        })
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to Paystack payment page
        window.location.href = data.authorization_url;
      } else {
        throw new Error(data.message || 'Payment initialization failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto my-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Upgrade to Premium</h1>
        <p className="text-gray-600 mb-8">Please login to upgrade your account</p>
        <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Login to Continue
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Upgrade to Premium</h1>
          <p className="text-xl text-gray-600 mb-8">
            Unlock all features and take your productivity to the next level
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Payment Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Choose Your Plan</h2>

            {/* Plan Selection */}
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(plans).map(([key, plan]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedPlan(key)}
                    className={`p-4 rounded-lg border-2 transition-all ${selectedPlan === key
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <div className="text-lg font-semibold mb-2">{plan.name}</div>
                    <div className="text-2xl font-bold text-blue-600">
                      ${plan.amount}
                      <span className="text-sm text-gray-500">/{plan.currency}</span>
                    </div>
                    {key === 'annual' && (
                      <div className="text-sm text-green-600 font-medium">
                        Save 20% compared to monthly
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
              RECOMMENDED
            </div>
            <h2 className="text-2xl font-bold mb-4">Premium Plan</h2>
            <p className="text-3xl font-bold mb-6">$4.99<span className="text-lg text-gray-600">/month</span></p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Unlimited goals
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Advanced analytics & insights
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Unlimited streak tracking
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Custom goal categories
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Export progress data
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Priority support
              </li>
            </ul>
            <form onSubmit={handlePayment}>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                Upgrade Now
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            <strong>30-day money-back guarantee</strong> - Not satisfied? Get a full refund.
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <span>🔒 Secure payment</span>
            <span>🚀 Instant access</span>
            <span>📱 All devices</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOutPage;