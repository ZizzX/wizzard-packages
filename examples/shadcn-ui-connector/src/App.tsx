import { z } from 'zod';
import { ZodAdapter } from '@wizzard-packages/adapter-zod';
import { createShadcnWizard } from './connector/factory';
import { Input } from './components/ui/input';

// 1. Define Data Schema
const userSchema = z.object({
  personal: z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.string().email('Invalid email address'),
  }),
  preferences: z.object({
    role: z.string().min(1, 'Please select a role'),
    company: z.string().optional(),
  }),
});

type UserSchema = z.infer<typeof userSchema>;
type UserStep = 'personal' | 'preferences' | 'review';

// 2. Create Wizard Factory (Typed)
const {
  WizardProvider,
  WizardContainer,
  WizardStepper,
  WizardControls,
  WizardStep,
  WizardField,
  useWizardValue,
} = createShadcnWizard<UserSchema, UserStep>();

// 3. Define Step Components
const PersonalInfoStep = () => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <WizardField path="personal.firstName" label="First Name">
          {({ value, onChange, error }) => (
            <Input
              placeholder="John"
              value={value || ''}
              onChange={onChange}
              className={error ? 'border-destructive focus-visible:ring-destructive' : ''}
            />
          )}
        </WizardField>
        <WizardField path="personal.lastName" label="Last Name">
          {({ value, onChange, error }) => (
            <Input
              placeholder="Doe"
              value={value || ''}
              onChange={onChange}
              className={error ? 'border-destructive focus-visible:ring-destructive' : ''}
            />
          )}
        </WizardField>
      </div>
      <WizardField path="personal.email" label="Email Address">
        {({ value, onChange, error }) => (
          <Input
            type="email"
            placeholder="john.doe@example.com"
            value={value || ''}
            onChange={onChange}
            className={error ? 'border-destructive focus-visible:ring-destructive' : ''}
          />
        )}
      </WizardField>
    </div>
  );
};

const PreferencesStep = () => {
  return (
    <div className="grid gap-4 py-4">
      <WizardField path="preferences.role" label="Job Role">
        {({ value, onChange, error }) => (
          <Input
            placeholder="e.g. Software Engineer"
            value={value || ''}
            onChange={onChange}
            className={error ? 'border-destructive focus-visible:ring-destructive' : ''}
          />
        )}
      </WizardField>
      <WizardField path="preferences.company" label="Company (Optional)">
        {({ value, onChange }) => (
          <Input placeholder="Acme Corp" value={value || ''} onChange={onChange} />
        )}
      </WizardField>
    </div>
  );
};

const ReviewStep = () => {
  // Selectors are fully typed based on UserSchema
  const firstName = useWizardValue('personal.firstName');
  const lastName = useWizardValue('personal.lastName');
  const email = useWizardValue('personal.email');
  const role = useWizardValue('preferences.role');
  const company = useWizardValue('preferences.company');

  return (
    <div className="grid gap-4 py-4">
      <div className="rounded-lg border p-4 space-y-4">
        <h3 className="font-semibold leading-none tracking-tight">Summary</h3>
        <div className="grid grid-cols-2 gap-1 text-sm">
          <span className="text-muted-foreground">Full Name:</span>
          <span className="font-medium text-right">
            {firstName} {lastName}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1 text-sm">
          <span className="text-muted-foreground">Email:</span>
          <span className="font-medium text-right">{email}</span>
        </div>
        <div className="grid grid-cols-2 gap-1 text-sm">
          <span className="text-muted-foreground">Role:</span>
          <span className="font-medium text-right">{role}</span>
        </div>
        {company && (
          <div className="grid grid-cols-2 gap-1 text-sm">
            <span className="text-muted-foreground">Company:</span>
            <span className="font-medium text-right">{company}</span>
          </div>
        )}
      </div>
      <div className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-md">
        Please review your information above. Click "Complete" to submit your data.
      </div>
    </div>
  );
};

// 4. Main App
export default function App() {
  const handleComplete = (data: UserSchema) => {
    console.log('Wizard Completed:', data);
    alert(
      `Wizard completed!\n\nUser: ${data.personal.firstName} ${data.personal.lastName}\nRole: ${data.preferences.role}`
    );
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <WizardProvider
        initialData={{
          personal: { firstName: '', lastName: '', email: '' },
          preferences: { role: '', company: '' },
        }}
        config={{
          validationMode: 'onStepChange',
          steps: [
            {
              id: 'personal',
              label: 'Personal Info',
              validationAdapter: new ZodAdapter(z.object({ personal: userSchema.shape.personal })),
            },
            {
              id: 'preferences',
              label: 'Preferences',
              validationAdapter: new ZodAdapter(
                z.object({ preferences: userSchema.shape.preferences })
              ),
            },
            {
              id: 'review',
              label: 'Review',
            },
          ],
        }}
      >
        <WizardContainer
          title="Shadcn Connector Demo"
          description="A fully typed, multi-step wizard using @wizzard-packages/react and shadcn/ui."
        >
          <WizardStepper />

          <WizardStep stepId="personal">
            <PersonalInfoStep />
          </WizardStep>

          <WizardStep stepId="preferences">
            <PreferencesStep />
          </WizardStep>

          <WizardStep stepId="review">
            <ReviewStep />
          </WizardStep>

          <WizardControls onComplete={handleComplete} />
        </WizardContainer>
      </WizardProvider>
    </div>
  );
}
