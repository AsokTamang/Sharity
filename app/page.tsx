import React from "react";

const Page = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-100 to-yellow-200 px-4 py-16">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-10 space-y-6">
        <h1 className="text-4xl font-extrabold font-sans text-gray-800 text-center">
          Sharity
        </h1>
        <hr className="border-t-2 border-amber-400" />
        <p className="text-gray-700 text-lg leading-relaxed text-center">
          <span className="font-semibold">Sharity</span> is a peer-to-peer exchange platform that fosters sustainable living by enabling users to give away or receive items they no longer need. Through our intuitive app, users can list goods they wish to part with and connect with others in the community who may benefit from them.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed text-center">
          By facilitating mutual agreements between users, the platform promotes responsible consumption, reduces waste, and encourages meaningful connections through item sharing.
        </p>
      </div>
    </main>
  );
};

export default Page;
