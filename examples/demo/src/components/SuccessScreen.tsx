import { motion } from 'framer-motion';
import React from 'react';
import { Button } from './ui/Button';
import { Card, CardContent } from './ui/Card';

interface SuccessScreenProps {
  title?: string;
  description?: string;
  onBack?: () => void;
  testId?: string;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({
  title = 'Wizard Completed!',
  description = 'Congratulations! You have successfully finished all the steps in this demonstration.',
  onBack,
  testId = 'complete-message',
}) => {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Card className="shadow-2xl border-none overflow-hidden bg-white">
        <div className="h-2 bg-linear-to-r from-emerald-400 to-teal-500" />
        <CardContent className="py-16 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 200 }}
            className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl"
          >
            ✓
          </motion.div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">{title}</h2>
          <p className="text-slate-500 mb-10 max-w-sm mx-auto leading-relaxed">{description}</p>
          <Button
            variant="primary"
            onClick={onBack || (() => (window.location.hash = '#/'))}
            className="px-8 shadow-lg shadow-indigo-100 font-semibold"
          >
            Back to Dashboard
          </Button>
          <div data-testid={testId} className="sr-only">
            {title}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessScreen;
