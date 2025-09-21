import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const Home = () => {
  return (
    <div>
      <ClerkProvider>
        <SignedOut>
          <SignInButton mode='modal'>
            <button className='bg-red-500'>
              Sign In
            </button>
          </SignInButton> 
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </ClerkProvider>
    </div>
  );
}

export default Home;