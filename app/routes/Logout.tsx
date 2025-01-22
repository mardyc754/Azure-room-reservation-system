import { redirect, type MetaFunction } from 'react-router';
import type { Route } from './+types/Logout';

import { logout } from '../server/session.server';

/**
 * Action function for the logout route.
 * Handles the logout process when a POST request is made to this route.
 *
 * @param params - The action arguments.
 * @returns  Redirect response after logging out.
 */
export async function action({ request }: Route.ActionArgs) {
  return logout(request);
}

/**
 * Loader function for the logout route.
 * Redirects to the login page if accessed directly.
 *
 * @param params - The loader arguments.
 * @returns Redirect response to the login page.
 */
export async function loader() {
  return redirect('/login');
}
