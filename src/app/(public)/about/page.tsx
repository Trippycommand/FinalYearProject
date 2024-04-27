import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn more about CryptoScout - your trusted platform for swapping and sending money to friends securely and easily.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto my-32 max-w-4xl text-balance rounded-2xl bg-indigo-950 px-12 py-8 text-white shadow-lg">
      <h1 className="mb-6 text-4xl font-bold">About CryptoScout</h1>
      <p className="mb-8 text-lg text-gray-300">
        At CryptoScout, we believe in making financial transactions simpler,
        safer, and more accessible. Our platform enables you to swap and send
        money to friends with ease, all while prioritizing security and user
        experience.
      </p>

      <div className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold">Our Mission</h2>
        <p className="text-lg text-gray-300">
          Our mission is to revolutionize the way people transfer money by
          providing a secure and user-friendly platform for swapping and sending
          funds globally. We strive to empower individuals to manage their
          finances efficiently and securely.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="mb-3 text-2xl font-semibold">Why Choose CryptoScout?</h2>
        <ul className="list-inside list-disc text-lg text-gray-300">
          <li className="mb-2">
            Secure and encrypted transactions to safeguard your funds
          </li>
          <li className="mb-2">
            Effortless swapping of various currencies at competitive rates
          </li>
          <li className="mb-2">Instant money transfers to friends worldwide</li>
          <li className="mb-2">
            User-friendly interface designed for seamless navigation
          </li>
          <li>Dedicated customer support available 24/7</li>
        </ul>
      </div>

      <div>
        <h2 className="mb-3 text-2xl font-semibold">Join Us Today</h2>
        <p className="text-lg text-gray-300">
          Experience the future of financial transactions with CryptoScout. Join
          our community today and discover a simpler, safer, and more efficient
          way to swap and send money to your friends.
        </p>
      </div>
    </div>
  )
}
