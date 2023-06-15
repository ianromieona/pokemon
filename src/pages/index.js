import Image from 'next/image';
import { Header, Body } from '@/components/Layout';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Header />
      <Body>
        <div className=" max-w-screen-xl mx-auto px-4 banner">
          <div className="flex md:mt-10">
            <div className="">
              <h1 className="md:mt-20">Find all your favorite Pokémon</h1>
              <p>
                You can know the type of Pokemon, it's strengths, disadvantages
                and abilities
              </p>

              <button
                type="button"
                className="mt-5  hover:bg-gray-900"
                onClick={() => {
                  router.push('/pokedex');
                }}
              >
                See Pokémon
              </button>
            </div>
            <div>
              <Image
                src={'http://localhost:3000/pika.png'}
                width={1000}
                height={500}
                alt="pika banner"
                style={{ transform: 'scaleX(-1)' }}
              />
            </div>
          </div>
        </div>
      </Body>
    </>
  );
}
