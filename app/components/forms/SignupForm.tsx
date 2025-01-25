import { Button } from '../Button';
import { LabelWithInput } from '../LabelWithInput';
import { useSignup } from '@/hooks/auth';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card';
import { Form } from 'react-router';

export const SignupForm = () => {
  const {
    form: {
      register,
      formState: { errors }
    },
    onSubmit
  } = useSignup();

  return (
    <Form className="flex justify-start" onSubmit={onSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>
            <h1>Sign up</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LabelWithInput
            label="Username"
            labelProps={{ htmlFor: 'username-field' }}
            inputProps={{
              ...register('username', { required: true }),
              placeholder: 'Username'
            }}
            errorLabel={errors.username?.message}
          />
          <LabelWithInput
            label="Email"
            labelProps={{ htmlFor: 'email-field' }}
            inputProps={{
              ...register('email', { required: true }),
              type: 'email',
              placeholder: 'Email'
            }}
            errorLabel={errors.email?.message}
          />
          <LabelWithInput
            label="Password"
            labelProps={{ htmlFor: 'password-field' }}
            inputProps={{
              ...register('password', { required: true }),
              placeholder: 'Password',
              type: 'password'
            }}
            errorLabel={errors.password?.message}
          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full">
            Sign up
          </Button>
          <p>
            Already have account?{' '}
            <a href="sign-in" className="font-semibold">
              Sign in here
            </a>
          </p>
        </CardFooter>
      </Card>
    </Form>
  );
};
