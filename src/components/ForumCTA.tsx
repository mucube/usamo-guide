import * as React from 'react';

const ForumCTA = (): JSX.Element => {
  return (
    <div className="mx-auto mb-6 max-w-3xl rounded-xl border border-orange-300/60 bg-gradient-to-r from-orange-50 to-amber-50 shadow-md dark:border-orange-500/40 dark:from-[#1f1710] dark:to-[#141414]">
      <div className="px-4 py-5 text-center sm:p-6">
        <h3 className="text-lg leading-6 font-semibold text-gray-900 dark:text-orange-100">
          Join the AoPS Community!
        </h3>
        <div className="mx-auto mt-2 max-w-xl text-sm leading-5 text-gray-600 dark:text-orange-200/80">
          <p>
            Stuck on a problem, or don't understand a module? Join the AoPS
            community and get help from other math contest students.
          </p>
        </div>
        <div className="mt-5 flex justify-center">
          <span className="inline-flex rounded-md shadow-sm">
            <a
              href="https://artofproblemsolving.com/community"
              target="_blank"
              rel="noreferrer"
              className="btn"
            >
              Join AoPS
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForumCTA;
