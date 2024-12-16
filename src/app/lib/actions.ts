'use server';
 
import { signIn } from '../../../auth';
import { AuthError} from 'next-auth';
import { z } from 'zod';
import { redirect } from 'next/navigation'; 
import { createUser, addReview } from '@/app/lib/data'; 
import bcrypt from 'bcryptjs';
import { signOut } from '../../../auth';

 
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
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const result = await signIn('credentials', {email, password});
    console.log("signIn result:", result);

  } catch (error) {
  console.log("WHEN AUTHENTICATING WE HAD AN ERROR", error)
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

export async function handleSignOut() {
  console.log("Signing Out")
  await signOut();
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
    } catch (error) {
        if (error instanceof z.ZodError) {
          return `Validation failed: ${error.errors.map(e => e.message).join(', ')}`;
        }
        return 'Something went wrong during registration.';
    }
    redirect('/login');
}

const reviewSchema = z.object({
  review_comment: z.string().min(1, 'Comment is required'),
  review_rating: z.number().min(1, 'Rating is required'),
  user_id: z.number(),
  product_id: z.number(),
});

export async function review(
  prevState: string | undefined,
  formData: FormData,
) {
  const product_id = formData.get('product_id');
  try {
    const parsedData  = reviewSchema.parse({
      review_comment: formData.get('review_comment'),
      review_rating: formData.get('review_rating'),
      user_id: formData.get('user_id'),
      product_id: formData.get('product_id')
    })
    // Insert the user into the database
    const reviewAdded = await addReview({
      review_comment: parsedData.review_comment,
      review_rating: parsedData.review_rating,
      user_id: parsedData.user_id,
      product_id: parsedData.product_id,
    });
    console.log ('Successfully registered: ', reviewAdded)       
} catch (error) {
    if (error instanceof z.ZodError) {
      return `Validation failed: ${error.errors.map(e => e.message).join(', ')}`;
    }
    return 'Something went wrong during registration.';
}
redirect(`/dashboard/product/${product_id}`);
}
 