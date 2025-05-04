import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';

interface GiftCardTemplate {
  id: string;
  name: string;
  image: string;
  description: string;
}

const giftCardTemplates: GiftCardTemplate[] = [
  {
    id: 'birthday',
    name: 'Birthday',
    image: '/gift-cards/birthday.jpg',
    description: 'Perfect for celebrating birthdays with a coffee treat.'
  },
  {
    id: 'thank-you',
    name: 'Thank You',
    image: '/gift-cards/thank-you.jpg',
    description: 'Show your appreciation with a coffee gift.'
  },
  {
    id: 'congratulations',
    name: 'Congratulations',
    image: '/gift-cards/congratulations.jpg',
    description: 'Celebrate achievements with a special coffee reward.'
  },
  {
    id: 'holiday',
    name: 'Holiday',
    image: '/gift-cards/holiday.jpg',
    description: 'Spread holiday cheer with the gift of coffee.'
  },
  {
    id: 'just-because',
    name: 'Just Because',
    image: '/gift-cards/just-because.jpg',
    description: 'Sometimes coffee is the perfect gift for no reason at all.'
  },
  {
    id: 'custom',
    name: 'Custom Design',
    image: '/gift-cards/custom.jpg',
    description: 'Create your own personalized gift card design.'
  }
];

const GiftCardPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<GiftCardTemplate | null>(null);
  const [amount, setAmount] = useState<number>(25);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1);
  
  const handleTemplateSelect = (template: GiftCardTemplate) => {
    setSelectedTemplate(template);
  };
  
  const handleAmountChange = (newAmount: number) => {
    setAmount(newAmount);
  };
  
  const handleNextStep = () => {
    if (step === 1 && selectedTemplate) {
      setStep(2);
    } else if (step === 2 && amount > 0) {
      setStep(3);
    }
  };
  
  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the gift card data to a backend
    Swal.fire({
      icon: 'success',
      title: 'Gift Card Sent!',
      text: 'Gift card sent successfully!',
      timer: 1800,
      showConfirmButton: false
    });
    // Reset form
    setSelectedTemplate(null);
    setAmount(25);
    setRecipientName('');
    setRecipientEmail('');
    setSenderName('');
    setMessage('');
    setStep(1);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background px-0 md:px-4 py-8"
    >
      {/* Page Title */}
      <motion.h1 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-primary drop-shadow-lg tracking-tight"
        style={{textShadow: '0 4px 24px #b07d5633'}}
      >
        Send a Gift Card
      </motion.h1>
      <div className="w-24 h-2 mx-auto mb-12 rounded-full" style={{background: 'linear-gradient(90deg, #d9a066 40%, #7b4b28 100%)'}}></div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-3xl mx-auto bg-secondary rounded-2xl shadow-lg overflow-hidden border-b-4 border-accent"
      >
        {/* Progress Steps */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex border-b border-accent/30"
        >
          {[1, 2, 3].map((stepNumber) => (
            <motion.div
              key={stepNumber}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + stepNumber * 0.1 }}
              className={`flex-1 py-4 px-6 text-center font-bold text-lg transition-all ${
                step === stepNumber ? 'bg-primary text-light shadow-md border-b-4 border-accent' : 'bg-accent/10 text-accent'
              }`}
              style={step === stepNumber ? {boxShadow: '0 2px 12px #d9a06633'} : {}}
            >
              {stepNumber}. {stepNumber === 1 ? 'Choose Design' : stepNumber === 2 ? 'Select Amount' : 'Recipient Details'}
            </motion.div>
          ))}
        </motion.div>
        <div className="p-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Choose Template */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.h2 
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl font-bold mb-4 text-primary"
                >
                  Choose a Gift Card Design
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                  {giftCardTemplates.map((template, index) => (
                    <motion.div 
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      whileHover={{ scale: 1.04, boxShadow: '0 8px 32px #d9a06633' }}
                      whileTap={{ scale: 0.98 }}
                      className={`gift-card cursor-pointer border-b-4 transition-all ${
                        selectedTemplate?.id === template.id 
                          ? 'border-accent ring-2 ring-accent/30' 
                          : 'border-accent/10 hover:border-accent/30 opacity-80 hover:opacity-100'
                      }`}
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <div className="gift-card__amount text-2xl mb-2">🎁</div>
                      <h3 className="gift-card__title mb-1">{template.name}</h3>
                      <p className="gift-card__message mb-0">{template.description}</p>
                    </motion.div>
                  ))}
                </div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex justify-end"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextStep}
                    disabled={!selectedTemplate}
                    className={`px-8 py-3 rounded-full font-bold text-lg shadow-md border-2 border-accent transition-all bg-primary text-light hover:bg-accent ${!selectedTemplate ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Next
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
            {/* Step 2: Select Amount */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.h2 
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl font-bold mb-4 text-primary"
                >
                  Select Gift Card Amount
                </motion.h2>
                <div className="flex flex-wrap gap-4 mb-8 justify-center">
                  {[10, 25, 50, 100].map((amt) => (
                    <motion.button
                      key={amt}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleAmountChange(amt)}
                      className={`px-8 py-3 rounded-full font-bold text-lg shadow-md border-2 border-accent transition-all ${
                        amount === amt ? 'bg-primary text-light' : 'bg-accent/10 text-accent hover:bg-accent/20'
                      }`}
                    >
                      ${amt}
                    </motion.button>
                  ))}
                </div>
                <div className="flex flex-col items-center mb-8">
                  <label className="text-primary font-semibold mb-2">Custom Amount</label>
                  <input
                    type="number"
                    min={1}
                    value={amount}
                    onChange={e => handleAmountChange(Number(e.target.value))}
                    className="px-4 py-2 rounded-lg border-2 border-accent text-lg text-center w-40 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div className="flex justify-between">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrevStep}
                    className="px-8 py-3 rounded-full font-bold text-lg shadow-md border-2 border-accent transition-all bg-accent/10 text-accent hover:bg-accent/20"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextStep}
                    disabled={amount <= 0}
                    className={`px-8 py-3 rounded-full font-bold text-lg shadow-md border-2 border-accent transition-all bg-primary text-light hover:bg-accent ${amount <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Next
                  </motion.button>
                </div>
              </motion.div>
            )}
            {/* Step 3: Recipient Details */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.h2 
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl font-bold mb-4 text-primary"
                >
                  Recipient Details
                </motion.h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <label className="block text-primary font-semibold mb-2">Recipient Name</label>
                      <input
                        type="text"
                        value={recipientName}
                        onChange={e => setRecipientName(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-lg border-2 border-accent text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-primary font-semibold mb-2">Recipient Email</label>
                      <input
                        type="email"
                        value={recipientEmail}
                        onChange={e => setRecipientEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-lg border-2 border-accent text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <label className="block text-primary font-semibold mb-2">Your Name</label>
                      <input
                        type="text"
                        value={senderName}
                        onChange={e => setSenderName(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-lg border-2 border-accent text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-primary font-semibold mb-2">Message (optional)</label>
                      <input
                        type="text"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border-2 border-accent text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={handlePrevStep}
                      className="px-8 py-3 rounded-full font-bold text-lg shadow-md border-2 border-accent transition-all bg-accent/10 text-accent hover:bg-accent/20"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="px-8 py-3 rounded-full font-bold text-lg shadow-md border-2 border-accent transition-all bg-primary text-light hover:bg-accent"
                    >
                      Send Gift Card
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      
      {/* Gift Card Preview */}
      <AnimatePresence>
        {selectedTemplate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.9 }}
            className="mt-12 max-w-md mx-auto"
          >
            <motion.h2 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-xl font-semibold mb-4"
            >
              Gift Card Preview
            </motion.h2>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="h-48 bg-gray-200 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500">
                  {selectedTemplate.name} Gift Card Design
                </div>
              </motion.div>
              
              <div className="p-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="flex justify-between items-center mb-2"
                >
                  <h3 className="font-semibold text-primary">{selectedTemplate.name} Gift Card</h3>
                  <span className="font-bold text-accent">${amount}</span>
                </motion.div>
                
                {recipientName && (
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                    className="text-sm text-gray-600"
                  >
                    To: {recipientName}
                  </motion.p>
                )}
                
                {senderName && (
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 }}
                    className="text-sm text-gray-600"
                  >
                    From: {senderName}
                  </motion.p>
                )}
                
                {message && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                    className="mt-3 p-3 bg-gray-50 rounded text-sm italic"
                  >
                    "{message}"
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GiftCardPage;
