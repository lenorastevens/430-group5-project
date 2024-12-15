'use server';
 
import { signIn } from '../../../auth';
import { AuthError} from 'next-auth';
import { z } from 'zod';
import { redirect } from 'next/navigation'; 
import { createUser } from '@/app/lib/data'; 
import bcrypt from 'bcrypt';

 
// ...

export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log("FormData before signIn:", formData);
    const result = await signIn('credentials', formData);
    console.log("signIn result:", result);

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}


const registerSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  });
  
export async function register(
    prevState: string | undefined,
    formData: FormData,
    ) {
    try {
        // Validate the incoming form data
        const parsedData = registerSchema.parse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        password: formData.get('password'),
        });

        // Hash the password before storing it
        const hashedPassword = await hashPassword(parsedData.password);

        // Insert the user into the database
        const userCreated = await createUser({
        firstName: parsedData.firstName,
        lastName: parsedData.lastName,
        email: parsedData.email,
        password: hashedPassword,
        });
        console.log ('Successfully registered: ', userCreated)
        
        redirect('/login');

    } catch (error) {
        if (error instanceof z.ZodError) {
        return `Validation failed: ${error.errors.map(e => e.message).join(', ')}`;
        }
        return 'Something went wrong during registration.';
    }
}


