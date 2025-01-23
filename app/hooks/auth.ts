import { useForm } from 'react-hook-form';
import { useFetcher } from 'react-router';

import {
  signinResolver,
  signupResolver,
  type SignInData,
  type SignupData
} from '@/schemas/auth';

export const useSignIn = () => {
  const fetcher = useFetcher();

  const form = useForm<SignInData>({
    resolver: signinResolver
  });

  const onSubmit = form.handleSubmit(() => {
    fetcher.submit(form.getValues(), {
      method: 'post',
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
