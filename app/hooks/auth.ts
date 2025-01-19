import { useForm } from 'react-hook-form';
import { useFetcher, useNavigate, useSubmit } from 'react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// import { signIn, getCurrentUser, signOut, signUp } from '@/api/auth.server';
import {
  signinResolver,
  signupResolver,
  type SignInData,
  type SignupData
} from '@/schemas/auth';

export const useSignIn = () => {
  let submit = useSubmit();

  const form = useForm<SignInData>({
    resolver: signinResolver
  });

  const onSubmit = form.handleSubmit(() => {
    submit(form.getValues(), {
      method: 'post',
      action: '/',
      encType: 'application/json'
    });
  });

  return { form, onSubmit };
};

export const useSignup = () => {
  const fetcher = useFetcher();

  const form = useForm<SignupData>({
    resolver: signupResolver
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log('data', data);

    fetcher.submit(data, {
      method: 'post',
      encType: 'application/json'
    });
  });

  return { form, onSubmit };
};

export const useCurrentUser = () => {
  // const query = useQuery({
  //   queryKey: user.current(),
  //   queryFn: getCurrentUser,
  //   retry: false,
  //   retryOnMount: false,
  // });
  // return query;
};

export const useSignOutMutation = () => {
  // return useMutation({
  //   mutationFn: signOut,
  //   onSuccess: () => {
  //     navigate('/');
  //     window.location.reload();
  //   },
  //   onError: (error) => {
  //     console.error(error);
  //   }
  // });
};
