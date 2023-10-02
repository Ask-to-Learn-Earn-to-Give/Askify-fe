/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
// components

type FooterSmallProps = {
  copyright: any;
  links: any;
};

export default function FooterSmall({
  copyright = {},
  links = [],
}: FooterSmallProps) {
  return (
    <>
      <footer className=" relative w-full">
        <div className="container mx-auto px-4">
          <hr className="my-6 border-slate-200" />

          <div className="-mx-4 flex flex-wrap items-center xl:justify-between">
            <div className="relative w-full px-4 sm:w-full xl:w-6/12">
              <div className="py-6 text-center text-sm text-slate-700 dark:text-white ">
                Copyright © 2023
                {copyright && copyright.href ? (
                  <Link href={copyright.href} target={copyright.target}>
                    <span className="ml-1 font-semibold text-slate-700 dark:text-white">
                      {copyright.children}
                    </span>
                  </Link>
                ) : (
                  <p
                    {...copyright}
                    className="ml-1 font-semibold text-slate-700 dark:text-white"
                  />
                )}
                . All rights reserved.
              </div>
            </div>

            <div className="relative w-full px-4 sm:w-full  xl:w-6/12">
              <ul className="mx-auto mb-0 flex list-none flex-wrap justify-center pl-0 ">
                {links.map((prop: any, key: number) => {
                  return (
                    <li key={key}>
                      {prop && prop.href ? (
                        <Link href={prop.href} target={prop.target}>
                          <p className="mx-auto block  bg-transparent px-4 py-4 text-sm  text-slate-700 no-underline hover:text-black dark:text-white ">
                            {prop.children}
                          </p>
                        </Link>
                      ) : (
                        <a className="mx-auto block  bg-transparent px-4 py-4 text-sm  text-slate-700 no-underline hover:text-black dark:text-white " />
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

FooterSmall.defaultProps = {
  copyright: {},
  links: [],
};

FooterSmall.propTypes = {
  // this is a link, so if you pass "to" as prop
  // it will be generated as a Link from react-router-dom
  // otherwise, it will be generated as a simple anchor tag
  copyright: PropTypes.object,
  // same as above, just that this an array of them
  links: PropTypes.arrayOf(PropTypes.object),
};
