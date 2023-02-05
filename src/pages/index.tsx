import Head from 'next/head';
import LeftBanner from '@/components/LeftBanner';
import CV from '@/components/CV';

export default function Home() {
  return (
    <>
      <Head>
        <title>Audric Debladis curriculum vitae</title>
        <meta name='description' content='Audric Debladis curriculum vitae' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/myFace.jpg' />
      </Head>
      <main>
        <div className='flex'>
          <LeftBanner />
          <div className='bg-white w-full'>
            <CV />
          </div>
        </div>
      </main>
    </>
  );
}
